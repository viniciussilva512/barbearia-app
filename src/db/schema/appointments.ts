import {
  check,
  foreignKey,
  index,
  pgEnum,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { barbershops } from "./barbershops";
import { barbers } from "./barbers";
import { customers } from "./customers";

export const appointmentStatusEnum = pgEnum("appointment_status", [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
]);

export const appointments = pgTable(
  "appointments",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    barbershopId: uuid("barbershop_id")
      .notNull()
      .references(() => barbershops.id, { onDelete: "restrict" }),

    barberId: uuid("barber_id").notNull(),

    customerId: uuid("customer_id").notNull(),

    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),

    endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),

    status: appointmentStatusEnum("status").notNull().default("pending"),

    notes: varchar("notes", { length: 500 }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check(
      "appointments_valid_period",
      sql`${table.endsAt} > ${table.startsAt}`,
    ),

    foreignKey({
      columns: [table.barbershopId, table.barberId],
      foreignColumns: [barbers.barbershopId, barbers.id],
      name: "appointments_barbershop_barber_fk",
    }).onDelete("restrict"),

    foreignKey({
      columns: [table.barbershopId, table.customerId],
      foreignColumns: [customers.barbershopId, customers.id],
      name: "appointments_barbershop_customer_fk",
    }).onDelete("restrict"),

    uniqueIndex("barbershop_appointment_id_unique").on(
      table.barbershopId,
      table.id,
    ),

    index("appointments_barber_start_idx").on(table.barberId, table.startsAt),

    index("appointments_customer_start_idx").on(
      table.customerId,
      table.startsAt,
    ),

    index("appointments_barbershop_start_idx").on(
      table.barbershopId,
      table.startsAt,
    ),
  ],
);
