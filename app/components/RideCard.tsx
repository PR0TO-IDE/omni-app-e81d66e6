"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Ride = {
  id: string
  title: string
  date: string
  time: string
  startLocation: string
  distanceKm?: number
  pace?: string
  level?: "Beginner" | "Intermediate" | "Advanced" | "All Levels"
  notes?: string
  createdByMe?: boolean
}

export type RideVariant = "discover" | "my-created" | "my-joined"

export interface RideCardProps {
  ride: Ride
  isBookmarked?: boolean
  isJoined?: boolean
  variant?: RideVariant
  onJoin?: (id: string) => void
  onLeave?: (id: string) => void
  onBookmark?: (id: string) => void
}

export const RideCard: React.FC<RideCardProps> = ({
  ride,
  isBookmarked = false,
  isJoined = false,
  variant = "discover",
  onJoin,
  onLeave,
  onBookmark,
}) => {
  const showJoin = variant === "discover"
  const showLeave = variant === "my-joined"
  const showCreatedBy = variant === "my-created"

  const handleJoin = () => {
    if (!isJoined && onJoin) {
      onJoin(ride.id)
    }
  }

  const handleLeave = () => {
    if (onLeave) {
      onLeave(ride.id)
    }
  }

  const handleBookmark = () => {
    if (onBookmark) {
      onBookmark(ride.id)
    }
  }

  return (
    <Card
      className={cn(
        "mb-3 border-none bg-gradient-to-br from-slate-900/90 via-slate-950 to-black text-slate-50 shadow-[0_18px_45px_rgba(15,23,42,0.9)]",
        "rounded-2xl px-4 py-3",
        "hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(15,23,42,1)] transition-transform duration-200"
      )}
    >
      <CardContent className="p-0 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-[18px] font-semibold tracking-tight text-slate-50">
                {ride.title}
              </h2>
              {ride.level && (
                <span className="shrink-0 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-emerald-400">
                  {ride.level}
                </span>
              )}
            </div>
            <p className="mt-0.5 line-clamp-2 text-[11px] font-normal text-slate-400">
              {ride.startLocation}
            </p>
          </div>
          <div className="flex flex-col items-end gap-0.5 text-right">
            {(ride.distanceKm || ride.pace) && (
              <div className="flex flex-col items-end text-[10px] text-slate-400 leading-snug">
                {ride.distanceKm !== undefined && (
                  <span className="font-semibold text-slate-200">
                    {ride.distanceKm.toFixed(1)} km
                  </span>
                )}
                {ride.pace && <span>{ride.pace}</span>}
              </div>
            )}
            <div className="mt-1 flex flex-col items-end text-[9px] text-slate-500">
              <span className="uppercase tracking-[0.16em] text-slate-500">
                {ride.date}
              </span>
              <span className="text-slate-400">{ride.time}</span>
            </div>
          </div>
        </div>

        {ride.notes && (
          <p className="mt-1 line-clamp-2 text-[11px] text-slate-400">
            {ride.notes}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
            <span className="inline-flex h-5 min-w-[24px] items-center justify-center rounded-full bg-slate-900/90 px-1.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              {variant === "my-created"
                ? "HOST"
                : variant === "my-joined"
                ? "JOINED"
                : "LOCAL"}
            </span>
            {showCreatedBy && (
              <span className="rounded-full bg-emerald-500/5 px-2 py-0.5 text-[8px] font-medium text-emerald-400">
                Created by you
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-1.5">
            {showJoin && (
              <Button
                type="button"
                size="sm"
                className={cn(
                  "h-9 min-w-[88px] rounded-full px-3 text-[11px] font-semibold tracking-wide",
                  isJoined
                    ? "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/20"
                    : "bg-emerald-500 text-black hover:bg-emerald-400"
                )}
                onClick={handleJoin}
              >
                {isJoined ? "Joined" : "Join ride"}
              </Button>
            )}

            {showLeave && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-9 min-w-[72px] rounded-full px-3 text-[10px] font-medium text-rose-400 hover:bg-rose-500/10"
                onClick={handleLeave}
              >
                Leave
              </Button>
            )}

            {showJoin && (
              <Button
                type="button"
                size="icon"
                variant={isBookmarked ? "default" : "ghost"}
                aria-label={isBookmarked ? "Remove bookmark" : "Bookmark ride"}
                className={cn(
                  "h-9 w-9 rounded-full border border-slate-700/80 bg-slate-950/80 text-[15px]",
                  isBookmarked
                    ? "border-amber-400/80 bg-amber-500/10 text-amber-400"
                    : "text-slate-400 hover:text-amber-400"
                )}
                onClick={handleBookmark}
              >
                {isBookmarked ? "★" : "☆"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
