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
      setError("Please add a title, date, time, and meetup location.")
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
      className="flex flex-col gap-3 text-slate-900"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
          Ride title
        </label>
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Sunrise loop, coffee ride, social spin..."
          className="h-11 rounded-2xl border-border bg-white text-[13px] placeholder:text-slate-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Date
          </label>
          <Input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="h-11 rounded-2xl border-border bg-white text-[12px]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Time
          </label>
          <Input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="h-11 rounded-2xl border-border bg-white text-[12px]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
          Meetup location
        </label>
        <Input
          value={startLocation}
          onChange={e => setStartLocation(e.target.value)}
          placeholder="Example: Central Plaza Fountain"
          className="h-11 rounded-2xl border-border bg-white text-[13px] placeholder:text-slate-400"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Distance (km)
          </label>
          <Input
            inputMode="decimal"
            value={distanceKm}
            onChange={e => setDistanceKm(e.target.value)}
            placeholder="40"
            className="h-11 rounded-2xl border-border bg-white text-[12px] placeholder:text-slate-400"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Pace
          </label>
          <Input
            value={pace}
            onChange={e => setPace(e.target.value)}
            placeholder="26-30 km/h"
            className="h-11 rounded-2xl border-border bg-white text-[12px] placeholder:text-slate-400"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
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
            className="h-11 w-full rounded-2xl border border-border bg-white px-3 text-[11px] text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <option value="" className="bg-white text-slate-400">
              Select
            </option>
            <option value="Beginner" className="bg-white">
              Beginner
            </option>
            <option value="Intermediate" className="bg-white">
              Intermediate
            </option>
            <option value="Advanced" className="bg-white">
              Advanced
            </option>
            <option value="All Levels" className="bg-white">
              All Levels
            </option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
          Notes
        </label>
        <Textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Surface, stops, rules, group size, expectations..."
          className="min-h-[72px] rounded-2xl border-border bg-white text-[12px] text-slate-800 placeholder:text-slate-400"
        />
      </div>

      {error && (
        <div className="rounded-2xl bg-rose-50 px-3 py-2 text-[10px] text-rose-600">
          {error}
        </div>
      )}

      <div className="mt-1 flex items-center justify-between gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            className="h-10 flex-1 rounded-2xl text-[11px] font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className="h-10 flex-1 rounded-2xl bg-slate-900 text-[12px] font-semibold tracking-wide text-white hover:bg-slate-800"
        >
          Create ride
        </Button>
      </div>
    </form>
  )
}
