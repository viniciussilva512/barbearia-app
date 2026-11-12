import { and, eq } from "drizzle-orm";

import type { ServicesRepository } from "@/src/domain/services/services.repository";

import { db } from "@/src/db/index";
import { services } from "@/src/db/schema/services";

export const drizzleServicesRepository: ServicesRepository = {
  async listActiveByBarbershopId(barbershopId) {
    return db
      .select()
      .from(services)
      .where(
        and(
          eq(services.barbershopId, barbershopId),
          eq(services.isActive, true),
        ),
      );
  },
};
