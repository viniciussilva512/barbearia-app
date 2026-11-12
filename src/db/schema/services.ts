import {
  boolean,
  check,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

import { barbershops } from "./barbershops";

export const services = pgTable(
  "services",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    barbershopId: uuid("barbershop_id")
      .notNull()
      .references(() => barbershops.id, { onDelete: "restrict" }),

    name: varchar("name", { length: 120 }).notNull(),

    slug: varchar("slug", { length: 100 }).notNull(),

    description: varchar("description", { length: 500 }),

    durationMinutes: integer("duration_minutes").notNull(),

    priceInCents: integer("price_in_cents").notNull(),

    requiresDeposit: boolean("requires_deposit").notNull().default(false),

    isActive: boolean("is_active").notNull().default(true),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check("services_duration_positive", sql`${table.durationMinutes} > 0`),

    check("services_price_non_negative", sql`${table.priceInCents} >= 0`),

    uniqueIndex("barbershop_service_id_unique").on(
      table.barbershopId,
      table.id,
    ),

    uniqueIndex("barbershop_service_slug_unique").on(
      table.barbershopId,
      table.slug,
    ),
  ],
);
