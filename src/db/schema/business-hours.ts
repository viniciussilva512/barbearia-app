import {
  check,
  integer,
  pgTable,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

import { barbershops } from "./barbershops";

export const businessHours = pgTable(
  "business_hours",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    barbershopId: uuid("barbershop_id")
      .notNull()
      .references(() => barbershops.id, { onDelete: "cascade" }),

    dayOfWeek: integer("day_of_week").notNull(),

    startTime: time("start_time").notNull(),

    endTime: time("end_time").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check("business_hours_valid_day", sql`${table.dayOfWeek} BETWEEN 0 AND 6`),


    check(
      "business_hours_valid_period",
      sql`${table.endTime} > ${table.startTime}`,
    ),
  ],
);
