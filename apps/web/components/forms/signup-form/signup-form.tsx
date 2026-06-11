"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import z from "zod"

const formSchema = z
  .object({
    userName: z.string().min(4, "User name too short"),
    email: z.email("Enter a valid email address").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    repeatPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  })

export default function SignupFrom() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

  return (
    <form
      id="form-login"
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <FieldGroup>
        <Controller
          name="userName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-userName">User name</FieldLabel>
              <Input
                {...field}
                id="form-rhf-userName"
                aria-invalid={fieldState.invalid}
                placeholder="cardshark"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-email">Email</FieldLabel>
              <Input
                {...field}
                id="form-rhf-email"
                aria-invalid={fieldState.invalid}
                placeholder="your@example.com"
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-password">Pasword</FieldLabel>
              <Input
                {...field}
                id="form-rhf-password"
                aria-invalid={fieldState.invalid}
                placeholder="••••••••"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="repeatPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-repeatPassword">
                Repeat password
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-repeatPassword"
                aria-invalid={fieldState.invalid}
                placeholder="••••••••"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div>
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Sign Up
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="mt-4 h-12 w-full border-border bg-transparent text-sm font-medium text-foreground hover:bg-secondary"
          >
            <Link href="/login">Already have account? Login</Link>
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
