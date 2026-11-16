import { and, eq } from "drizzle-orm";

import type { BarbersRepository } from "@/src/domain/barbers/barbers.repository";

import { db } from "@/src/db/index";
import { barbers } from "@/src/db/schema/barbers";
import { barbershopMembers } from "@/src/db/schema/users";

export const drizzleBarbersRepository: BarbersRepository = {
  async listActiveByBarbershopId(barbershopId) {
    const result = await db
      .select({
        id: barbers.id,
        name: barbers.name,
        role: barbershopMembers.role,
      })
      .from(barbers)
      .leftJoin(
        barbershopMembers,
        and(
          eq(barbershopMembers.barbershopId, barbers.barbershopId),
          eq(barbershopMembers.userId, barbers.userId),
        ),
      )
      .where(
        and(eq(barbers.barbershopId, barbershopId), eq(barbers.isActive, true)),
      );

    return result.map((barber) => ({
      id: barber.id,
      name: barber.name,
      isOwner: barber.role === "owner",
    }));
  },
};
