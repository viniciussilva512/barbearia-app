export type Service = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  durationMinutes: number;
  priceInCents: number;
  requiresDeposit: boolean;
};

export const calculateServicesTotal = (selectedServices: Service[]) =>
  selectedServices.reduce((total, service) => total + service.priceInCents, 0);

export const calculateServicesDuration = (selectedServices: Service[]) =>
  selectedServices.reduce(
    (total, service) => total + service.durationMinutes,
    0,
  );

export const DEPOSIT_IN_CENTS = 2000;

export const servicesRequireDeposit = (selectedServices: Service[]) =>
  calculateServicesTotal(selectedServices) > 5000;

export const calculateDeposit = (selectedServices: Service[]) =>
  servicesRequireDeposit(selectedServices) ? DEPOSIT_IN_CENTS : 0;

export const toggleServiceSelection = (
  selectedServiceIds: string[],
  serviceId: string,
) => {
  const comboId = "corte-barba";
  const individualServiceIds = ["corte", "barba"];

  if (serviceId === comboId) {
    const comboSelected = selectedServiceIds.includes(comboId);

    return comboSelected
      ? selectedServiceIds.filter((id) => id !== comboId)
      : [
          ...selectedServiceIds.filter(
            (id) => !individualServiceIds.includes(id),
          ),
          comboId,
        ];
  }

  const comboSelected = selectedServiceIds.includes(comboId);

  if (comboSelected && individualServiceIds.includes(serviceId)) {
    return [...selectedServiceIds.filter((id) => id !== comboId), serviceId];
  }

  return selectedServiceIds.includes(serviceId)
    ? selectedServiceIds.filter((id) => id !== serviceId)
    : [...selectedServiceIds, serviceId];
};
