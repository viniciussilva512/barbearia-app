import { describe, expect, it, vi } from "vitest";

import { createListAvailableTimesUseCase } from "./list-available-times.use-case";
import type {
  ScheduleRepository,
  ScheduleRepositoryData,
} from "./schedule.repository";

const BARBERSHOP_ID = "barbershop-1";
const BARBER_ID = "barber-1";
const DATE = "2026-01-15";
const DURATION = 30;

function emptyAvailability(): ScheduleRepositoryData {
  return {
    businessHours: [],
    barberSchedules: [],
    appointments: [],
  };
}

function availability(
  overrides: Partial<ScheduleRepositoryData>,
): ScheduleRepositoryData {
  return {
    ...emptyAvailability(),
    ...overrides,
  };
}

function createRepository(
  options: {
    timeZone?: string;
    data?: ScheduleRepositoryData;
  } = {},
) {
  const { timeZone = "America/Sao_Paulo", data = emptyAvailability() } =
    options;

  const findTimezone = vi.fn<ScheduleRepository["findTimezone"]>();
  findTimezone.mockResolvedValue(timeZone);

  const findAvailabilityData =
    vi.fn<ScheduleRepository["findAvailabilityData"]>();
  findAvailabilityData.mockResolvedValue(data);

  const repository = {
    findTimezone,
    findAvailabilityData,
  } satisfies ScheduleRepository;

  return {
    repository,
    findTimezone,
    findAvailabilityData,
  };
}

describe("validação de entrada", () => {
  it.each(["", "   "])(
    "rejeita barbershopId vazio (%j) sem consultar o repositório",
    async (barbershopId) => {
      const { repository, findTimezone, findAvailabilityData } =
        createRepository();
      const listAvailableTimes = createListAvailableTimesUseCase(repository);

      await expect(
        listAvailableTimes(barbershopId, BARBER_ID, DATE, DURATION),
      ).rejects.toThrow("O ID da barbearia é obrigatório.");

      expect(findTimezone).not.toHaveBeenCalled();
      expect(findAvailabilityData).not.toHaveBeenCalled();
    },
  );

  it.each(["", "   "])(
    "rejeita barberId vazio (%j) sem consultar o repositório",
    async (barberId) => {
      const { repository, findTimezone, findAvailabilityData } =
        createRepository();
      const listAvailableTimes = createListAvailableTimesUseCase(repository);

      await expect(
        listAvailableTimes(BARBERSHOP_ID, barberId, DATE, DURATION),
      ).rejects.toThrow("O ID do barbeiro é obrigatório.");

      expect(findTimezone).not.toHaveBeenCalled();
      expect(findAvailabilityData).not.toHaveBeenCalled();
    },
  );

  it.each([0, -15, Number.NaN, Number.POSITIVE_INFINITY])(
    "rejeita duração inválida (%s) sem consultar o repositório",
    async (durationMinutes) => {
      const { repository, findTimezone, findAvailabilityData } =
        createRepository();
      const listAvailableTimes = createListAvailableTimesUseCase(repository);

      await expect(
        listAvailableTimes(
          BARBERSHOP_ID,
          BARBER_ID,
          DATE,
          durationMinutes,
        ),
      ).rejects.toThrow("A duração deve ser um número positivo.");

      expect(findTimezone).not.toHaveBeenCalled();
      expect(findAvailabilityData).not.toHaveBeenCalled();
    },
  );

  it.each([
    "",
    "2024-2-03",
    "03/02/2024",
    "2024-13-01",
    "2024-04-31",
    "2023-02-29",
  ])(
    "rejeita data inválida (%j) sem consultar o repositório",
    async (date) => {
      const { repository, findTimezone, findAvailabilityData } =
        createRepository();
      const listAvailableTimes = createListAvailableTimesUseCase(repository);

      await expect(
        listAvailableTimes(BARBERSHOP_ID, BARBER_ID, date, DURATION),
      ).rejects.toThrow();

      expect(findTimezone).not.toHaveBeenCalled();
      expect(findAvailabilityData).not.toHaveBeenCalled();
    },
  );

  it("aceita uma data bissexta válida", async () => {
    const { repository, findTimezone } = createRepository();
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    await expect(
      listAvailableTimes(BARBERSHOP_ID, BARBER_ID, "2024-02-29", DURATION),
    ).resolves.toEqual([]);

    expect(findTimezone).toHaveBeenCalledWith(BARBERSHOP_ID);
  });
});

