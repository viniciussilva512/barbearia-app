import type { BarbersRepository } from "./barbers.repository";

export function createListActiveBarbersUseCase(
  barbersRepository: BarbersRepository,
) {
  return async function listActiveBarbers(barbershopId: string) {
    if (!barbershopId.trim()) {
      throw new Error("O ID da barbearia é obrigatório.");
    }

    return barbersRepository.listActiveByBarbershopId(barbershopId);
  };
}
