import {
  boolean,
  foreignKey,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { barbershops } from "./barbershops";
import { barbershopMembers } from "./users";

export const barbers = pgTable(
  "barbers",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    barbershopId: uuid("barbershop_id")
      .notNull()
      .references(() => barbershops.id, { onDelete: "restrict" }),

    userId: uuid("user_id"),

    name: varchar("name", { length: 120 }).notNull(),

    phone: varchar("phone", { length: 20 }),

    isActive: boolean("is_active").notNull().default(true),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    foreignKey({
      columns: [table.barbershopId, table.userId],
      foreignColumns: [
        barbershopMembers.barbershopId,
        barbershopMembers.userId,
      ],
      name: "barbers_barbershop_member_fk",
    }).onDelete("restrict"),

    uniqueIndex("barbershop_barber_user_unique").on(
      table.barbershopId,
      table.userId,
    ),

    uniqueIndex("barbershop_barber_id_unique").on(table.barbershopId, table.id),
  ],
);
