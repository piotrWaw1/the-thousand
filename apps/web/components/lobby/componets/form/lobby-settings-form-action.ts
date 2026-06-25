"use server"

import { createClientServer } from "@workspace/supabase"
import { LobbySettingsFormData } from "./lobby-settings-form"

export default async function lobbySettingsFormAction(
  formData: LobbySettingsFormData,
  lobbyCode: string
) {
  const supabase = await createClientServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { message: "Unauthorized", success: false }
  }

  const { error } = await supabase
    .from("lobbies")
    .update({
      max_players: formData.maxPlayers,
      name: formData.lobbyName,
      private: formData.private,
    })
    .eq("code", lobbyCode)
    .eq("host_id", user.id)

  console.log(error)

  if (error) {
    return { message: "Error", success: false }
  }

  return { message: "Setting saved", success: true }
}
