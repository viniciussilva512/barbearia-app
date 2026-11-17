
import { and, eq, gt, inArray, lt } from "drizzle-orm";

import type { ScheduleRepository } from "@/src/domain/schedule/schedule.repository";
import { db } from "@/src/db/index";
import { businessHours } from "@/src/db/schema/business-hours";
import { barberSchedules } from "@/src/db/schema/barber-schedules";
import { appointments } from "@/src/db/schema/appointments";
import { barbers } from "@/src/db/schema/barbers";
import { barbershops } from "@/src/db/schema/barbershops";

export const drizzleScheduleRepository: ScheduleRepository = {
  async findTimezone(barbershopId) {
    const [barbershop] = await db
      .select({
        timezone: barbershops.timezone,
      })
      .from(barbershops)
      .where(eq(barbershops.id, barbershopId))
      .limit(1);

    if (!barbershop) {
      throw new Error(
        `Barbearia não encontrada para o ID ${barbershopId}.`,
      );
    }

    return barbershop.timezone;
  },

  async findAvailabilityData(input) {
    const [businessHoursResult, barberSchedulesResult, appointmentsResult] =
      await Promise.all([
        db
          .select({
            startTime: businessHours.startTime,
            endTime: businessHours.endTime,
          })
          .from(businessHours)
          .where(
            and(
              eq(businessHours.barbershopId, input.barbershopId),
              eq(businessHours.dayOfWeek, input.dayOfWeek),
            ),
          ),

        db
          .select({
            startTime: barberSchedules.startTime,
            endTime: barberSchedules.endTime,
          })
          .from(barberSchedules)
          .innerJoin(
            barbers,
            eq(barberSchedules.barberId, barbers.id),
          )
          .where(
            and(
              eq(barbers.id, input.barberId),
              eq(barbers.barbershopId, input.barbershopId),
              eq(barbers.isActive, true),
              eq(barberSchedules.dayOfWeek, input.dayOfWeek),
            ),
          ),

        db
          .select({
            startsAt: appointments.startsAt,
            endsAt: appointments.endsAt,
          })
          .from(appointments)
          .where(
            and(
              eq(appointments.barbershopId, input.barbershopId),
              eq(appointments.barberId, input.barberId),
              inArray(appointments.status, ["pending", "confirmed"]),
              lt(appointments.startsAt, input.endOfDay),
              gt(appointments.endsAt, input.startOfDay),
            ),
          ),
      ]);

    return {
      businessHours: businessHoursResult,
      barberSchedules: barberSchedulesResult,
      appointments: appointmentsResult,
    };
  },
};
