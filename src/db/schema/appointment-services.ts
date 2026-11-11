
import {
  foreignKey,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

import { appointments } from "./appointments"
import { services } from "./services"

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
)
