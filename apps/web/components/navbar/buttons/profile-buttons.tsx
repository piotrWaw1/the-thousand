"use client"

import { useCreateClient } from "@workspace/supabase/client"
import { Button } from "@workspace/ui/components/button"
import { LogOut, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProfileButtons({ userName }: { userName?: string }) {
  const supabase = useCreateClient()
  const router = useRouter()

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <>
      <span className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
        <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {userName?.charAt(0).toUpperCase()}
        </span>
        {userName}
      </span>
      <Button
        asChild
        variant="ghost"
        className="gap-2 text-foreground hover:bg-secondary hover:text-foreground"
      >
        <Link href="/profile">
          <User className="size-4" aria-hidden="true" />
          Profile
        </Link>
      </Button>
      <Button
        onClick={signOut}
        variant="ghost"
        className="gap-2 text-foreground hover:bg-secondary hover:text-foreground"
      >
        <LogOut className="size-4" aria-hidden="true" />
        Logout
      </Button>
    </>
  )
}
