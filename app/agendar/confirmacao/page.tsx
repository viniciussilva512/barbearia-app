"use client"

import { Suspense, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { barbers } from "@/src/domain/barbers/barbers"
import {
  calculateDeposit,
  calculateServicesDuration,
  calculateServicesTotal,
  services,
  servicesRequireDeposit,
} from "@/src/domain/services/services"

function ConfirmationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedServiceIds = useMemo(
    () => searchParams.get("servicos")?.split(",").filter(Boolean) ?? [],
    [searchParams],
  )

  const selectedBarberId = searchParams.get("barbeiro")
  const selectedDate = searchParams.get("data")
  const selectedTime = searchParams.get("horario")
  const customerName = searchParams.get("nome") ?? ""
  const customerPhone = searchParams.get("telefone") ?? ""
  const customerNotes = searchParams.get("observacao") ?? ""

  const selectedServices = useMemo(
    () =>
      services.filter((service) =>
        selectedServiceIds.includes(service.id),
      ),
    [selectedServiceIds],
  )

  const selectedBarber = useMemo(
    () => barbers.find((barber) => barber.id === selectedBarberId),
    [selectedBarberId],
  )

  const totalPriceInCents = calculateServicesTotal(selectedServices)
  const totalDurationMinutes = calculateServicesDuration(selectedServices)
  const requiresDeposit = servicesRequireDeposit(selectedServices)
  const depositInCents = calculateDeposit(selectedServices)
  const remainingInCents = totalPriceInCents - depositInCents

  const formatPrice = (valueInCents: number) =>
    `R$ ${(valueInCents / 100).toFixed(2).replace(".", ",")}`

  const formattedDuration =
    totalDurationMinutes >= 60
      ? `${Math.floor(totalDurationMinutes / 60)}h${
          totalDurationMinutes % 60 > 0
            ? `${String(totalDurationMinutes % 60).padStart(2, "0")}`
            : ""
        }`
      : `${totalDurationMinutes} min`

  const formattedDate = selectedDate
    ? selectedDate.split("-").reverse().join("/")
    : "Não selecionada"

  const handleConfirm = () => {
    router.push("/agendar/sucesso")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="mb-10 space-y-3">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Agendamento
          </span>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Confirme seu agendamento
          </h1>

          <p className="max-w-2xl text-muted-foreground">
            Confira os dados abaixo antes de finalizar.
          </p>
        </div>

        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <CalendarDays className="size-5 text-primary" />

              <div>
                <h2 className="font-semibold">Atendimento</h2>

                <p className="text-sm text-muted-foreground">
                  Confira quando e com quem será realizado.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Data</p>
                <p className="mt-1 font-medium">{formattedDate}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Horário</p>

                <p className="mt-1 flex items-center gap-2 font-medium">
                  <Clock3 className="size-4 text-primary" />
                  {selectedTime ?? "Não selecionado"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Profissional
                </p>

                <p className="mt-1 font-medium">
                  {selectedBarber?.name ?? "Não selecionado"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold">Serviços</h2>

            <div className="mt-5 space-y-4">
              {selectedServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="font-medium">{service.name}</p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {service.durationMinutes} min
                    </p>
                  </div>

                  <p className="font-medium">
                    {formatPrice(service.priceInCents)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
              <div>
                <p className="text-sm text-muted-foreground">Duração total</p>
                <p className="mt-1 font-medium">{formattedDuration}</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="mt-1 text-2xl font-semibold text-primary">
                  {formatPrice(totalPriceInCents)}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <UserRound className="size-5 text-primary" />

              <h2 className="font-semibold">Seus dados</h2>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Nome</p>
                <p className="mt-1 font-medium">
                  {customerName || "Não informado"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">WhatsApp</p>
                <p className="mt-1 font-medium">
                  {customerPhone || "Não informado"}
                </p>
              </div>
            </div>

            {customerNotes && (
              <div className="mt-5">
                <p className="text-sm text-muted-foreground">Observação</p>

                <p className="mt-1 text-sm leading-6">{customerNotes}</p>
              </div>
            )}
          </section>

          {requiresDeposit && (
            <section className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <h2 className="font-semibold">Sinal para confirmação</h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Este agendamento exige um sinal de{" "}
                <strong className="text-foreground">
                  {formatPrice(depositInCents)}
                </strong>
                . O valor será descontado do total no dia do atendimento.
              </p>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Total do atendimento
                  </span>

                  <span className="font-medium">
                    {formatPrice(totalPriceInCents)}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Sinal</span>

                  <span className="font-medium">
                    {formatPrice(depositInCents)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 border-t border-primary/10 pt-3">
                  <span className="font-medium">Restante no atendimento</span>

                  <span className="font-semibold">
                    {formatPrice(remainingInCents)}
                  </span>
                </div>
              </div>
            </section>
          )}

          {!requiresDeposit && (
            <section className="rounded-xl border border-border bg-card p-6">
              <p className="text-sm leading-6 text-muted-foreground">
                Não é necessário pagar sinal para este agendamento. O
                pagamento será realizado no atendimento.
              </p>
            </section>
          )}
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.back()}
          >
            <ArrowLeft />
            Voltar
          </Button>

          <Button size="lg" onClick={handleConfirm}>
            Confirmar agendamento
            <CheckCircle2 />
          </Button>
        </div>
      </div>
    </main>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  )
}