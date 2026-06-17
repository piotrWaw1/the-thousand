import { cn } from "@/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { Loader2 } from "lucide-react"
import React from "react"
import { ComponentProps } from "react"
import { useFormState } from "react-hook-form"

interface SubmitButtonProps extends ComponentProps<typeof Button> {
  isActionPending?: boolean
}

const SubmitButton = React.forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (props, ref) => {
    const { className, children, disabled, isActionPending, ...rest } = props
    const { isSubmitting } = useFormState()

    return (
      <Button
        ref={ref}
        type="submit"
        className={cn(className)}
        disabled={isSubmitting || isActionPending || disabled}
        {...rest}
      >
        {(isSubmitting || isActionPending) && (
          <Loader2 className="animate-spin" />
        )}
        {children}
      </Button>
    )
  }
)

SubmitButton.displayName = "SubmitButton"

export default SubmitButton
