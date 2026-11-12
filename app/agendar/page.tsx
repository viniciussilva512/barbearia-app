import AgendarClient from "./agendar-client";

import { drizzleServicesRepository } from "@/src/db/repositories/services.repository";
import { createListActiveServicesUseCase } from "@/src/domain/services/list-active-services.use-case";

const BARBERSHOP_DEMO_ID = "3f02e18e-ccad-419d-b078-14c8dfc1d8cb";

const createListActiveServices = createListActiveServicesUseCase(
  drizzleServicesRepository,
);

export default async function AgendarPage() {
  const services = await createListActiveServices(BARBERSHOP_DEMO_ID);

  return <AgendarClient services={services} />;
}
