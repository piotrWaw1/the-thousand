"use client"

import { useCreateClient } from "@workspace/supabase/client"
import { useEffect, useState } from "react"
import AuthButtons from "./buttons/auth-buttons"
import ProfileButtons from "./buttons/profile-buttons"

export default function NavButtons() {
  const supabase = useCreateClient()
  const [userName, setUserName] = useState<string | undefined>()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUserName(user?.user_metadata.user_name)
    }

    getUser().then()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      getUser()
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="flex items-center gap-2">
      {(!userName && <AuthButtons />) || <ProfileButtons userName={userName} />}
    </div>
  )
}
