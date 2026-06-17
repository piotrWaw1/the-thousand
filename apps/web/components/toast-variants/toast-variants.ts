"use client"

import { toast } from "sonner"

export const toastError = (message?: string) => {
  toast.error(message, {
    style: {
      "--normal-bg":
        "color-mix(in oklab, var(--destructive) 20%, var(--background))",
      "--normal-text": "var(--destructive)",
      "--normal-border": "var(--destructive)",
    } as React.CSSProperties,
    position: "top-center",
  })
}

export const toastSuccess = (message?: string) => {
  toast.success(message, {
    style: {
      "--normal-bg":
        "color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 20%, var(--background))",
      "--normal-text":
        "light-dark(var(--color-green-600), var(--color-green-400))",
      "--normal-border":
        "light-dark(var(--color-green-600), var(--color-green-400))",
    } as React.CSSProperties,
    position: "top-center",
  })
}

export const toastWarning = (message?: string) => {
  toast.warning(message, {
    style: {
      "--normal-bg":
        "color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 20%, var(--background))",
      "--normal-text":
        "light-dark(var(--color-amber-600), var(--color-amber-400))",
      "--normal-border":
        "light-dark(var(--color-amber-600), var(--color-amber-400))",
    } as React.CSSProperties,
    position: "top-center",
  })
}
