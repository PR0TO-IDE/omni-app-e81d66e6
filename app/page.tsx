"use client"

import React, { useEffect, useMemo, useState } from "react"
import { v4 as uuid } from "uuid"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"

import { RideCard, type Ride } from "./components/RideCard"
import { CreateRideForm, type NewRideInput } from "./components/CreateRideForm"
import { ProfileCard, type Profile } from "./components/ProfileCard"
import { BottomNav, type TabId } from "./components/BottomNav"

const RIDES_KEY = "rc_rides"
const PROFILE_KEY = "rc_profile"
const BOOKMARKS_KEY = "rc_bookmarks"
const JOINED_KEY = "rc_joined"

const defaultProfile: Profile = {
  name: "",
  city: "",
  pace: "",
  typicalDistance: "",
  rideTypes: "",
  bio: "",
}

const seedRides = (): Ride[] => {
  const now = new Date()
  const fmt = (d: Date) => d.toLocaleDateString(undefined, { month: "short", day: "numeric" })

  const d1 = new Date(now)
  d1.setDate(now.getDate() + 1)
  const d2 = new Date(now)
  d2.setDate(now.getDate() + 3)
  const d3 = new Date(now)
  d3.setDate(now.getDate() + 5)

  return [
    {
      id: uuid(),
      title: "Sunrise riverfront tempo",
      date: fmt(d1),
      time: "06:10",
      startLocation: "Riverfront Park – East gate",
      distanceKm: 42,
      pace: "27-30 km/h",
      level: "Intermediate",
      notes: "Steady paceline, no drops. Quick espresso stop after.",
      createdByMe: false,
    },
    {
      id: uuid(),
      title: "City lights social loop",
      date: fmt(d2),
      time: "19:00",
      startLocation: "Central Plaza Fountain",
      distanceKm: 28,
      pace: "20-24 km/h",
      level: "All Levels",
      notes: "No-drop, chatty, lights required. Perfect for new riders.",
      createdByMe: false,
    },
    {
      id: uuid(),
      title: "Gravel ridge sunrise climb",
      date: fmt(d3),
      time: "07:00",
      startLocation: "Oakridge Trailhead lot",
      distanceKm: 55,
      pace: "25-28 km/h",
      level: "Advanced",
      notes: "Mixed surface, long climbs, bring 32c+ tires and snacks.",
      createdByMe: false,
    },
  ]
}

const HeaderBar: React.FC = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-40 mx-auto flex h-14 max-w-md items-center justify-between border-b border-border bg-background/95 px-4 pb-1 pt-2 backdrop-blur-md">
      <div className="flex flex-col leading-tight">
        <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500">
          RideConnect
        </span>
        <h1 className="text-[17px] font-semibold tracking-tight text-slate-900">
          Simple rides, nearby
        </h1>
      </div>
      <Button
        type="button"
        size="icon"
        className="h-8 w-8 rounded-full bg-slate-900 text-[16px] text-white hover:bg-slate-800"
        aria-label="Quick actions"
      >
        ···
      </Button>
    </header>
  )
}

interface FilterTabsProps {
  activeTab: TabId
  onChange: (tab: TabId) => void
}

