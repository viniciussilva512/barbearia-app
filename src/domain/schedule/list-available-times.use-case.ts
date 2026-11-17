import type { ScheduleRepository } from "./schedule.repository";

const SLOT_INTERVAL_MINUTES = 15;
const MINUTES_IN_DAY = 24 * 60;
const DAY_MS = 24 * 60 * 60 * 1000;

type DateParts = {
  year: number;
  month: number;
  day: number;
};

const formatterCache = new Map<string, Intl.DateTimeFormat>();

function getFormatter(timeZone: string): Intl.DateTimeFormat {
  const cached = formatterCache.get(timeZone);

  if (cached) {
    return cached;
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  formatterCache.set(timeZone, formatter);

  return formatter;
}

function getZonedParts(instant: Date, timeZone: string) {
  const parts = getFormatter(timeZone).formatToParts(instant);
  const values: Record<string, string> = {};

  for (const part of parts) {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  }

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
  };
}

function getOffsetMs(instant: Date, timeZone: string): number {
  const parts = getZonedParts(instant, timeZone);
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );
  const instantWithoutMilliseconds =
    Math.floor(instant.getTime() / 1000) * 1000;

  return asUtc - instantWithoutMilliseconds;
}

function getPossibleInstants(
  date: DateParts,
  hour: number,
  minute: number,
  timeZone: string,
): Date[] {
  const utcGuess = Date.UTC(
    date.year,
    date.month - 1,
    date.day,
    hour,
    minute,
    0,
    0,
  );
  const offsets = new Set<number>();

  for (const delta of [-2 * DAY_MS, -DAY_MS, 0, DAY_MS, 2 * DAY_MS]) {
    offsets.add(getOffsetMs(new Date(utcGuess + delta), timeZone));
  }

  const instants = new Set<number>();

  for (const offset of offsets) {
    const instant = utcGuess - offset;

    if (getOffsetMs(new Date(instant), timeZone) !== offset) {
      continue;
    }

    const parts = getZonedParts(new Date(instant), timeZone);
    const matchesRequestedWallTime =
      parts.year === date.year &&
      parts.month === date.month &&
      parts.day === date.day &&
      parts.hour === hour &&
      parts.minute === minute &&
      parts.second === 0;

    if (matchesRequestedWallTime) {
      instants.add(instant);
    }
  }

  return [...instants].sort((a, b) => a - b).map((ms) => new Date(ms));
}

function addDays(date: DateParts, days: number): DateParts {
  const next = new Date(Date.UTC(date.year, date.month - 1, date.day + days));

  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day: next.getUTCDate(),
  };
}

function formatDate(date: DateParts): string {
  return `${String(date.year).padStart(4, "0")}-${String(date.month).padStart(
    2,
    "0",
  )}-${String(date.day).padStart(2, "0")}`;
}

function findFirstInstantOfDate(
  date: DateParts,
  timeZone: string,
): Date | null {
  for (let minuteOfDay = 0; minuteOfDay < MINUTES_IN_DAY; minuteOfDay++) {
    const hour = Math.floor(minuteOfDay / 60);
    const minute = minuteOfDay % 60;
    const instants = getPossibleInstants(date, hour, minute, timeZone);

    if (instants.length > 0) {
      return instants[0];
    }
  }

  return null;
}

function getStartOfDay(date: DateParts, timeZone: string): Date {
  const midnights = getPossibleInstants(date, 0, 0, timeZone);

  if (midnights.length > 0) {
    return midnights[0];
  }

  const firstInstant = findFirstInstantOfDate(date, timeZone);

  if (firstInstant) {
    return firstInstant;
  }

  throw new Error(
    `Não foi possível determinar o início do dia ${formatDate(
      date,
    )} no fuso ${timeZone}.`,
  );
}

function getEndOfDay(date: DateParts, timeZone: string): Date {
  let candidate = addDays(date, 1);

  for (let attempt = 0; attempt < 3; attempt++) {
    const midnights = getPossibleInstants(candidate, 0, 0, timeZone);

    if (midnights.length > 0) {
      return midnights[0];
    }

    const firstInstant = findFirstInstantOfDate(candidate, timeZone);

    if (firstInstant) {
      return firstInstant;
    }

    candidate = addDays(candidate, 1);
  }

  throw new Error(
    `Não foi possível determinar o fim do dia ${formatDate(
      date,
    )} no fuso ${timeZone}.`,
  );
}

function parseDateOnly(value: string): DateParts {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    throw new Error("A data deve estar no formato YYYY-MM-DD.");
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const check = new Date(Date.UTC(year, month - 1, day));

  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) {
    throw new Error("A data informada é inválida.");
  }

  return { year, month, day };
}

function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function formatMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function createListAvailableTimesUseCase(
  scheduleRepository: ScheduleRepository,
) {
  return async function listAvailableTimes(
    barbershopId: string,
    barberId: string,
    date: string,
    durationMinutes: number,
  ): Promise<string[]> {
    if (!barbershopId.trim()) {
      throw new Error("O ID da barbearia é obrigatório.");
    }

    if (!barberId.trim()) {
      throw new Error("O ID do barbeiro é obrigatório.");
    }

    if (
      typeof durationMinutes !== "number" ||
      !Number.isFinite(durationMinutes) ||
      durationMinutes <= 0
    ) {
      throw new Error("A duração deve ser um número positivo.");
    }

    const dateParts = parseDateOnly(date);
    const timeZone = await scheduleRepository.findTimezone(barbershopId);

    if (!timeZone.trim()) {
      throw new Error("O fuso horário da barbearia não foi encontrado.");
    }

    const startOfDay = getStartOfDay(dateParts, timeZone);
    const endOfDay = getEndOfDay(dateParts, timeZone);
    const dayOfWeek = new Date(
      Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day),
    ).getUTCDay();

    const availability = await scheduleRepository.findAvailabilityData({
      barbershopId,
      barberId,
      dayOfWeek,
      startOfDay,
      endOfDay,
    });

    const durationMs = durationMinutes * 60_000;
    const availableTimes = new Set<string>();

    for (const businessHour of availability.businessHours) {
      const businessStart = parseTimeToMinutes(businessHour.startTime);
      const businessEnd = parseTimeToMinutes(businessHour.endTime);

      for (const barberSchedule of availability.barberSchedules) {
        const scheduleStart = parseTimeToMinutes(barberSchedule.startTime);
        const scheduleEnd = parseTimeToMinutes(barberSchedule.endTime);

        const periodStart = Math.max(businessStart, scheduleStart);
        const periodEnd = Math.min(businessEnd, scheduleEnd);

        if (periodStart >= periodEnd) {
          continue;
        }

        for (
          let startMinutes = periodStart;
          startMinutes + durationMinutes <= periodEnd;
          startMinutes += SLOT_INTERVAL_MINUTES
        ) {
          const candidateStarts = getPossibleInstants(
            dateParts,
            Math.floor(startMinutes / 60),
            startMinutes % 60,
            timeZone,
          );

          if (candidateStarts.length === 0) {
            continue;
          }

          const isAvailable = candidateStarts.every((candidateStart) => {
            const candidateEnd = new Date(
              candidateStart.getTime() + durationMs,
            );

            return !availability.appointments.some((appointment) => {
              return (
                appointment.startsAt.getTime() < candidateEnd.getTime() &&
                appointment.endsAt.getTime() > candidateStart.getTime()
              );
            });
          });

          if (isAvailable) {
            availableTimes.add(formatMinutes(startMinutes));
          }
        }
      }
    }

    return [...availableTimes].sort();
  };
}
