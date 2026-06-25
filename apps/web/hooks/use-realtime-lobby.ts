"use client"

import { useCreateClient } from "@workspace/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function useRealtimeLobby(lobbyCode: string) {
  const supabase = useCreateClient()
  const router = useRouter()

  useEffect(() => {
    const channel = supabase
      .channel(`lobby:${lobbyCode}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "lobbies",
          filter: `code=eq.${lobbyCode}`,
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            router.push("/")
          } else {
            router.refresh()
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [lobbyCode])
}
