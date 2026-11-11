import {
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { barbershops } from "./barbershops";

export const customers = pgTable(
  "customers",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    barbershopId: uuid("barbershop_id")
      .notNull()
      .references(() => barbershops.id, { onDelete: "cascade" }),

    name: varchar("name", { length: 120 }).notNull(),

    phone: varchar("phone", { length: 20 }).notNull(),

    email: varchar("email", { length: 255 }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("barbershop_customer_phone_unique").on(
      table.barbershopId,
      table.phone,
    ),

    uniqueIndex("barbershop_customer_id_unique").on(
      table.barbershopId,
      table.id,
    ),
  ],
);
