"use client"

import { Globe, Lock, Play, Users } from "lucide-react"
import CopyCodeButton from "./copy-code-button"
import useRealtimeLobby from "@/hooks/use-realtime-lobby"
import { Button } from "@workspace/ui/components/button"
import LobbySettings from "./lobby-settings"

interface LobbyProps {
  data: {
    name: string
    private: boolean
    status: "waiting" | "in_game"
    max_players: number
    code: string
    host_id: string
  }
  lobbyCode: string
}

export default function Lobby(props: LobbyProps) {
  const { data, lobbyCode } = props

  useRealtimeLobby(lobbyCode)

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 pt-2 pb-16">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            {data.name}
          </h1>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            {data.private ? (
              <Lock className="size-4" aria-hidden="true" />
            ) : (
              <Globe className="size-4" aria-hidden="true" />
            )}
            <span>{data.private ? "Private" : "Public"} lobby</span>
          </div>
        </div>
        <CopyCodeButton code={lobbyCode} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Players list */}
        <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
              <Users className="size-5 text-primary" aria-hidden="true" />
              Players
            </h2>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-sm font-medium text-muted-foreground">
              {/* {players.length}/{maxPlayers} */}
            </span>
          </div>

          <ul className="flex flex-col gap-2">
            {/* {players.map((player) => (
                <li
                  key={player.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-secondary/40 px-3 py-2.5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {player.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="flex min-w-0 items-center gap-1.5">
                      <span className="truncate font-medium">{player.name}</span>
                      {player.isHost && (
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
                        player.ready
                          ? "rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary"
                          : "rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground"
                      }
                    >
                      {player.ready ? "Ready" : "Waiting"}
                    </span>
                    {!player.isHost && (
                      <button
                        type="button"
                        onClick={() => kickPlayer(player.id)}
                        className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
                        aria-label={`Remove ${player.name}`}
                      >
                        <X className="size-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </li>
              ))} */}

            {/* Empty slots */}
            {/* {Array.from({ length: Math.max(0, maxPlayers - players.length) }).map(
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
                ),
              )} */}
          </ul>
        </div>

        {/* Lobby settings */}
        <LobbySettings
          data={{
            lobbyName: data.name,
            maxPlayers: data.max_players.toString(),
            private: data.private.toString(),
          }}
        />
      </div>

      {/* Start game */}
      <div className="flex flex-col items-center gap-2">
        <Button
          size="lg"
          // disabled={!canStart}
          className="h-14 w-full max-w-xs gap-2 bg-primary text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform enabled:hover:-translate-y-0.5 enabled:hover:bg-primary/90 disabled:opacity-50"
        >
          <Play className="size-5" aria-hidden="true" />
          Start Game
        </Button>
        {/* {!canStart && (
            <p className="text-sm text-muted-foreground">
              All players must be ready to start.
            </p>
          )} */}
      </div>
    </section>
  )
}
