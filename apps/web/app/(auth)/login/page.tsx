import { LoginFrom } from "@/components/auth-forms/login-form/login-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export default function LoginPage() {
  return (
    <Card className="m-auto w-md bg-card/90 p-6">
      <CardHeader className="text-center">
        <CardTitle className="font-heading text-3xl font-bold text-balance">
          Welcome back
        </CardTitle>
        <CardDescription>
          Sign in to take your seat at the table.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginFrom />
      </CardContent>
    </Card>
  )
}
