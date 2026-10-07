"use client"

import { Suspense, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { barbers } from "@/src/domain/barbers/barbers"
import { services } from "@/src/domain/services/services"
import { getAvailableTimes } from "@/src/domain/schedule/schedule"

function DateSelectionContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedServiceIds = useMemo(
    () => searchParams.get("servicos")?.split(",").filter(Boolean) ?? [],
    [searchParams],
  )

  const selectedBarberId = searchParams.get("barbeiro")

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

  const totalDurationMinutes = selectedServices.reduce(
    (total, service) => total + service.durationMinutes,
    0,
  )

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const availableTimes = useMemo(() => {
    if (!selectedDate || totalDurationMinutes === 0) {
      return []
    }

    const [year, month, day] = selectedDate.split("-").map(Number)
    const date = new Date(year, month - 1, day)

    return getAvailableTimes(date, totalDurationMinutes)
  }, [selectedDate, totalDurationMinutes])

  const handleDateChange = (date: string) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) {
      return
    }

    const params = new URLSearchParams({
      servicos: selectedServiceIds.join(","),
      barbeiro: selectedBarberId ?? "",
      data: selectedDate,
      horario: selectedTime,
    })

    router.push(`/agendar/dados?${params.toString()}`)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="mb-10 space-y-3">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Agendamento
          </span>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Escolha data e horário
          </h1>

          <p className="max-w-2xl text-muted-foreground">
            Escolha o melhor dia e horário para realizar seu atendimento.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Serviços</p>

            <p className="mt-2 font-medium">
              {selectedServices.length > 0
                ? selectedServices.map((service) => service.name).join(" • ")
                : "Nenhum serviço selecionado"}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Profissional</p>

            <p className="mt-2 font-medium">
              {selectedBarber?.name ?? "Nenhum profissional selecionado"}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="size-5 text-primary" />

            <div>
              <h2 className="font-semibold">Data do atendimento</h2>

              <p className="text-sm text-muted-foreground">
                A duração do atendimento é de {totalDurationMinutes} minutos.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="appointment-date"
              className="text-sm font-medium"
            >
              Selecione uma data
            </label>

            <input
              id="appointment-date"
              type="date"
              value={selectedDate ?? ""}
              onChange={(event) => handleDateChange(event.target.value)}
              className="mt-2 block h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            />
          </div>
        </div>

        {selectedDate && (
          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <Clock3 className="size-5 text-primary" />

              <div>
                <h2 className="font-semibold">Horários disponíveis</h2>

                <p className="text-sm text-muted-foreground">
                  Selecione um horário para continuar.
                </p>
              </div>
            </div>

            {availableTimes.length > 0 ? (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {availableTimes.map((time) => {
                  const isSelected = selectedTime === time

                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      aria-pressed={isSelected}
                      className={`flex h-11 items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-background hover:border-primary hover:bg-primary/5"
                      }`}
                    >
                      {isSelected && <Check className="size-4" />}
                      {time}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
                <p className="font-medium">
                  Não há horários disponíveis nesta data.
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Escolha outro dia para continuar.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-10 flex items-center justify-between gap-4">
          <a
            href={`/agendar/barbeiro?servicos=${selectedServiceIds.join(",")}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft />
            Voltar
          </a>

          <Button
            size="lg"
            disabled={!selectedDate || !selectedTime}
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

export default function DateSelectionPage() {
  return (
    <Suspense>
      <DateSelectionContent />
    </Suspense>
  )
}