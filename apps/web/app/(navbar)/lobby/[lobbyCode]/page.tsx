import Lobby from "@/components/lobby/componets/lobby"
import { createClientServer } from "@workspace/supabase"

export default async function LobbyPage({
  params,
}: {
  params: Promise<{ lobbyCode: string }>
}) {
  const { lobbyCode } = await params
  const supabase = await createClientServer()
  const { data, error } = await supabase
    .from("lobbies")
    .select("*")
    .eq("code", lobbyCode)
    .single()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isHost = user?.id === data.host_id

  if (!data || error) {
    return (
      <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 pt-2 pb-16">
        <div className="rounded-xl border bg-card/60 p-5 text-center text-xl">
          Lobby not found
        </div>
      </section>
    )
  }

  return <Lobby data={data} lobbyCode={lobbyCode} isHost={isHost} />
}
