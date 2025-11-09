"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export type NewRideInput = {
  title: string
  date: string
  time: string
  startLocation: string
  distanceKm?: number
  pace?: string
  level?: "Beginner" | "Intermediate" | "Advanced" | "All Levels"
  notes?: string
}

interface CreateRideFormProps {
  onSubmit: (ride: NewRideInput) => void
  onCancel?: () => void
}

export const CreateRideForm: React.FC<CreateRideFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [startLocation, setStartLocation] = useState("")
  const [distanceKm, setDistanceKm] = useState("")
  const [pace, setPace] = useState("")
  const [level, setLevel] = useState<
    "Beginner" | "Intermediate" | "Advanced" | "All Levels" | ""
  >("")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!title.trim() || !date.trim() || !time.trim() || !startLocation.trim()) {
      setError("Add a title, date, time, and meetup spot to create your ride.")
      return
    }

    const distanceNumber = distanceKm.trim()
      ? Number.parseFloat(distanceKm.trim())
      : undefined

    if (distanceNumber !== undefined && (Number.isNaN(distanceNumber) || distanceNumber <= 0)) {
      setError("Distance should be a positive number.")
      return
    }

    const payload: NewRideInput = {
      title: title.trim(),
      date: date.trim(),
      time: time.trim(),
      startLocation: startLocation.trim(),
      distanceKm: distanceNumber,
      pace: pace.trim() || undefined,
      level: level || undefined,
      notes: notes.trim() || undefined,
    }

    onSubmit(payload)

    setTitle("")
    setDate("")
    setTime("")
    setStartLocation("")
    setDistanceKm("")
    setPace("")
    setLevel("")
    setNotes("")
    setError("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2.5 text-slate-50"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
          Ride title
        </label>
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Sunrise tempo, coffee spin, city loop..."
          className="h-11 rounded-xl border-slate-800 bg-slate-950/80 text-[13px] placeholder:text-slate-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
            Date
          </label>
          <Input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="h-11 rounded-xl border-slate-800 bg-slate-950/80 text-[13px]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
            Time
          </label>
          <Input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="h-11 rounded-xl border-slate-800 bg-slate-950/80 text-[13px]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
          Meetup location
        </label>
        <Input
          value={startLocation}
          onChange={e => setStartLocation(e.target.value)}
          placeholder="Example: Riverfront Park, Main gate"
          className="h-11 rounded-xl border-slate-800 bg-slate-950/80 text-[13px] placeholder:text-slate-600"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
            Distance (km)
          </label>
          <Input
            inputMode="decimal"
            value={distanceKm}
            onChange={e => setDistanceKm(e.target.value)}
            placeholder="40"
            className="h-11 rounded-xl border-slate-800 bg-slate-950/80 text-[13px] placeholder:text-slate-600"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
            Pace
          </label>
          <Input
            value={pace}
            onChange={e => setPace(e.target.value)}
            placeholder="26-30 km/h"
            className="h-11 rounded-xl border-slate-800 bg-slate-950/80 text-[13px] placeholder:text-slate-600"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
            Level
          </label>
          <select
            value={level}
            onChange={e =>
              setLevel(
                e.target.value as
                  | "Beginner"
                  | "Intermediate"
                  | "Advanced"
                  | "All Levels"
                  | ""
              )
            }
            className="h-11 w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 text-[11px] text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
          >
            <option value="" className="bg-slate-950 text-slate-500">
              Select
            </option>
            <option value="Beginner" className="bg-slate-950">
              Beginner
            </option>
            <option value="Intermediate" className="bg-slate-950">
              Intermediate
            </option>
            <option value="Advanced" className="bg-slate-950">
              Advanced
            </option>
            <option value="All Levels" className="bg-slate-950">
              All Levels
            </option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
          Notes
        </label>
        <Textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Surface, stops, rules, group size, expectations..."
          className="min-h-[72px] rounded-xl border-slate-800 bg-slate-950/80 text-[12px] placeholder:text-slate-600"
        />
      </div>

      {error && (
        <div className="rounded-xl bg-rose-500/10 px-3 py-2 text-[10px] text-rose-300">
          {error}
        </div>
      )}

      <div className="mt-1 flex items-center justify-between gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            className="h-11 flex-1 rounded-xl text-[11px] font-medium text-slate-400 hover:bg-slate-900/80"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className="h-11 flex-1 rounded-xl bg-emerald-500 text-[12px] font-semibold tracking-wide text-black hover:bg-emerald-400"
        >
          Create ride
        </Button>
      </div>
    </form>
  )
}
