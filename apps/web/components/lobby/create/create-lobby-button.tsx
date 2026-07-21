"use client"

import { Button } from "@workspace/ui/components/button"
import { Plus } from "lucide-react"
import { createLobbyAction } from "./create-lobby-action"
import {
  toastError,
  toastSuccess,
} from "@/components/toast-variants/toast-variants"

interface CreateLobbyButtonProps {
  disabled?: boolean
}

export function CreateLobbyButton({ disabled }: CreateLobbyButtonProps) {
  const createLobby = async () => {
    const response = await createLobbyAction()
    if (response.success) {
      toastSuccess(response.message)
    } else {
      toastError(response.message)
    }
  }

  return (
    <Button
      size="lg"
      variant="outline"
      disabled={disabled}
      className="h-14 w-full gap-2 border-border bg-card/60 text-base font-semibold text-foreground backdrop-blur-sm transition-transform hover:-translate-y-0.5 hover:bg-secondary"
      onClick={createLobby}
    >
      <Plus className="size-5" aria-hidden="true" />
      Create Lobby
    </Button>
  )
}
