"use client"

import useRealtimeLobby from "@/hooks/use-realtime-lobby"
import { Crown, UserPlus, Users, X } from "lucide-react"
import { useEffect } from "react"
import kickPlayerAction from "./kick-player-action"

export default function LobbyMembers({
  lobbyId,
  hostId,
  userId,

  maxPlayers,
}: {
  lobbyId: string
  hostId: string
  userId: string
  maxPlayers: number
}) {
  const { players, joinLobby } = useRealtimeLobby(lobbyId, hostId, userId)

  useEffect(() => {
    joinLobby().then()
  }, [])

  //TODO: Add toast
  const kickPlayer = async (userId: string) => {
    await kickPlayerAction(userId, lobbyId)
  }

  return (
    <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
          <Users className="size-5 text-primary" aria-hidden="true" />
          Players
        </h2>
        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-sm font-medium text-muted-foreground">
          {players.length}/{maxPlayers}
        </span>
      </div>

      <ul className="flex flex-col gap-2">
        {players.map((player, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-secondary/40 px-3 py-2.5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {player.user_name.charAt(0).toUpperCase()}
              </span>
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="truncate font-medium">{player.user_name}</span>
                {hostId === player.user_id && (
                  <Crown
                    className="size-4 shrink-0 text-primary"
                    aria-label="Host"
                  />
                )}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span
                className={
                  player.is_ready
                    ? "rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary"
                    : "rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground"
                }
              >
                {player.is_ready ? "Ready" : "Waiting"}
              </span>
              {userId === hostId && player.user_id !== hostId && (
                <button
                  type="button"
                  onClick={() => kickPlayer(player.user_id)}
                  className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
                  aria-label={`Remove ${player.user_name}`}
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </li>
        ))}

        {/* Empty slots */}
        {Array.from({ length: Math.max(0, maxPlayers - players.length) }).map(
          (_, i) => (
            <li
              key={`empty-${i}`}
              className="flex items-center gap-3 rounded-lg border border-dashed border-border/60 px-3 py-2.5 text-muted-foreground"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-dashed border-border">
                <UserPlus className="size-4" aria-hidden="true" />
              </span>
              <span className="text-sm">Waiting for player…</span>
            </li>
          )
        )}
      </ul>
    </div>
  )
}