describe("contrato com o ScheduleRepository", () => {
  it("consulta o fuso e os dados do dia com os limites corretos", async () => {
    const { repository, findTimezone, findAvailabilityData } =
      createRepository();
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    const result = await listAvailableTimes(
      BARBERSHOP_ID,
      BARBER_ID,
      DATE,
      DURATION,
    );

    expect(result).toEqual([]);
    expect(findTimezone).toHaveBeenCalledWith(BARBERSHOP_ID);
    expect(findAvailabilityData).toHaveBeenCalledWith({
      barbershopId: BARBERSHOP_ID,
      barberId: BARBER_ID,
      dayOfWeek: 4,
      startOfDay: new Date("2026-01-15T03:00:00.000Z"),
      endOfDay: new Date("2026-01-16T03:00:00.000Z"),
    });
  });

  it("calcula o dia da semana com domingo igual a zero", async () => {
    const { repository, findAvailabilityData } = createRepository();
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    await listAvailableTimes(
      BARBERSHOP_ID,
      BARBER_ID,
      "2026-01-18",
      DURATION,
    );

    expect(findAvailabilityData).toHaveBeenCalledWith(
      expect.objectContaining({ dayOfWeek: 0 }),
    );
  });

  it("rejeita fuso vazio sem consultar os dados de disponibilidade", async () => {
    const { repository, findTimezone, findAvailabilityData } =
      createRepository();
    findTimezone.mockResolvedValueOnce("   ");
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    await expect(
      listAvailableTimes(BARBERSHOP_ID, BARBER_ID, DATE, DURATION),
    ).rejects.toThrow("O fuso horário da barbearia não foi encontrado.");

    expect(findAvailabilityData).not.toHaveBeenCalled();
  });

  it("propaga erro do findTimezone sem consultar os dados de disponibilidade", async () => {
    const { repository, findTimezone, findAvailabilityData } =
      createRepository();
    const error = new Error("Barbearia não encontrada.");
    findTimezone.mockRejectedValueOnce(error);
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    await expect(
      listAvailableTimes(BARBERSHOP_ID, BARBER_ID, DATE, DURATION),
    ).rejects.toBe(error);

    expect(findAvailabilityData).not.toHaveBeenCalled();
  });
});

