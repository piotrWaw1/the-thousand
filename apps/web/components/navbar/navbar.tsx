"use server"

import { Button } from "@workspace/ui/components/button"
import { CircleQuestionMark, LoaderCircle } from "lucide-react"
import Link from "next/link"
import TheThousandLogo from "./the-thousand-logo"
import NavButtons from "./nav-buttons"
import { Suspense } from "react"

export default async function Navbar() {
  return (
    <header>
      <nav className="relative z-10 flex items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <div className="hidden items-center gap-2 sm:flex">
          <TheThousandLogo />
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
        <Suspense
          fallback={
            <div>
              <LoaderCircle />
            </div>
          }
        >
          <NavButtons />
        </Suspense>
      </nav>
    </header>
  )
}
