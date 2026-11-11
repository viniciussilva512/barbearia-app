
CREATE TYPE "public"."appointment_status" AS ENUM('pending', 'confirmed', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."member_role" AS ENUM('owner', 'admin', 'staff');--> statement-breakpoint
CREATE TABLE "appointment_services" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "barbershop_id" uuid NOT NULL,
        "appointment_id" uuid NOT NULL,
        "service_id" uuid,
        "service_name" varchar(120) NOT NULL,
        "duration_minutes" integer NOT NULL,
        "price_in_cents" integer NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        CONSTRAINT "appointment_services_duration_positive"
          CHECK ("appointment_services"."duration_minutes" > 0),
        CONSTRAINT "appointment_services_price_non_negative"
          CHECK ("appointment_services"."price_in_cents" >= 0)
);
--> statement-breakpoint
CREATE TABLE "appointments" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "barbershop_id" uuid NOT NULL,
        "barber_id" uuid NOT NULL,
        "customer_id" uuid NOT NULL,
        "starts_at" timestamp with time zone NOT NULL,
        "ends_at" timestamp with time zone NOT NULL,
        "status" "appointment_status" DEFAULT 'pending' NOT NULL,
        "notes" varchar(500),
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
        CONSTRAINT "appointments_valid_period" CHECK ("appointments"."ends_at" > "appointments"."starts_at")
);
--> statement-breakpoint
CREATE TABLE "barber_schedules" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "barber_id" uuid NOT NULL,
        "day_of_week" integer NOT NULL,
        "start_time" time NOT NULL,
        "end_time" time NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
        CONSTRAINT "barber_schedules_valid_day" CHECK ("barber_schedules"."day_of_week" BETWEEN 0 AND 6),
        CONSTRAINT "barber_schedules_valid_period" CHECK ("barber_schedules"."end_time" > "barber_schedules"."start_time")
);
--> statement-breakpoint
CREATE TABLE "barbers" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "barbershop_id" uuid NOT NULL,
        "user_id" uuid,
        "name" varchar(120) NOT NULL,
        "phone" varchar(20),
        "is_active" boolean DEFAULT true NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "barbershops" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name" varchar(120) NOT NULL,
        "slug" varchar(100) NOT NULL,
        "phone" varchar(20),
        "email" varchar(255),
        "timezone" varchar(64) DEFAULT 'America/Fortaleza' NOT NULL,
        "is_active" boolean DEFAULT true NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
        CONSTRAINT "barbershops_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "business_hours" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "barbershop_id" uuid NOT NULL,
        "day_of_week" integer NOT NULL,
        "start_time" time NOT NULL,
        "end_time" time NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
        CONSTRAINT "business_hours_valid_day" CHECK ("business_hours"."day_of_week" BETWEEN 0 AND 6),
        CONSTRAINT "business_hours_valid_period" CHECK ("business_hours"."end_time" > "business_hours"."start_time")
);
--> statement-breakpoint
CREATE TABLE "customers" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "barbershop_id" uuid NOT NULL,
        "name" varchar(120) NOT NULL,
        "phone" varchar(20) NOT NULL,
        "email" varchar(255),
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "barbershop_id" uuid NOT NULL,
        "name" varchar(120) NOT NULL,
        "description" varchar(500),
        "duration_minutes" integer NOT NULL,
        "price_in_cents" integer NOT NULL,
        "requires_deposit" boolean DEFAULT false NOT NULL,
        "is_active" boolean DEFAULT true NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
        CONSTRAINT "services_duration_positive" CHECK ("services"."duration_minutes" > 0),
        CONSTRAINT "services_price_non_negative" CHECK ("services"."price_in_cents" >= 0)
);
--> statement-breakpoint
CREATE TABLE "barbershop_members" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "barbershop_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        "role" "member_role" NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name" varchar(120) NOT NULL,
        "email" varchar(255) NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
        CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "barbershop_appointment_id_unique" ON "appointments" USING btree ("barbershop_id","id");--> statement-breakpoint
CREATE INDEX "appointments_barber_start_idx" ON "appointments" USING btree ("barber_id","starts_at");--> statement-breakpoint
CREATE INDEX "appointments_customer_start_idx" ON "appointments" USING btree ("customer_id","starts_at");--> statement-breakpoint
CREATE INDEX "appointments_barbershop_start_idx" ON "appointments" USING btree ("barbershop_id","starts_at");--> statement-breakpoint
CREATE UNIQUE INDEX "barbershop_barber_user_unique" ON "barbers" USING btree ("barbershop_id","user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "barbershop_barber_id_unique" ON "barbers" USING btree ("barbershop_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "barbershop_customer_phone_unique" ON "customers" USING btree ("barbershop_id","phone");--> statement-breakpoint
CREATE UNIQUE INDEX "barbershop_customer_id_unique" ON "customers" USING btree ("barbershop_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "barbershop_service_id_unique" ON "services" USING btree ("barbershop_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "barbershop_members_unique" ON "barbershop_members" USING btree ("barbershop_id","user_id");--> statement-breakpoint
ALTER TABLE "appointment_services" ADD CONSTRAINT "appointment_services_barbershop_appointment_fk" FOREIGN KEY ("barbershop_id","appointment_id") REFERENCES "public"."appointments"("barbershop_id","id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointment_services" ADD CONSTRAINT "appointment_services_barbershop_service_fk" FOREIGN KEY ("barbershop_id","service_id") REFERENCES "public"."services"("barbershop_id","id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_barbershop_id_barbershops_id_fk" FOREIGN KEY ("barbershop_id") REFERENCES "public"."barbershops"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_barbershop_barber_fk" FOREIGN KEY ("barbershop_id","barber_id") REFERENCES "public"."barbers"("barbershop_id","id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_barbershop_customer_fk" FOREIGN KEY ("barbershop_id","customer_id") REFERENCES "public"."customers"("barbershop_id","id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "barber_schedules" ADD CONSTRAINT "barber_schedules_barber_id_barbers_id_fk" FOREIGN KEY ("barber_id") REFERENCES "public"."barbers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "barbers" ADD CONSTRAINT "barbers_barbershop_id_barbershops_id_fk" FOREIGN KEY ("barbershop_id") REFERENCES "public"."barbershops"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "barbers" ADD CONSTRAINT "barbers_barbershop_member_fk" FOREIGN KEY ("barbershop_id","user_id") REFERENCES "public"."barbershop_members"("barbershop_id","user_id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_hours" ADD CONSTRAINT "business_hours_barbershop_id_barbershops_id_fk" FOREIGN KEY ("barbershop_id") REFERENCES "public"."barbershops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_barbershop_id_barbershops_id_fk" FOREIGN KEY ("barbershop_id") REFERENCES "public"."barbershops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_barbershop_id_barbershops_id_fk" FOREIGN KEY ("barbershop_id") REFERENCES "public"."barbershops"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "barbershop_members" ADD CONSTRAINT "barbershop_members_barbershop_id_barbershops_id_fk" FOREIGN KEY ("barbershop_id") REFERENCES "public"."barbershops"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "barbershop_members" ADD CONSTRAINT "barbershop_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
