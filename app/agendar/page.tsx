"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  calculateDeposit,
  calculateServicesDuration,
  calculateServicesTotal,
  services,
  servicesRequireDeposit,
  toggleServiceSelection,
} from "@/src/domain/services/services";

export default function AgendarPage() {
  const router = useRouter();
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  const selectedServices = useMemo(
    () => services.filter((service) => selectedServiceIds.includes(service.id)),
    [selectedServiceIds],
  );

  const totalPriceInCents = calculateServicesTotal(selectedServices);
  const totalDurationMinutes = calculateServicesDuration(selectedServices);
  const requiresDeposit = servicesRequireDeposit(selectedServices);
  const depositInCents = calculateDeposit(selectedServices);
  const remainingInCents = totalPriceInCents - depositInCents;

  const toggleService = (serviceId: string) => {
    setSelectedServiceIds((current) =>
      toggleServiceSelection(current, serviceId),
    );
  };

  const handleContinue = () => {
    const serviceIds = selectedServiceIds.join(",");

    router.push(`/agendar/barbeiro?servicos=${serviceIds}`);
  };

  const formatPrice = (valueInCents: number) =>
    `R$ ${(valueInCents / 100).toFixed(2).replace(".", ",")}`;

  const formattedDuration =
    totalDurationMinutes >= 60
      ? `${Math.floor(totalDurationMinutes / 60)}h${
          totalDurationMinutes % 60 > 0
            ? `${String(totalDurationMinutes % 60).padStart(2, "0")}`
            : ""
        }`
      : `${totalDurationMinutes} min`;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="mb-10 space-y-3">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Agendamento
          </span>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Escolha seus serviços
          </h1>

          <p className="max-w-2xl text-muted-foreground">
            Você pode escolher mais de um serviço para realizar no mesmo
            atendimento.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => {
            const isSelected = selectedServiceIds.includes(service.id);

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => toggleService(service.id)}
                aria-pressed={isSelected}
                className={`rounded-xl border p-5 text-left transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex size-5 items-center justify-center rounded border ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border"
                      }`}
                    >
                      {isSelected && <Check className="size-3.5" />}
                    </span>

                    <h2 className="font-semibold">{service.name}</h2>
                  </div>

                  <span className="font-semibold text-primary">
                    {formatPrice(service.priceInCents)}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {service.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock3 className="size-4" />
                  {service.durationMinutes} min
                </div>
              </button>
            );
          })}
        </div>

        {selectedServices.length > 0 && (
          <div className="mt-8 rounded-xl border border-border bg-card p-5">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {selectedServices.length}{" "}
                    {selectedServices.length === 1
                      ? "serviço selecionado"
                      : "serviços selecionados"}
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock3 className="size-4" />
                    {formattedDuration}
                  </div>
                </div>

                <div className="sm:text-right">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-semibold text-primary">
                    {formatPrice(totalPriceInCents)}
                  </p>
                </div>
              </div>

              {requiresDeposit && (
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <p className="font-medium">Sinal necessário</p>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Para confirmar seu horário, você paga{" "}
                    <strong className="text-foreground">
                      {formatPrice(depositInCents)}
                    </strong>{" "}
                    de sinal. Esse valor será descontado do total no dia do
                    atendimento.
                  </p>

                  <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Sinal</span>
                      <span className="font-medium">
                        {formatPrice(depositInCents)}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Restante</span>
                      <span className="font-medium">
                        {formatPrice(remainingInCents)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Button
            size="lg"
            disabled={selectedServices.length === 0}
            onClick={handleContinue}
          >
            Continuar
            <ArrowRight />
          </Button>
        </div>
      </div>
    </main>
  );
}
