import { Geist, Geist_Mono, Noto_Sans } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"
import { AnimatedBackground } from "@/components/animated-background"
import "@workspace/ui/globals.css"

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        notoSans.variable
      )}
    >
      <body>
        <ThemeProvider>
          <AnimatedBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
