"use client"

import { RealtimeChannel } from "@supabase/supabase-js"
import { useCreateClient } from "@workspace/supabase/client"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

export interface LobbyPlayer {
  lobby_id: string
  user_id: string
  user_name: string
  is_ready: boolean
  joined_at: string
}
export interface PlayerPresence {
  user_id: string
  user_name: string
  is_ready: boolean
  online_at: string
}

export default function useRealtimeLobby(
  lobbyId: string,
  host_id: string,
  userId: string
) {
  const supabase = useCreateClient()

  const playersChannelRef = useRef<RealtimeChannel | null>(null)
  const [players, setPlayers] = useState<LobbyPlayer[]>([])
  const [presenceMap, setPresenceMap] = useState<
    Record<string, PlayerPresence>
  >({})
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const joinLobby = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const userName = user.user_metadata.user_name

    const { error } = await supabase.from("lobby_members").upsert(
      {
        lobby_id: lobbyId,
        user_id: user.id,
        user_name: userName,
      },
      {
        onConflict: "lobby_id, user_id", // ← tell it explicitly which columns are the conflict target
        ignoreDuplicates: false, // ← false = update the row, true = skip silently
      }
    )

    if (error) {
      console.log(error)
      setError(error.message)
      return
    }

    const presence: PlayerPresence = {
      user_id: user.id,
      user_name: userName,
      is_ready: false,
      online_at: new Date().toISOString(),
    }

    await playersChannelRef.current?.track(presence)
  }, [lobbyId])

  const leaveLobby = useCallback(async () => {
    console.log("live lobby function")

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    // Untrack presence first (fast), then clean DB
    await playersChannelRef.current?.untrack()

    await supabase
      .from("lobby_members")
      .delete()
      .eq("lobby_id", lobbyId)
      .eq("user_id", user.id)
  }, [lobbyId])

  async function refetchPlayers() {
    const { data } = await supabase
      .from("lobby_members")
      .select("*")
      .eq("lobby_id", lobbyId)
      .order("joined_at", { ascending: true })

    if (data) {
      setPlayers([...data])
    }
  }

  useEffect(() => {
    refetchPlayers()

    // --- Realtime: Presence channel ---
    const channel = supabase.channel(`lobby:${lobbyId}`, {
      config: { presence: { key: userId } },
    })

    channel
      // Presence sync — fires on join, leave, and reconnect
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState<PlayerPresence>()
        // presenceState keys are the presence key; flatten to a map of user_id -> presence
        const flat: Record<string, PlayerPresence> = {}
        Object.values(state)
          .flat()
          .forEach((p) => {
            flat[p.user_id] = p
          })
        setPresenceMap(flat)
      })

      // Someone joined
      .on("presence", { event: "join" }, ({ newPresences }) => {
        console.log("joined:", newPresences)
        refetchPlayers()
      })

      // Someone left (tab close, back button, network drop — all handled here)
      .on("presence", { event: "leave" }, ({ leftPresences }) => {
        console.log("left:", leftPresences)
        //ToDo make this server side
        leftPresences.forEach(async (p) => {
          await supabase
            .from("lobby_members")
            .delete()
            .eq("lobby_id", lobbyId)
            .eq("user_id", p.user_id)
        })
        refetchPlayers()
      })

      // DB changes (e.g. ready status toggled)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "lobby_members",
          filter: `lobby_id=eq.${lobbyId}`,
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            // if()
            // router.push("/")
            console.log("useRealtimeLobby")
            console.log(payload)
          }
          refetchPlayers()
        }
      )

      .subscribe((status) => {
        setIsConnected(status === "SUBSCRIBED")
      })

    playersChannelRef.current = channel

    // --- Cleanup on unmount / navigation ---
    return () => {
      leaveLobby() // removes from DB + untrack
      supabase.removeChannel(channel)
    }
  }, [lobbyId])

  return { players, presenceMap, isConnected, error, joinLobby, leaveLobby }
}
