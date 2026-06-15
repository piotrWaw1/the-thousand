"use server"

import { createClientServer } from "@workspace/supabase"
import { LoginFormData } from "./login-form"

export async function loginAction(formData: LoginFormData) {
  const supabase = await createClientServer()

  const { error } = await supabase.auth.signInWithPassword(formData)

  if (error) {
    console.log(error)
    return { message: "Invalid credentials", success: false }
  }

  console.log("Success")
  return { message: "Login Success", success: true }
}