describe("disponibilidade básica", () => {
  it("gera todos os horários de 15 em 15 minutos no dia inteiro", async () => {
    const { repository } = createRepository({
      data: availability({
        businessHours: [{ startTime: "08:00:00", endTime: "18:00:00" }],
        barberSchedules: [{ startTime: "08:00:00", endTime: "18:00:00" }],
      }),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    const result = await listAvailableTimes(
      BARBERSHOP_ID,
      BARBER_ID,
      DATE,
      DURATION,
    );

    expect(result).toEqual([
      "08:00",
      "08:15",
      "08:30",
      "08:45",
      "09:00",
      "09:15",
      "09:30",
      "09:45",
      "10:00",
      "10:15",
      "10:30",
      "10:45",
      "11:00",
      "11:15",
      "11:30",
      "11:45",
      "12:00",
      "12:15",
      "12:30",
      "12:45",
      "13:00",
      "13:15",
      "13:30",
      "13:45",
      "14:00",
      "14:15",
      "14:30",
      "14:45",
      "15:00",
      "15:15",
      "15:30",
      "15:45",
      "16:00",
      "16:15",
      "16:30",
      "16:45",
      "17:00",
      "17:15",
      "17:30",
    ]);
  });
});

describe("interseção entre expediente e escala", () => {
  it("retorna vazio quando não há interseção", async () => {
    const { repository } = createRepository({
      data: availability({
        businessHours: [{ startTime: "08:00:00", endTime: "12:00:00" }],
        barberSchedules: [{ startTime: "13:00:00", endTime: "18:00:00" }],
      }),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    await expect(
      listAvailableTimes(BARBERSHOP_ID, BARBER_ID, DATE, DURATION),
    ).resolves.toEqual([]);
  });

  it("usa somente o intervalo comum entre expediente e escala", async () => {
    const { repository } = createRepository({
      data: availability({
        businessHours: [{ startTime: "08:00:00", endTime: "18:00:00" }],
        barberSchedules: [{ startTime: "10:00:00", endTime: "12:00:00" }],
      }),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    const result = await listAvailableTimes(
      BARBERSHOP_ID,
      BARBER_ID,
      DATE,
      DURATION,
    );

    expect(result).toEqual([
      "10:00",
      "10:15",
      "10:30",
      "10:45",
      "11:00",
      "11:15",
      "11:30",
    ]);
  });

  it("retorna vazio quando não há expediente", async () => {
    const { repository } = createRepository({
      data: availability({
        barberSchedules: [{ startTime: "08:00:00", endTime: "18:00:00" }],
      }),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    await expect(
      listAvailableTimes(BARBERSHOP_ID, BARBER_ID, DATE, DURATION),
    ).resolves.toEqual([]);
  });

  it("retorna vazio quando não há escala do barbeiro", async () => {
    const { repository } = createRepository({
      data: availability({
        businessHours: [{ startTime: "08:00:00", endTime: "18:00:00" }],
      }),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    await expect(
      listAvailableTimes(BARBERSHOP_ID, BARBER_ID, DATE, DURATION),
    ).resolves.toEqual([]);
  });
});

describe("geração de slots", () => {
  it("inicia os intervalos a partir do começo do período", async () => {
    const { repository } = createRepository({
      data: availability({
        businessHours: [{ startTime: "08:00:00", endTime: "10:00:00" }],
        barberSchedules: [{ startTime: "08:07:00", endTime: "09:07:00" }],
      }),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    const result = await listAvailableTimes(
      BARBERSHOP_ID,
      BARBER_ID,
      DATE,
      15,
    );

    expect(result).toEqual(["08:07", "08:22", "08:37", "08:52"]);
  });

  it("aceita um slot cuja duração termina exatamente no fim do período", async () => {
    const { repository } = createRepository({
      data: availability({
        businessHours: [{ startTime: "08:00:00", endTime: "12:00:00" }],
        barberSchedules: [{ startTime: "08:00:00", endTime: "12:00:00" }],
      }),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    await expect(
      listAvailableTimes(BARBERSHOP_ID, BARBER_ID, DATE, 240),
    ).resolves.toEqual(["08:00"]);
  });

  it("retorna vazio quando a duração é maior que o período", async () => {
    const { repository } = createRepository({
      data: availability({
        businessHours: [{ startTime: "08:00:00", endTime: "12:00:00" }],
        barberSchedules: [{ startTime: "08:00:00", endTime: "12:00:00" }],
      }),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    await expect(
      listAvailableTimes(BARBERSHOP_ID, BARBER_ID, DATE, 241),
    ).resolves.toEqual([]);
  });

  it("não duplica horários quando os períodos se sobrepõem", async () => {
    const { repository } = createRepository({
      data: availability({
        businessHours: [
          { startTime: "08:00:00", endTime: "12:00:00" },
          { startTime: "09:00:00", endTime: "11:00:00" },
        ],
        barberSchedules: [{ startTime: "08:00:00", endTime: "12:00:00" }],
      }),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    const result = await listAvailableTimes(
      BARBERSHOP_ID,
      BARBER_ID,
      DATE,
      DURATION,
    );

    expect(result).toEqual([
      "08:00",
      "08:15",
      "08:30",
      "08:45",
      "09:00",
      "09:15",
      "09:30",
      "09:45",
      "10:00",
      "10:15",
      "10:30",
      "10:45",
      "11:00",
      "11:15",
      "11:30",
    ]);
  });
});

describe("conflitos com agendamentos", () => {
  function availabilityWithAppointments(
    appointments: ScheduleRepositoryData["appointments"],
  ): ScheduleRepositoryData {
    return availability({
      businessHours: [{ startTime: "08:00:00", endTime: "10:00:00" }],
      barberSchedules: [{ startTime: "08:00:00", endTime: "10:00:00" }],
      appointments,
    });
  }

  it("remove os slots que se sobrepõem ao agendamento", async () => {
    const { repository } = createRepository({
      data: availabilityWithAppointments([
        {
          startsAt: new Date("2026-01-15T11:30:00.000Z"),
          endsAt: new Date("2026-01-15T12:00:00.000Z"),
        },
      ]),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    const result = await listAvailableTimes(
      BARBERSHOP_ID,
      BARBER_ID,
      DATE,
      DURATION,
    );

    expect(result).toEqual(["08:00", "09:00", "09:15", "09:30"]);
  });

  it("mantém slots que apenas encostam no início ou no fim do agendamento", async () => {
    const { repository } = createRepository({
      data: availabilityWithAppointments([
        {
          startsAt: new Date("2026-01-15T11:30:00.000Z"),
          endsAt: new Date("2026-01-15T12:00:00.000Z"),
        },
      ]),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    const result = await listAvailableTimes(
      BARBERSHOP_ID,
      BARBER_ID,
      DATE,
      DURATION,
    );

    expect(result).toContain("08:00");
    expect(result).toContain("09:00");
  });

  it("remove o slot quando a sobreposição é de apenas 1 milissegundo", async () => {
    const { repository } = createRepository({
      data: availabilityWithAppointments([
        {
          startsAt: new Date("2026-01-15T11:29:59.999Z"),
          endsAt: new Date("2026-01-15T12:00:00.000Z"),
        },
      ]),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    const result = await listAvailableTimes(
      BARBERSHOP_ID,
      BARBER_ID,
      DATE,
      DURATION,
    );

    expect(result).toEqual(["09:00", "09:15", "09:30"]);
  });

  it("remove o slot quando o agendamento termina 1 milissegundo depois do seu início", async () => {
    const { repository } = createRepository({
      data: availabilityWithAppointments([
        {
          startsAt: new Date("2026-01-15T10:30:00.000Z"),
          endsAt: new Date("2026-01-15T11:00:00.001Z"),
        },
      ]),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    const result = await listAvailableTimes(
      BARBERSHOP_ID,
      BARBER_ID,
      DATE,
      DURATION,
    );

    expect(result).toEqual([
      "08:15",
      "08:30",
      "08:45",
      "09:00",
      "09:15",
      "09:30",
    ]);
  });

  it("retorna vazio quando um agendamento cobre todo o período disponível", async () => {
    const { repository } = createRepository({
      data: availabilityWithAppointments([
        {
          startsAt: new Date("2026-01-15T11:00:00.000Z"),
          endsAt: new Date("2026-01-15T13:00:00.000Z"),
        },
      ]),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    await expect(
      listAvailableTimes(BARBERSHOP_ID, BARBER_ID, DATE, DURATION),
    ).resolves.toEqual([]);
  });

  it("não bloqueia slots quando o agendamento está fora do dia consultado", async () => {
    const { repository } = createRepository({
      data: availabilityWithAppointments([
        {
          startsAt: new Date("2026-01-14T11:00:00.000Z"),
          endsAt: new Date("2026-01-14T12:00:00.000Z"),
        },
      ]),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    const result = await listAvailableTimes(
      BARBERSHOP_ID,
      BARBER_ID,
      DATE,
      DURATION,
    );

    expect(result).toEqual([
      "08:00",
      "08:15",
      "08:30",
      "08:45",
      "09:00",
      "09:15",
      "09:30",
    ]);
  });

  it("remove somente os slots do agendamento conflitante entre múltiplos", async () => {
    const { repository } = createRepository({
      data: availabilityWithAppointments([
        {
          startsAt: new Date("2026-01-15T11:30:00.000Z"),
          endsAt: new Date("2026-01-15T12:00:00.000Z"),
        },
        {
          startsAt: new Date("2026-01-15T18:00:00.000Z"),
          endsAt: new Date("2026-01-15T19:00:00.000Z"),
        },
      ]),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    const result = await listAvailableTimes(
      BARBERSHOP_ID,
      BARBER_ID,
      DATE,
      DURATION,
    );

    expect(result).toEqual(["08:00", "09:00", "09:15", "09:30"]);
  });

  it("considera múltiplos agendamentos e remove somente os slots conflitantes", async () => {
    const { repository } = createRepository({
      data: availabilityWithAppointments([
        {
          startsAt: new Date("2026-01-15T11:00:00.000Z"),
          endsAt: new Date("2026-01-15T11:15:00.000Z"),
        },
        {
          startsAt: new Date("2026-01-15T12:30:00.000Z"),
          endsAt: new Date("2026-01-15T13:00:00.000Z"),
        },
      ]),
    });
    const listAvailableTimes = createListAvailableTimesUseCase(repository);

    const result = await listAvailableTimes(
      BARBERSHOP_ID,
      BARBER_ID,
      DATE,
      DURATION,
    );

    expect(result).toEqual(["08:15", "08:30", "08:45", "09:00"]);
  });
});
