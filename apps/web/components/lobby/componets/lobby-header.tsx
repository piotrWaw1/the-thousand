"use client"

import { Globe, Lock } from "lucide-react"
import CopyCodeButton from "./copy-code-button"
import { useEffect } from "react"
import { useCreateClient } from "@workspace/supabase/client"
import { useRouter } from "next/navigation"
import { toastWarning } from "@/components/toast-variants/toast-variants"

interface LobbyHeaderProps {
  data: {
    id: string
    name: string
    private: string
    code: string
  }
}

export default function LobbyHeader({ data }: LobbyHeaderProps) {
  const { id, name, code } = data
  const supabase = useCreateClient()
  const router = useRouter()

  useEffect(() => {
    const channel = supabase
      .channel(`lobby_header:${id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "lobbies",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            toastWarning("Lobby closed")
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
  }, [id])

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          {name}
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
      <CopyCodeButton code={code} />
    </div>
  )
}
