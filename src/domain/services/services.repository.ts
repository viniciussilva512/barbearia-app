import type { Service } from "./services";

export interface ServicesRepository {
  listActiveByBarbershopId(barbershopId: string): Promise<Service[]>;
}
