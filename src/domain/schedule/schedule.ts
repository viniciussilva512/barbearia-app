export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"

export type TimeRange = {
  start: string
  end: string
}

export type DailySchedule = {
  isOpen: boolean
  periods: TimeRange[]
}

export const schedule: Record<DayOfWeek, DailySchedule> = {
  monday: {
    isOpen: true,
    periods: [
      { start: "08:00", end: "12:00" },
      { start: "13:00", end: "18:00" },
    ],
  },
  tuesday: {
    isOpen: true,
    periods: [
      { start: "08:00", end: "12:00" },
      { start: "13:00", end: "18:00" },
    ],
  },
  wednesday: {
    isOpen: true,
    periods: [
      { start: "08:00", end: "12:00" },
      { start: "13:00", end: "18:00" },
    ],
  },
  thursday: {
    isOpen: true,
    periods: [
      { start: "08:00", end: "12:00" },
      { start: "13:00", end: "18:00" },
    ],
  },
  friday: {
    isOpen: true,
    periods: [
      { start: "08:00", end: "12:00" },
      { start: "13:00", end: "19:00" },
    ],
  },
  saturday: {
    isOpen: true,
    periods: [
      { start: "08:00", end: "12:00" },
      { start: "13:00", end: "17:00" },
    ],
  },
  sunday: {
    isOpen: false,
    periods: [],
  },
}

const dayOfWeekMap: Record<number, DayOfWeek> = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
}

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number)

  return hours * 60 + minutes
}

const minutesToTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return `${String(hours).padStart(2, "0")}:${String(
    remainingMinutes,
  ).padStart(2, "0")}`
}

export const getAvailableTimes = (
  date: Date,
  durationMinutes: number,
  intervalMinutes = 15,
) => {
  const dayOfWeek = dayOfWeekMap[date.getDay()]
  const dailySchedule = schedule[dayOfWeek]

  if (!dailySchedule.isOpen) {
    return []
  }

  const availableTimes: string[] = []

  for (const period of dailySchedule.periods) {
    const periodStart = timeToMinutes(period.start)
    const periodEnd = timeToMinutes(period.end)

    for (
      let start = periodStart;
      start + durationMinutes <= periodEnd;
      start += intervalMinutes
    ) {
      availableTimes.push(minutesToTime(start))
    }
  }

  return availableTimes
}