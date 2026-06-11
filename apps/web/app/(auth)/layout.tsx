import TheThousandLogo from "@/components/the-thousand-logo"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-20">
      <div className="px-5 py-5">
        <TheThousandLogo />
      </div>

      {children}
    </div>
  )
}
