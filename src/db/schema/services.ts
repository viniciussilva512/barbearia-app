import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

import { barbershops } from "./barbershops"

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),

  barbershopId: uuid("barbershop_id")
    .notNull()
    .references(() => barbershops.id, { onDelete: "restrict" }),

  name: varchar("name", { length: 120 }).notNull(),

  description: varchar("description", { length: 500 }),

  durationMinutes: integer("duration_minutes").notNull(),

  priceInCents: integer("price_in_cents").notNull(),

  requiresDeposit: boolean("requires_deposit")
    .notNull()
    .default(false),

  isActive: boolean("is_active").notNull().default(true),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})
