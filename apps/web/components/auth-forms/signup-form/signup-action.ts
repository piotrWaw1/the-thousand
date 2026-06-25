"use server"

import { createClientServer } from "@workspace/supabase"
import { SignupFormData } from "./signup-form"

export async function signuAction(formData: SignupFormData) {
  const supabase = await createClientServer()

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        user_name: formData.userName,
      },
    },
  })

  if (error) {
    const message =
      error.code === "user_already_exists" ||
      error.code === "unexpected_failure"
        ? "User already exists."
        : "Unexpected error. Try again later."

    return { message, success: false }
  }

  return { message: "User created", success: true }
}
