import { Spade } from "lucide-react"
import Link from "next/link"

export default function TheThousandLogo() {
  return (
    <div className="hidden items-center gap-2 sm:flex">
      <Spade className="size-5 text-primary" aria-hidden="true" />
      <Link
        href="/"
        className="font-heading text-lg font-semibold tracking-wide"
      >
        The Thousand
      </Link>
    </div>
  )
}
