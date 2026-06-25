import { CreateLobbyButton } from "@/components/lobby/create/create-lobby-button"
import { Button } from "@workspace/ui/components/button"
import { Play, Search, Spade } from "lucide-react"
import Link from "next/link"

export default async function Page() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center text-center">
      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase backdrop-blur-sm">
        <Spade className="size-3.5 text-primary" aria-hidden="true" />
        The Thousand Online Card Game
      </span>

      <h1 className="max-w-3xl font-heading text-5xl leading-[1.05] font-bold tracking-tight text-balance sm:text-6xl md:text-7xl">
        The classic card game, now online. Ready to play?
      </h1>

      <p className="mt-6 max-w-xl leading-relaxed text-pretty text-muted-foreground">
        Thousand is a 3-player card game where you bid on your hand, collect
        tricks, and score points. First to 1000 wins. Easy to learn, hard to put
        down.
      </p>

      {/* Stacked, equal-size buttons */}
      <div className="mt-10 flex w-full max-w-xs flex-col items-stretch gap-4">
        <Button
          asChild
          size="lg"
          className="h-14 w-full gap-2 bg-primary text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 hover:bg-primary/90"
        >
          <Link href="/play">
            <Play className="size-5" aria-hidden="true" />
            Play
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-14 w-full gap-2 border-border bg-card/60 text-base font-semibold text-foreground backdrop-blur-sm transition-transform hover:-translate-y-0.5 hover:bg-secondary"
        >
          <Link href="/lobby">
            <Search className="size-5" aria-hidden="true" />
            Find Lobby
          </Link>
        </Button>
        <CreateLobbyButton />
      </div>
    </section>
  )
}
