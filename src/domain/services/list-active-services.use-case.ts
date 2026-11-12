import type { ServicesRepository } from "./services.repository";

export function createListActiveServicesUseCase(
  servicesRepository: ServicesRepository,
) {
  return async function listActiveServices(barbershopId: string) {
    if (!barbershopId.trim()) {
      throw new Error("O ID da barbearia é obrigatório.");
    }

    return servicesRepository.listActiveByBarbershopId(barbershopId);
  };
}
