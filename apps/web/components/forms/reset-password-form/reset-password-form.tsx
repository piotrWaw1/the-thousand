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
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import z from "zod"

const formSchema = z.object({
  email: z.email("Enter a valid email address").min(1, "Email is required"),
})

export default function ResetPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
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
        <div>
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Send reset link
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="mt-4 h-12 w-full border-border bg-transparent text-sm font-medium text-foreground hover:bg-secondary"
          >
            <Link href="/login">
              <ArrowLeft />
              Back to login
            </Link>
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
