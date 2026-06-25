import ResetPasswordForm from "@/components/auth-forms/reset-password-form/reset-password-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export default function ForgotPasswordPage() {
  return (
    <Card className="m-auto w-md bg-card/90 p-6">
      <CardHeader className="text-center">
        <CardTitle className="font-heading text-3xl font-bold text-balance">
          Reset your password
        </CardTitle>
        <CardDescription>
          Enter your email and we'll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm />
      </CardContent>
    </Card>
  )
}
