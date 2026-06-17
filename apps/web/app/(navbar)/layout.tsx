import Navbar from "@/components/navbar/navbar"
import React from "react"

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="container m-auto">
      <Navbar />
      {children}
    </main>
  )
}
