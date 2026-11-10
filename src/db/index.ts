import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as barbershopsSchema from "./schema/barbershops";
import * as usersSchema from "./schema/users";
import * as barbersSchema from "./schema/barbers";
import * as servicesSchema from "./schema/services";
import * as businessHoursSchema from "./schema/business-hours";
import * as barberSchedulesSchema from "./schema/barber-schedules";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL nao foi definida");
}

const client = postgres(databaseUrl);

export const db = drizzle({
  client,
  schema: {
    ...barbershopsSchema,
    ...usersSchema,
    ...barbersSchema,
    ...servicesSchema,
    ...businessHoursSchema,
    ...barberSchedulesSchema,
  },
});
