export type Service = {
  id: string
  name: string
  description: string
  durationMinutes: number
  priceInCents: number
  requiresDeposit: boolean
}

export const services: Service[] = [
  {
    id: "corte",
    name: "Corte",
    description: "Corte masculino com acabamento completo.",
    durationMinutes: 40,
    priceInCents: 3500,
    requiresDeposit: false,
  },
  {
    id: "barba",
    name: "Barba",
    description: "Barba alinhada com acabamento profissional.",
    durationMinutes: 30,
    priceInCents: 2500,
    requiresDeposit: false,
  },
  {
    id: "corte-barba",
    name: "Corte + Barba",
    description: "O combo completo para sair renovado.",
    durationMinutes: 70,
    priceInCents: 5500,
    requiresDeposit: true,
  },
  {
    id: "sobrancelha",
    name: "Sobrancelha",
    description: "Acabamento preciso para completar o visual.",
    durationMinutes: 15,
    priceInCents: 1000,
    requiresDeposit: false,
  },
  {
    id: "pezinho",
    name: "Pezinho / Acabamento",
    description: "Acabamento rápido para manter o corte em dia.",
    durationMinutes: 15,
    priceInCents: 1500,
    requiresDeposit: false,
  },
  {
    id: "corte-infantil",
    name: "Corte infantil",
    description: "Corte para crianças de até 10 anos.",
    durationMinutes: 40,
    priceInCents: 3000,
    requiresDeposit: false,
  },
  {
    id: "pigmentacao-luzes",
    name: "Pigmentação / Luzes",
    description: "Procedimento completo para transformar o visual.",
    durationMinutes: 90,
    priceInCents: 8000,
    requiresDeposit: true,
  },
]

export const calculateServicesTotal = (selectedServices: Service[]) =>
  selectedServices.reduce(
    (total, service) => total + service.priceInCents,
    0,
  )

export const calculateServicesDuration = (selectedServices: Service[]) =>
  selectedServices.reduce(
    (total, service) => total + service.durationMinutes,
    0,
  )

export const DEPOSIT_IN_CENTS = 2000

export const servicesRequireDeposit = (selectedServices: Service[]) =>
  calculateServicesTotal(selectedServices) > 5000

export const calculateDeposit = (selectedServices: Service[]) =>
  servicesRequireDeposit(selectedServices) ? DEPOSIT_IN_CENTS : 0

export const toggleServiceSelection = (
  selectedServiceIds: string[],
  serviceId: string,
) => {
  const comboId = "corte-barba"
  const individualServiceIds = ["corte", "barba"]

  if (serviceId === comboId) {
    const comboSelected = selectedServiceIds.includes(comboId)

    return comboSelected
      ? selectedServiceIds.filter((id) => id !== comboId)
      : [
          ...selectedServiceIds.filter(
            (id) => !individualServiceIds.includes(id),
          ),
          comboId,
        ]
  }

  const comboSelected = selectedServiceIds.includes(comboId)

  if (comboSelected && individualServiceIds.includes(serviceId)) {
    return [
      ...selectedServiceIds.filter((id) => id !== comboId),
      serviceId,
    ]
  }

  return selectedServiceIds.includes(serviceId)
    ? selectedServiceIds.filter((id) => id !== serviceId)
    : [...selectedServiceIds, serviceId]
}