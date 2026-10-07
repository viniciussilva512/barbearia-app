"use client"

import { Suspense, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { barbers } from "@/src/domain/barbers/barbers"
import { services } from "@/src/domain/services/services"

function BarberSelectionContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedServiceIds = useMemo(
    () => searchParams.get("servicos")?.split(",").filter(Boolean) ?? [],
    [searchParams],
  )

  const selectedServices = useMemo(
    () =>
      services.filter((service) =>
        selectedServiceIds.includes(service.id),
      ),
    [selectedServiceIds],
  )

  const [selectedBarberId, setSelectedBarberId] = useState<string | null>(
    null,
  )

  const handleContinue = () => {
    if (!selectedBarberId) {
      return
    }

    const params = new URLSearchParams({
      servicos: selectedServiceIds.join(","),
      barbeiro: selectedBarberId,
    })

    router.push(`/agendar/data?${params.toString()}`)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="mb-10 space-y-3">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Agendamento
          </span>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Escolha o profissional
          </h1>

          <p className="max-w-2xl text-muted-foreground">
            Selecione o profissional que realizará seu atendimento.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div>
            <p className="text-sm text-muted-foreground">Serviços</p>

            <p className="mt-2 font-medium">
              {selectedServices.length > 0
                ? selectedServices.map((service) => service.name).join(" • ")
                : "Nenhum serviço selecionado"}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {barbers.map((barber) => {
            const isSelected = selectedBarberId === barber.id

            return (
              <button
                key={barber.id}
                type="button"
                onClick={() => setSelectedBarberId(barber.id)}
                aria-pressed={isSelected}
                className={`flex items-center justify-between rounded-xl border p-5 text-left transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex size-11 items-center justify-center rounded-full ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <UserRound className="size-5" />
                  </div>

                  <div>
                    <p className="font-medium">{barber.name}</p>

                    {barber.isOwner && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        Proprietário
                      </p>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-4" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <a
            href={`/agendar?servicos=${selectedServiceIds.join(",")}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft />
            Voltar
          </a>

          <Button
            size="lg"
            disabled={!selectedBarberId}
            onClick={handleContinue}
          >
            Continuar
            <ArrowRight />
          </Button>
        </div>
      </div>
    </main>
  )
}

export default function BarberSelectionPage() {
  return (
    <Suspense>
      <BarberSelectionContent />
    </Suspense>
  )
}