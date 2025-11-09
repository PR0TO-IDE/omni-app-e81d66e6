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
    { id: "discover", label: "Discover", glyph: "●" },
    { id: "my-rides", label: "My rides", glyph: "○" },
    { id: "profile", label: "Profile", glyph: "◎" },
  ]

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-4 pb-3"
      aria-label="RideConnect navigation"
    >
      <div className="flex items-center justify-between gap-1.5 rounded-3xl border border-border bg-white/90 px-2.5 py-1.5 shadow-sm backdrop-blur-md">
        {items.map(item => {
          const isActive = item.id === activeTab
          return (
            <Button
              key={item.id}
              type="button"
              variant="ghost"
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-1.5 text-[9px] font-medium tracking-[0.14em] uppercase text-slate-500",
                "h-[52px] min-h-[52px]",
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "hover:bg-slate-100 hover:text-slate-900"
              )}
              onClick={() => onChange(item.id)}
            >
              <span
                className={cn(
                  "text-[14px] leading-none",
                  isActive ? "text-white" : "text-slate-400"
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
