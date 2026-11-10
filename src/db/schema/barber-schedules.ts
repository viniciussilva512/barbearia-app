import {
  integer,
  pgTable,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

import { barbers } from "./barbers"

export const barberSchedules = pgTable("barber_schedules", {
  id: uuid("id").defaultRandom().primaryKey(),

  barberId: uuid("barber_id")
    .notNull()
    .references(() => barbers.id, { onDelete: "cascade" }),

  dayOfWeek: integer("day_of_week").notNull(),

  startTime: time("start_time").notNull(),

  endTime: time("end_time").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})
