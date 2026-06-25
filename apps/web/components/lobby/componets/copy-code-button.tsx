"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

export default function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  function copyCode() {
    navigator.clipboard?.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={copyCode}
      className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/60 px-4 py-2.5 text-left transition-colors hover:bg-secondary"
      aria-label="Copy lobby code"
    >
      <span>
        <span className="block text-xs tracking-wider text-muted-foreground uppercase">
          Invite code
        </span>
        <span className="font-mono text-lg font-bold tracking-[0.2em] text-primary">
          {code}
        </span>
      </span>
      {copied ? (
        <Check className="size-5 text-primary" aria-hidden="true" />
      ) : (
        <Copy className="size-5 text-muted-foreground" aria-hidden="true" />
      )}
    </button>
  )
}
