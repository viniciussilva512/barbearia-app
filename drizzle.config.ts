import { loadEnvFile } from "node:process"
import { defineConfig } from "drizzle-kit"

loadEnvFile(".env.local")

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL nao foi definida em .env.local")
}

export default defineConfig({
  schema: "./src/db/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
})
