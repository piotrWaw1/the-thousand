import { Button } from "@workspace/ui/components/button"
import { CircleQuestionMark, Spade } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  return (
    <header>
      <nav className="relative z-10 flex items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <div className="hidden items-center gap-2 sm:flex">
          <Spade className="size-5 text-primary" aria-hidden="true" />
          <span className="font-heading text-lg font-semibold tracking-wide">
            The Thousand
          </span>
          <Button
            asChild
            variant="outline"
            className="ml-2 text-foreground hover:bg-secondary hover:text-foreground"
          >
            <Link href="/how-to-play">
              <CircleQuestionMark />
              How to play
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className="text-foreground hover:bg-secondary hover:text-foreground"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
