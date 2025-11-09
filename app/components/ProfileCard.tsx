"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export type Profile = {
  name: string
  city: string
  pace: string
  typicalDistance: string
  rideTypes: string
  bio: string
}

interface ProfileCardProps {
  profile: Profile
  onChange: (profile: Profile) => void
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onChange }) => {
  const [draft, setDraft] = useState<Profile>(profile)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setDraft(profile)
  }, [profile])

  const initials = React.useMemo(() => {
    const source = draft.name || "RideConnect"
    const parts = source.trim().split(" ")
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase() || "R"
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
  }, [draft.name])

  const handleFieldChange = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setDraft(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    onChange(draft)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <Card className="rounded-3xl border border-border bg-card/90 text-card-foreground shadow-sm">
      <CardContent className="flex flex-col gap-3 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-[18px] font-semibold tracking-tight text-white">
            {initials}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
              Rider profile
            </span>
            <span className="text-[15px] font-semibold text-slate-900">
              Help crews match your style
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Field
            label="Name"
            value={draft.name}
            onChange={value => handleFieldChange("name", value)}
            placeholder="Name riders will see"
          />
          <Field
            label="City / Area"
            value={draft.city}
            onChange={value => handleFieldChange("city", value)}
            placeholder="Where you usually start from"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Field
            label="Typical pace"
            value={draft.pace}
            onChange={value => handleFieldChange("pace", value)}
            placeholder="26-30 km/h"
          />
          <Field
            label="Typical distance"
            value={draft.typicalDistance}
            onChange={value => handleFieldChange("typicalDistance", value)}
            placeholder="40-70 km"
          />
        </div>

        <Field
          label="Ride styles"
          value={draft.rideTypes}
          onChange={value => handleFieldChange("rideTypes", value)}
          placeholder="Gravel, climbs, coffee rides, city laps"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Short bio
          </label>
          <Textarea
            value={draft.bio}
            onChange={e => handleFieldChange("bio", e.target.value)}
            placeholder="Share your experience and what kind of rides you enjoy."
            className="min-h-[70px] rounded-2xl border-border bg-white text-[11px] text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <div className="mt-1 flex items-center gap-2">
          <Button
            type="button"
            onClick={handleSave}
            className="h-10 flex-1 rounded-2xl bg-slate-900 text-[11px] font-semibold tracking-wide text-white hover:bg-slate-800"
          >
            Save profile
          </Button>
          {saved && (
            <div className="inline-flex items-center rounded-xl bg-slate-900/5 px-2.5 py-1 text-[9px] font-medium text-slate-600">
              Saved
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface FieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const Field: React.FC<FieldProps> = ({ label, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500">
      {label}
    </label>
    <Input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-10 rounded-2xl border-border bg-white text-[11px] text-slate-800 placeholder:text-slate-400"
    />
  </div>
)