const FilterTabs: React.FC<FilterTabsProps> = ({ activeTab, onChange }) => {
  const items: { id: TabId; label: string }[] = [
    { id: "discover", label: "Discover" },
    { id: "my-rides", label: "My rides" },
    { id: "profile", label: "Profile" },
  ]

  return (
    <div className="mt-16 mb-2 flex w-full justify-center">
      <div className="inline-flex w-full max-w-md items-center rounded-2xl border border-border bg-white px-1.5 py-1 shadow-sm">
        {items.map(item => {
          const isActive = item.id === activeTab
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={cn(
                "flex-1 rounded-2xl px-2.5 py-1.5 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500 transition-colors",
                isActive ? "bg-slate-900 text-white" : "hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface DiscoverRidesSectionProps {
  rides: Ride[]
  bookmarkedRideIds: string[]
  joinedRideIds: string[]
  onJoinRide: (id: string) => void
  onBookmarkRide: (id: string) => void
}

const DiscoverRidesSection: React.FC<DiscoverRidesSectionProps> = ({
  rides,
  bookmarkedRideIds,
  joinedRideIds,
  onJoinRide,
  onBookmarkRide,
}) => (
  <section className="mt-1 pb-24">
    <div className="mb-2 flex items-baseline justify-between px-1">
      <h2 className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
        Nearby meetups
      </h2>
      <span className="text-[10px] text-slate-400">
        {rides.length} curated rides
      </span>
    </div>
    <div>
      {rides.map(ride => (
        <RideCard
          key={ride.id}
          ride={ride}
          variant="discover"
          isBookmarked={bookmarkedRideIds.includes(ride.id)}
          isJoined={joinedRideIds.includes(ride.id)}
          onJoin={onJoinRide}
          onBookmark={onBookmarkRide}
        />
      ))}
      {rides.length === 0 && (
        <Card className="mt-2 rounded-3xl border border-dashed border-slate-200 bg-white px-4 py-4 text-[11px] text-slate-500">
          No rides yet. Use the button below to host the first meetup in your area.
        </Card>
      )}
    </div>
  </section>
)

interface MyRidesSectionProps {
  createdRides: Ride[]
  joinedRides: Ride[]
  onLeaveRide: (id: string) => void
}

const MyRidesSection: React.FC<MyRidesSectionProps> = ({
  createdRides,
  joinedRides,
  onLeaveRide,
}) => (
  <section className="mt-1 pb-24 flex flex-col gap-4">
    <div>
      <h2 className="mb-1 px-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
        Created by you
      </h2>
      {createdRides.length > 0 ? (
        createdRides.map(ride => (
          <RideCard
            key={ride.id}
            ride={ride}
            variant="my-created"
          />
        ))
      ) : (
        <Card className="rounded-3xl border border-dashed border-slate-200 bg-white px-4 py-4 text-[10px] text-slate-500">
          You have not hosted a ride yet. Use the create button below to start a simple
          meetup that matches your style.
        </Card>
      )}
    </div>

    <div>
      <h2 className="mb-1 px-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
        You are joining
      </h2>
      {joinedRides.length > 0 ? (
        joinedRides.map(ride => (
          <RideCard
            key={ride.id}
            ride={ride}
            variant="my-joined"
            isJoined
            onLeave={onLeaveRide}
          />
        ))
      ) : (
        <Card className="rounded-3xl border border-dashed border-slate-200 bg-white px-4 py-4 text-[10px] text-slate-500">
          Join a ride from Discover and it will appear here with a quick way to leave
          if plans change.
        </Card>
      )}
    </div>
  </section>
)

interface ProfileSectionProps {
  profile: Profile
  onProfileChange: (profile: Profile) => void
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  profile,
  onProfileChange,
}) => (
  <section className="mt-1 pb-24">
    <ProfileCard profile={profile} onChange={onProfileChange} />
  </section>
)

interface CreateRideSheetProps {
  open: boolean
  onClose: () => void
  onCreateRide: (ride: NewRideInput) => void
}

const CreateRideSheet: React.FC<CreateRideSheetProps> = ({
  open,
  onClose,
  onCreateRide,
}) => {
  if (!open) return null

  const handleSubmit = (ride: NewRideInput) => {
    onCreateRide(ride)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-t-3xl border border-border bg-background px-4 pb-4 pt-3 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex flex-col leading-tight">
            <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Host a meetup
            </span>
            <span className="text-[15px] font-semibold text-slate-900">
              Create a simple ride card
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-[14px] text-white hover:bg-slate-800"
            aria-label="Close create ride"
          >
            ×
          </button>
        </div>
        <CreateRideForm onSubmit={handleSubmit} onCancel={onClose} />
      </div>
    </div>
  )
}

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("discover")
  const [rides, setRides] = useState<Ride[]>([])
  const [profile, setProfile] = useState<Profile>(defaultProfile)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([])
  const [joinedIds, setJoinedIds] = useState<string[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const load = async () => {
      const [storedRides, storedProfile, storedBookmarks, storedJoined] =
        await Promise.all([
          api.get<Ride[]>(RIDES_KEY, []),
          api.get<Profile>(PROFILE_KEY, defaultProfile),
          api.get<string[]>(BOOKMARKS_KEY, []),
          api.get<string[]>(JOINED_KEY, []),
        ])

      const initialRides = storedRides.length > 0 ? storedRides : seedRides()
      if (storedRides.length === 0) {
        await api.set<Ride[]>(RIDES_KEY, initialRides)
      }

      setRides(initialRides)
      setProfile(storedProfile)
      setBookmarkedIds(storedBookmarks)
      setJoinedIds(storedJoined)
      setHydrated(true)
    }

    load()
  }, [])

  const persistRides = async (next: Ride[]) => {
    setRides(next)
    await api.set<Ride[]>(RIDES_KEY, next)
  }

  const persistBookmarks = async (next: string[]) => {
    setBookmarkedIds(next)
    await api.set<string[]>(BOOKMARKS_KEY, next)
  }

  const persistJoined = async (next: string[]) => {
    setJoinedIds(next)
    await api.set<string[]>(JOINED_KEY, next)
  }

  const handleCreateRide = async (input: NewRideInput) => {
    const newRide: Ride = {
      id: uuid(),
      ...input,
      createdByMe: true,
    }
    const next = [newRide, ...rides]
    await persistRides(next)
    if (!joinedIds.includes(newRide.id)) {
      await persistJoined([...joinedIds, newRide.id])
    }
    setActiveTab("my-rides")
  }

  const handleJoinRide = async (id: string) => {
    const isJoined = joinedIds.includes(id)
    if (isJoined) return
    const next = [...joinedIds, id]
    await persistJoined(next)
  }

  const handleLeaveRide = async (id: string) => {
    const next = joinedIds.filter(rid => rid !== id)
    await persistJoined(next)
  }

  const handleBookmarkRide = async (id: string) => {
    const isBookmarked = bookmarkedIds.includes(id)
    const next = isBookmarked
      ? bookmarkedIds.filter(rid => rid !== id)
      : [...bookmarkedIds, id]
    await persistBookmarks(next)
  }

  const handleProfileChange = async (nextProfile: Profile) => {
    setProfile(nextProfile)
    await api.set<Profile>(PROFILE_KEY, nextProfile)
  }

  const createdRides = useMemo(
    () => rides.filter(r => r.createdByMe),
    [rides]
  )

  const joinedRides = useMemo(
    () => rides.filter(r => joinedIds.includes(r.id)),
    [rides, joinedIds]
  )

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-background">
        <HeaderBar />
        <div className="pt-24 text-[11px] text-slate-500">
          Loading your rides...
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-background pb-20">
      <HeaderBar />
      <div className="pt-2">
        <FilterTabs activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "discover" && (
          <DiscoverRidesSection
            rides={rides}
            bookmarkedRideIds={bookmarkedIds}
            joinedRideIds={joinedIds}
            onJoinRide={handleJoinRide}
            onBookmarkRide={handleBookmarkRide}
          />
        )}

        {activeTab === "my-rides" && (
          <MyRidesSection
            createdRides={createdRides}
            joinedRides={joinedRides}
            onLeaveRide={handleLeaveRide}
          />
        )}

        {activeTab === "profile" && (
          <ProfileSection
            profile={profile}
            onProfileChange={handleProfileChange}
          />
        )}
      </div>

      <div className="fixed bottom-20 left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-4">
        <Button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="h-11 w-full rounded-2xl bg-slate-900 text-[13px] font-semibold tracking-wide text-white shadow-sm hover:bg-slate-800"
        >
          + Create a ride
        </Button>
      </div>

      <BottomNav activeTab={activeTab} onChange={setActiveTab} />

      <CreateRideSheet
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreateRide={handleCreateRide}
      />
    </main>
  )
}

export default HomePage
