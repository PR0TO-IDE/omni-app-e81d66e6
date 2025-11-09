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
        "mb-4 rounded-3xl border border-border bg-card/80 text-card-foreground shadow-sm",
        "px-4 py-4 sm:px-5 sm:py-4",
        "hover:shadow-md hover:bg-card transition-all duration-150"
      )}
    >
      <CardContent className="p-0 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-slate-900">
                {ride.title}
              </h2>
              {ride.level && (
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-slate-600">
                  {ride.level}
                </span>
              )}
              {showCreatedBy && (
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[8px] font-medium text-slate-600">
                  Created by you
                </span>
              )}
              {variant === "my-joined" && (
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[8px] font-medium text-slate-600">
                  Joined
                </span>
              )}
            </div>
            <p className="mt-0.5 line-clamp-2 text-[12px] text-slate-500">
              {ride.startLocation}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 text-right text-[10px] text-slate-500">
            {(ride.distanceKm || ride.pace) && (
              <div className="flex flex-col items-end leading-snug">
                {ride.distanceKm !== undefined && (
                  <span className="text-[11px] font-semibold text-slate-900">
                    {ride.distanceKm.toFixed(1)} km
                  </span>
                )}
                {ride.pace && <span>{ride.pace}</span>}
              </div>
            )}
            <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase tracking-[0.16em] text-slate-500">
                {ride.date}
              </span>
              <span className="text-[11px] text-slate-700">{ride.time}</span>
            </div>
          </div>
        </div>

        {ride.notes && (
          <p className="text-[11px] leading-relaxed text-slate-500">
            {ride.notes}
          </p>
        )}

        <div className="mt-1 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
            <span className="inline-flex h-5 min-w-[30px] items-center justify-center rounded-full bg-slate-100 px-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              {variant === "my-created"
                ? "Host"
                : variant === "my-joined"
                ? "Joined"
                : "Nearby"}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-1.5">
            {showJoin && (
              <Button
                type="button"
                size="sm"
                className={cn(
                  "h-9 min-w-[96px] rounded-full px-3 text-[11px] font-medium",
                  isJoined
                    ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                )}
                onClick={handleJoin}
              >
                {isJoined ? "Joined" : "Join"}
              </Button>
            )}

            {showLeave && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-9 min-w-[72px] rounded-full px-3 text-[10px] font-medium text-rose-500 hover:bg-rose-50"
                onClick={handleLeave}
              >
                Leave
              </Button>
            )}

            {showJoin && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label={isBookmarked ? "Remove bookmark" : "Bookmark ride"}
                className={cn(
                  "h-8 w-8 rounded-full border border-transparent text-[15px]",
                  isBookmarked
                    ? "border-slate-900 bg-slate-900 text-white hover:bg-slate-800"
                    : "text-slate-400 hover:bg-slate-100 hover:text-slate-900"
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
