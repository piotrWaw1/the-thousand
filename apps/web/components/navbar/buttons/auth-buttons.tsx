import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export default function AuthButtons() {
  return (
    <>
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
    </>
  )
}
