import {
  check,
  foreignKey,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

import { appointments } from "./appointments";
import { services } from "./services";

export const appointmentServices = pgTable(
  "appointment_services",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    barbershopId: uuid("barbershop_id").notNull(),

    appointmentId: uuid("appointment_id").notNull(),

    serviceId: uuid("service_id"),

    serviceName: varchar("service_name", { length: 120 }).notNull(),

    durationMinutes: integer("duration_minutes").notNull(),

    priceInCents: integer("price_in_cents").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check(
      "appointment_services_duration_positive",
      sql`${table.durationMinutes} > 0`,
    ),

    check(
      "appointment_services_price_non_negative",
      sql`${table.priceInCents} >= 0`,
    ),

    foreignKey({
      columns: [table.barbershopId, table.appointmentId],
      foreignColumns: [appointments.barbershopId, appointments.id],
      name: "appointment_services_barbershop_appointment_fk",
    }).onDelete("cascade"),

    foreignKey({
      columns: [table.barbershopId, table.serviceId],
      foreignColumns: [services.barbershopId, services.id],
      name: "appointment_services_barbershop_service_fk",
    }).onDelete("restrict"),
  ],
);
