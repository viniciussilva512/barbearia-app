"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function DesignSystemPage() {
  const [dark, setDark] = useState(false);

  function toggleTheme() {
    const nextDark = !dark;

    setDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl space-y-12 px-6 py-12 lg:px-8">
        <header className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Badge>Design System</Badge>

            <div className="space-y-2">
              <h1 className="font-heading text-5xl font-semibold uppercase tracking-tight">
                Urbano Profundo
              </h1>

              <p className="max-w-2xl text-muted-foreground">
                Laboratório visual temporário para validar raios, bordas,
                foco, sombras e componentes fundamentais.
              </p>
            </div>
          </div>

          <Button type="button" variant="outline" onClick={toggleTheme}>
            {dark ? "Tema claro" : "Tema escuro"}
          </Button>
        </header>

        <section className="space-y-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
              Raios
            </p>

            <h2 className="mt-2 font-heading text-3xl font-semibold uppercase">
              Escala aprovada
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["sm", "2px", "rounded-sm"],
              ["md", "4px", "rounded-md"],
              ["lg", "6px", "rounded-lg"],
              ["xl", "8px", "exceção"],
            ].map(([name, value, utility]) => (
              <div key={name} className="border border-border bg-card p-5">
                <div
                  className={`mb-4 h-20 bg-primary ${
                    utility === "exceção" ? "rounded-xl" : utility
                  }`}
                />

                <p className="font-heading text-xl font-semibold uppercase">
                  {name}
                </p>

                <p className="text-sm text-muted-foreground">
                  {value} · {utility}
                </p>

                {name === "xl" && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Uso excepcional. Remover se não houver necessidade real.
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
              Componentes
            </p>

            <h2 className="mt-2 font-heading text-3xl font-semibold uppercase">
              Estrutura antes da decoração
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Botão</CardTitle>

                <CardDescription>
                  Ação principal sem formato de pill.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-wrap gap-3">
                <Button className="h-11">Agendar horário</Button>

                <Button className="h-11" variant="outline">
                  Ver serviços
                </Button>

                <Button className="h-11" variant="secondary">
                  Editar
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Input</CardTitle>

                <CardDescription>
                  Campo com borda estrutural e foco evidente.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <Label htmlFor="design-name">Nome</Label>

                <Input id="design-name" placeholder="Digite seu nome" />

                <p className="text-xs text-muted-foreground">
                  Clique no campo ou navegue até ele com Tab para testar o
                  foco.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card</CardTitle>

                <CardDescription>
                  A estrutura usa borda. Sem sombra decorativa.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="rounded-md border border-border bg-background p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-heading text-2xl font-semibold uppercase">
                        Corte
                      </p>

                      <p className="text-sm text-muted-foreground">40 min</p>
                    </div>

                    <p className="font-medium">R$ 35</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badge</CardTitle>

                <CardDescription>
                  Radius-sm. Nunca pill.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-wrap gap-3">
                <Badge>Confirmado</Badge>

                <Badge variant="secondary">Pendente</Badge>

                <Badge variant="outline">Cancelado</Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        <section className="space-y-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
              Elevação
            </p>

            <h2 className="mt-2 font-heading text-3xl font-semibold uppercase">
              Sombras controladas
            </h2>

            <p className="mt-2 max-w-2xl text-muted-foreground">
              Sombras são reservadas para elementos que realmente flutuam
              sobre a interface.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-md border border-border bg-card p-6 shadow-sm">
              <p className="font-heading text-2xl font-semibold uppercase">
                Shadow SM
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Para elevação discreta.
              </p>
            </div>

            <div className="rounded-md border border-border bg-card p-6 shadow-md">
              <p className="font-heading text-2xl font-semibold uppercase">
                Shadow MD
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Para elementos flutuantes mais destacados.
              </p>
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
              Floating UI
            </p>

            <h2 className="mt-2 font-heading text-3xl font-semibold uppercase">
              Dialog
            </h2>
          </div>

          <Dialog>
            <DialogTrigger>Abrir dialog</DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar agendamento</DialogTitle>

                <DialogDescription>
                  Este é um exemplo de elemento flutuante usando borda, radius
                  e sombra de elevação.
                </DialogDescription>
              </DialogHeader>

              <div className="flex justify-end gap-3 pt-4">
                <Button className="h-11" variant="outline">
                  Cancelar
                </Button>

                <Button className="h-11">Confirmar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </section>

        <footer className="border-t border-border pt-6 text-sm text-muted-foreground">
          D3.4 · Fundação visual · Página temporária de validação
        </footer>
      </div>
    </main>
  );
}