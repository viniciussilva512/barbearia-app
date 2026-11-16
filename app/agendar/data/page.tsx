
import DateSelectionClient from "./date-selection-client";

import { drizzleServicesRepository } from "@/src/db/repositories/services.repository";
import { drizzleBarbersRepository } from "@/src/db/repositories/barbers.repository";

import { createListActiveServicesUseCase } from "@/src/domain/services/list-active-services.use-case";
import { createListActiveBarbersUseCase } from "@/src/domain/barbers/list-active-barbers.use-case";

const BARBERSHOP_DEMO_ID = "3f02e18e-ccad-419d-b078-14c8dfc1d8cb";

const listActiveServices = createListActiveServicesUseCase(
  drizzleServicesRepository,
);

const listActiveBarbers = createListActiveBarbersUseCase(
  drizzleBarbersRepository,
);

export default async function DateSelectionPage() {
  const services = await listActiveServices(BARBERSHOP_DEMO_ID);
  const barbers = await listActiveBarbers(BARBERSHOP_DEMO_ID);

  return (
    <DateSelectionClient
      services={services}
      barbers={barbers}
    />
  );
}
