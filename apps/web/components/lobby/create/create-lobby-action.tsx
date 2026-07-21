"use server"

import { createClientServer } from "@workspace/supabase"
import { redirect } from "next/navigation"

function generateLobbyCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  const code = Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("")
  return code
}

export async function createLobbyAction() {
  const supabase = await createClientServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { message: "Unauthorized", success: false }
  }

  const { data } = await supabase
    .from("lobbies")
    .select("*")
    .eq("host_id", user.id)

  if (data?.length) {
    await supabase.from("lobbies").delete().eq("id", data[0].id)
  }

  for (let i = 0; i < 5; i++) {
    const code = generateLobbyCode()

    const { data, error } = await supabase
      .from("lobbies")
      .insert({ code, name: `${user.user_metadata.user_name}'s lobby` })
      .select()
      .single()

    if (!error) {
      // await supabase
      //   .from("lobby_members")
      //   .insert({
      //     lobby_id: data.id,
      //     user_id: data.host_id,
      //     user_name: user.user_metadata.user_name,
      //   })

      redirect(`/lobby/${data.code}`)
    }
  }

  return { message: "Something went wrong. Try again later.", success: false }
}
