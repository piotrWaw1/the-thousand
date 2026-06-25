"use client"

import SubmitButton from "@/components/submit-button"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"
import { Globe, Settings, Lock } from "lucide-react"
import { useEffect, useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import z from "zod"
import lobbySettingsFormAction from "./lobby-settings-form-action"

const formSchema = z.object({
  lobbyName: z.string().min(3, "Lobby name is required"),
  maxPlayers: z.string("Player number required"),
  private: z.string("Lobby visibility must be selected."),
})

export type LobbySettingsFormData = z.infer<typeof formSchema>

export default function LobbySettings({
  data,
  lobbyCode,
}: {
  data: LobbySettingsFormData
  lobbyCode: string
}) {
  const [isPending, setIsPending] = useState(false)
  const form = useForm<LobbySettingsFormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: { ...data },
  })
  console.log(data)
  const onSubmit = async (data: LobbySettingsFormData) => {
    setIsPending(true)
    lobbySettingsFormAction(data, lobbyCode)
    setIsPending(false)
  }

  useEffect(() => {
    form.trigger()
  }, [])

  return (
    <aside className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
          <Settings className="size-5 text-primary" aria-hidden="true" />
          Settings
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        <FormProvider {...form}>
          <form
            id="lobby-settings"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FieldGroup>
              <Controller
                name="lobbyName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-lobby-name">
                      Lobby name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-lobby-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Your lobby"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="maxPlayers"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <FieldLabel className="mb-2">Max players</FieldLabel>
                    <RadioGroup
                      className="grid grid-cols-3 gap-2"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {[2, 3, 4].map((item, index) => (
                        <Field
                          orientation="vertical"
                          data-invalid={fieldState.invalid}
                          key={index}
                        >
                          <FieldLabel className="relative flex flex-col items-center gap-3 rounded-md border border-input px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50 has-data-checked:border-primary/80 has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50">
                            <RadioGroupItem
                              id={`${index}-${item}`}
                              value={`${item}`}
                              className="sr-only absolute inset-0"
                              aria-label={`size-radio-${item}`}
                            />
                            <p className="text-sm leading-none font-medium text-foreground">
                              {item}
                            </p>
                          </FieldLabel>
                        </Field>
                      ))}
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </RadioGroup>
                  </div>
                )}
              />
              <Controller
                name="private"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <FieldLabel className="mb-2">Visibility</FieldLabel>
                    <RadioGroup
                      className="grid grid-cols-2 gap-2"
                      value={`${field.value}`}
                      onValueChange={field.onChange}
                    >
                      <Field
                        orientation="vertical"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldLabel className="relative flex flex-col items-center gap-3 rounded-md border border-input px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50 has-data-checked:border-primary/80 has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50">
                          <RadioGroupItem
                            id={`${0}-${true}`}
                            value="true"
                            className="sr-only absolute inset-0"
                            aria-label={`size-radio-${true}`}
                          />
                          <p className="flex w-full flex-col items-center justify-center gap-1.5">
                            <Lock className="size-4" aria-hidden="true" />
                            Private
                          </p>
                        </FieldLabel>
                      </Field>

                      <Field
                        orientation="vertical"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldLabel className="relative flex flex-col items-center gap-3 rounded-md border border-input px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50 has-data-checked:border-primary/80 has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50">
                          <RadioGroupItem
                            id={`${0}-${false}`}
                            value={`${false}`}
                            className="sr-only absolute inset-0"
                            aria-label={`size-radio-${false}`}
                          />
                          <p className="flex flex-col items-center justify-center gap-1.5">
                            <Globe className="size-4" aria-hidden="true" />
                            Public
                          </p>
                        </FieldLabel>
                      </Field>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </RadioGroup>
                  </div>
                )}
              />
              <SubmitButton
                className="h-12 w-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
                isActionPending={isPending}
                disabled={!(form.formState.isDirty && form.formState.isValid)}
              >
                Save
              </SubmitButton>
            </FieldGroup>
          </form>
        </FormProvider>
      </div>
    </aside>
  )
}
