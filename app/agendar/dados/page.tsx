"use client"

import { Suspense, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { barbers } from "@/src/domain/barbers/barbers"
import { services } from "@/src/domain/services/services"

function CustomerDataContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedServiceIds = useMemo(
    () => searchParams.get("servicos")?.split(",").filter(Boolean) ?? [],
    [searchParams],
  )

  const selectedBarberId = searchParams.get("barbeiro")
  const selectedDate = searchParams.get("data")
  const selectedTime = searchParams.get("horario")

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

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")

  const handleContinue = () => {
    if (!name.trim() || !phone.trim()) {
      return
    }

    const params = new URLSearchParams({
      servicos: selectedServiceIds.join(","),
      barbeiro: selectedBarberId ?? "",
      data: selectedDate ?? "",
      horario: selectedTime ?? "",
      nome: name.trim(),
      telefone: phone.trim(),
      observacao: notes.trim(),
    })

    router.push(`/agendar/confirmacao?${params.toString()}`)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="mb-10 space-y-3">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Agendamento
          </span>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Seus dados
          </h1>

          <p className="max-w-2xl text-muted-foreground">
            Informe seus dados para podermos confirmar o atendimento.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <UserRound className="size-5 text-primary" />

              <div>
                <h2 className="font-semibold">Dados do cliente</h2>

                <p className="text-sm text-muted-foreground">
                  Precisamos apenas das informações essenciais.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="customer-name"
                  className="text-sm font-medium"
                >
                  Nome
                </label>

                <input
                  id="customer-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Seu nome"
                  autoComplete="name"
                  className="mt-2 block h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="customer-phone"
                  className="text-sm font-medium"
                >
                  WhatsApp
                </label>

                <input
                  id="customer-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="(88) 99999-9999"
                  autoComplete="tel"
                  className="mt-2 block h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="customer-notes"
                  className="text-sm font-medium"
                >
                  Observação{" "}
                  <span className="font-normal text-muted-foreground">
                    (opcional)
                  </span>
                </label>

                <textarea
                  id="customer-notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Alguma preferência ou observação?"
                  rows={4}
                  className="mt-2 block w-full resize-none rounded-md border border-input bg-background px-3 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold">Resumo</h2>

            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground">Serviços</p>

                <p className="mt-1 font-medium">
                  {selectedServices.length > 0
                    ? selectedServices.map((service) => service.name).join(" • ")
                    : "Nenhum serviço"}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Profissional</p>

                <p className="mt-1 font-medium">
                  {selectedBarber?.name ?? "Não selecionado"}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Data</p>

                <p className="mt-1 font-medium">
                  {selectedDate
                    ? selectedDate.split("-").reverse().join("/")
                    : "Não selecionada"}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Horário</p>

                <p className="mt-1 font-medium">
                  {selectedTime ?? "Não selecionado"}
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <a
            href={`/agendar/data?servicos=${selectedServiceIds.join(",")}&barbeiro=${selectedBarberId ?? ""}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft />
            Voltar
          </a>

          <Button
            size="lg"
            disabled={!name.trim() || !phone.trim()}
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

export default function CustomerDataPage() {
  return (
    <Suspense>
      <CustomerDataContent />
    </Suspense>
  )
}