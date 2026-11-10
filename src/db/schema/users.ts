import {
  pgEnum,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

import { barbershops } from "./barbershops"

export const memberRoleEnum = pgEnum("member_role", [
  "owner",
  "admin",
  "staff",
])

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: varchar("name", { length: 120 }).notNull(),

    email: varchar("email", { length: 255 }).notNull().unique(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
)

export const barbershopMembers = pgTable(
  "barbershop_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    barbershopId: uuid("barbershop_id")
      .notNull()
      .references(() => barbershops.id, { onDelete: "cascade" }),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    role: memberRoleEnum("role").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("barbershop_members_unique").on(
      table.barbershopId,
      table.userId,
    ),
  ],
)
