import type { Barber } from "./barbers";

export interface BarbersRepository {
  listActiveByBarbershopId(barbershopId: string): Promise<Barber[]>;
}
