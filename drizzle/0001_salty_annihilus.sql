ALTER TABLE "services" ADD COLUMN "slug" varchar(100) NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "barbershop_service_slug_unique" ON "services" USING btree ("barbershop_id","slug");