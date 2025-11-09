"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type TabId = "discover" | "my-rides" | "profile"

interface BottomNavProps {
  activeTab: TabId
  onChange: (tab: TabId) => void
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChange }) => {
  const items: { id: TabId; label: string; glyph: string }[] = [
    { id: "discover", label: "Discover", glyph: "◎" },
    { id: "my-rides", label: "My Rides", glyph: "▤" },
    { id: "profile", label: "Profile", glyph: "✦" },
  ]

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-3 pb-3"
      aria-label="RideConnect navigation"
    >
      <div className="flex items-center justify-between gap-1.5 rounded-3xl bg-slate-950/95 px-2.5 py-1.5 shadow-[0_18px_55px_rgba(15,23,42,1)] ring-1 ring-slate-800/80 backdrop-blur-xl">
        {items.map(item => {
          const isActive = item.id === activeTab
          return (
            <Button
              key={item.id}
              type="button"
              variant="ghost"
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-0.5 rounded-2xl border border-transparent px-2 py-1.5 text-[9px] font-medium tracking-[0.12em] uppercase",
                "h-[56px] min-h-[56px]",
                isActive
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/60 shadow-[0_8px_24px_rgba(16,185,129,0.25)]"
                  : "text-slate-500 hover:text-slate-100 hover:bg-slate-900/80"
              )}
              onClick={() => onChange(item.id)}
            >
              <span
                className={cn(
                  "text-[15px] leading-none",
                  isActive ? "text-emerald-400" : "text-slate-500"
                )}
              >
                {item.glyph}
              </span>
              <span className="leading-none">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
