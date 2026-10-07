"use client"

import Link from "next/link"
import { CheckCircle2, Home } from "lucide-react"

export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6 py-12">
        <div className="w-full rounded-2xl border border-border bg-card p-8 text-center sm:p-10">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="size-9 text-primary" />
          </div>

          <div className="mt-6 space-y-3">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Tudo certo
            </span>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Agendamento confirmado!
            </h1>

            <p className="mx-auto max-w-lg text-muted-foreground">
              Seu horário foi reservado com sucesso. Em breve você receberá
              as informações do atendimento pelo WhatsApp.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-background p-5 text-left">
            <p className="font-medium">Próximos passos</p>

            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Guarde as informações do seu agendamento.</li>
              <li>• Chegue alguns minutos antes do horário.</li>
              <li>• Caso precise cancelar ou remarcar, entre em contato.</li>
            </ul>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Home className="size-4" />
              Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}