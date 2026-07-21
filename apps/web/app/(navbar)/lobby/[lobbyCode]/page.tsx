"use server"

import LobbySettings from "@/components/lobby/componets/form/lobby-settings-form"
import LobbyHeader from "@/components/lobby/componets/lobby-header"
import LobbyMembers from "@/components/lobby/componets/lobby-members"
import { cn } from "@/lib/utils"
import { createClientServer } from "@workspace/supabase"
import { Button } from "@workspace/ui/components/button"
import { Play } from "lucide-react"

export default async function LobbyPage({
  params,
}: {
  params: Promise<{ lobbyCode: string }>
}) {
  const { lobbyCode } = await params
  const supabase = await createClientServer()
  const { data: lobbyData, error: lobbyDataError } = await supabase
    .from("lobbies")
    .select("*")
    .eq("code", lobbyCode)
    .single()

  const { data: playerData, error: playersDataError } = await supabase
    .from("lobby_members")
    .select("*")
    .eq("lobby_id", lobbyData.id)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isHost = user?.id === lobbyData.host_id

  if (!user) {
    return (
      <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 pt-2 pb-16">
        <div className="rounded-xl border bg-card/60 p-5 text-center text-xl">
          Unauthenticated
        </div>
      </section>
    )
  }

  if (!lobbyData || lobbyDataError || !playerData || playersDataError) {
    return (
      <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 pt-2 pb-16">
        <div className="rounded-xl border bg-card/60 p-5 text-center text-xl">
          Lobby not found
        </div>
      </section>
    )
  }

  if (playerData?.length > lobbyData.max_players) {
    return (
      <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 pt-2 pb-16">
        <div className="rounded-xl border bg-card/60 p-5 text-center text-xl">
          Lobby is full
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 pt-2 pb-16">
      <LobbyHeader data={lobbyData} />
      <div
        className={cn("grid gap-6", isHost ? "lg:grid-cols-[1fr_320px]" : "")}
      >
        {/* Players list */}
        <LobbyMembers
          lobbyId={lobbyData.id}
          hostId={lobbyData.host_id}
          userId={user.id}
          maxPlayers={lobbyData.max_players}
        />
        {/* Lobby settings */}
        {isHost && (
          <LobbySettings
            data={{
              lobbyName: lobbyData.name,
              maxPlayers: lobbyData.max_players.toString(),
              private: lobbyData.private.toString(),
            }}
            lobbyId={lobbyData.id}
          />
        )}
      </div>

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
