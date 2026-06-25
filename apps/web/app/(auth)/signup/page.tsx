import SignupFrom from "@/components/auth-forms/signup-form/signup-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export default function SignupPage() {
  return (
    <Card className="m-auto w-md bg-card/90 p-6">
      <CardHeader className="text-center">
        <CardTitle className="font-heading text-3xl font-bold text-balance">
          Create account
        </CardTitle>
        <CardDescription>Sign up to save your progress.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupFrom />
      </CardContent>
    </Card>
  )
}
