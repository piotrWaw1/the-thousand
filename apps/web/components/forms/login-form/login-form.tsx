"use client"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

const formSchema = z.object({
  email: z.email("Enter a valid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
})

export function LoginFrom() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
              <div className="flex flex-row justify-between">
                <FieldLabel htmlFor="form-rhf-password">Paswword</FieldLabel>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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
        <div>
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Login
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="mt-4 h-12 w-full border-border bg-transparent text-sm font-medium text-foreground hover:bg-secondary"
          >
            <Link href="/signup">Don&apos;t have an account? Sign up</Link>
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
