"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

const SUITS = ["♠", "♥", "♦", "♣"] as const

type FloatingCard = {
  id: number
  left: number
  size: number
  delay: number
  duration: number
  suit: (typeof SUITS)[number]
  drift: number
  rotate: number
}

export function AnimatedBackground() {
  const [cards, setCards] = useState<FloatingCard[]>([])

  useEffect(() => {
    setCards(
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 28 + Math.random() * 48,
        delay: -Math.random() * 24,
        duration: 16 + Math.random() * 18,
        suit: SUITS[i % SUITS.length]!,
        drift: (Math.random() - 0.5) * 160,
        rotate: (Math.random() - 0.5) * 90,
      }))
    )
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Radial glow accents */}
      <div className="absolute top-1/3 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-[40vh] w-[40vh] rounded-full bg-accent/10 blur-3xl" />

      {/* Felt vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_85%)]" />

      {/* Floating cards / suits */}
      {cards.map((card) => (
        <span
          key={card.id}
          className={cn(
            "absolute -bottom-24 font-heading select-none",
            card.suit === "♥" || card.suit === "♦"
              ? "text-accent/30"
              : "text-primary/30"
          )}
          style={{
            left: `${card.left}%`,
            fontSize: `${card.size}px`,
            animation: `float-up ${card.duration}s linear ${card.delay}s infinite`,
            // @ts-expect-error custom props
            "--drift": `${card.drift}px`,
            "--rotate": `${card.rotate}deg`,
          }}
        >
          {card.suit}
        </span>
      ))}

      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) translateX(var(--drift)) rotate(var(--rotate));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
