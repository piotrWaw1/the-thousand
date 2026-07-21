"use server"

import { createClientServer } from "@workspace/supabase"

export default async function kickPlayerAction(
  userId: string,
  lobbyId: string
) {
  const supabase = await createClientServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { message: "Unauthorized", success: false }
  }

  const { error } = await supabase
    .from("lobby_members")
    .delete()
    .eq("lobby_id", lobbyId)
    .eq("user_id", userId)

  if (error) {
    return { message: "Error", success: false }
  }

  return { message: "User kicked succesfully", success: true }
}
