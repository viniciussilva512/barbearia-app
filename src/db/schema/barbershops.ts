import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

export const barbershops = pgTable("barbershops", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 120 }).notNull(),

  slug: varchar("slug", { length: 100 }).notNull().unique(),

  phone: varchar("phone", { length: 20 }),

  email: varchar("email", { length: 255 }),

  timezone: varchar("timezone", { length: 64 })
    .notNull()
    .default("America/Fortaleza"),

  isActive: boolean("is_active").notNull().default(true),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})
