"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const combinations = [
  {
    id: "A",
    name: "Atual",
    display: "Barlow Condensed",
    body: "Inter",
    displayVariable: "--font-lab-a-display",
    bodyVariable: "--font-lab-a-body",
  },
  {
    id: "B",
    name: "Contemporânea",
    display: "Oswald",
    body: "Manrope",
    displayVariable: "--font-lab-b-display",
    bodyVariable: "--font-lab-b-body",
  },
  {
    id: "C",
    name: "Editorial",
    display: "Archivo Narrow",
    body: "DM Sans",
    displayVariable: "--font-lab-c-display",
    bodyVariable: "--font-lab-c-body",
  },
  {
    id: "D",
    name: "Impacto",
    display: "Bebas Neue",
    body: "Source Sans 3",
    displayVariable: "--font-lab-d-display",
    bodyVariable: "--font-lab-d-body",
  },
] as const;

export function TypographyLab() {
  const [dark, setDark] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <div className="mx-auto max-w-7xl space-y-10 px-6 py-10 lg:px-8">
        <header className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
              D3.4b · Tipografia
            </p>

            <h1 className="font-heading text-5xl font-semibold uppercase tracking-tight">
              Laboratório tipográfico
            </h1>

            <p className="text-muted-foreground">
              As quatro combinações usam exatamente o mesmo conteúdo para
              facilitar uma comparação visual justa.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const nextDark =
                !document.documentElement.classList.contains("dark");

              document.documentElement.classList.toggle("dark", nextDark);
              setDark(nextDark);
            }}
          >
            {dark ? "Tema claro" : "Tema escuro"}
          </Button>
        </header>

        <section className="space-y-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
              Comparação
            </p>

            <h2 className="mt-2 font-heading text-3xl font-semibold uppercase">
              Mesmo conteúdo, quatro combinações
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {combinations.map((combination) => (
              <article
                key={combination.id}
                className="border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Combinação {combination.id}
                    </p>

                    <h3
                      className="mt-2 text-4xl font-semibold uppercase leading-none"
                      style={{
                        fontFamily: `var(${combination.displayVariable})`,
                      }}
                    >
                      {combination.name}
                    </h3>
                  </div>

                  <p className="text-right text-sm text-muted-foreground">
                    {combination.display}
                    <br />
                    {combination.body}
                  </p>
                </div>

                <div className="space-y-8 pt-6">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Hero
                    </p>

                    <h4
                      className="mt-3 text-5xl font-semibold uppercase leading-[0.9] sm:text-6xl"
                      style={{
                        fontFamily: `var(${combination.displayVariable})`,
                      }}
                    >
                      Seu corte.
                      <br />
                      Seu horário.
                    </h4>

                    <p
                      className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
                      style={{
                        fontFamily: `var(${combination.bodyVariable})`,
                      }}
                    >
                      Agende seu horário de forma rápida, escolha o serviço, o
                      barbeiro e o melhor momento para você.
                    </p>
                  </div>

                  <Separator />

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        Serviço
                      </p>

                      <p
                        className="mt-2 text-3xl font-semibold uppercase"
                        style={{
                          fontFamily: `var(${combination.displayVariable})`,
                        }}
                      >
                        Corte + Barba
                      </p>

                      <p
                        className="mt-1 text-sm text-muted-foreground"
                        style={{
                          fontFamily: `var(${combination.bodyVariable})`,
                        }}
                      >
                        70 min
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        Preço
                      </p>

                      <p
                        className="mt-2 text-4xl font-semibold tabular-nums"
                        style={{
                          fontFamily: `var(${combination.bodyVariable})`,
                        }}
                      >
                        R$ 55,00
                      </p>

                      <p
                        className="mt-1 text-sm text-muted-foreground"
                        style={{
                          fontFamily: `var(${combination.bodyVariable})`,
                        }}
                      >
                        Pagamento no local
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Interface
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        className="min-h-11 bg-primary px-5 text-sm font-semibold text-primary-foreground"
                        style={{
                          fontFamily: `var(${combination.bodyVariable})`,
                        }}
                      >
                        Agendar horário
                      </button>

                      <span
                        className="border border-border px-3 py-2 text-sm"
                        style={{
                          fontFamily: `var(${combination.bodyVariable})`,
                        }}
                      >
                        Confirmado
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Português + números
                    </p>

                    <p
                      className="mt-3 text-lg leading-7"
                      style={{
                        fontFamily: `var(${combination.bodyVariable})`,
                      }}
                    >
                      João, você pode agendar às 09:30. Ação rápida, preço justo
                      e atendimento próximo.
                    </p>

                    <p
                      className="mt-3 text-2xl font-semibold tabular-nums"
                      style={{
                        fontFamily: `var(${combination.bodyVariable})`,
                      }}
                    >
                      09:30 · 40 min · R$ 35,00 · 0123456789
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="border-t border-border pt-6 text-sm text-muted-foreground">
          A comparação considera personalidade, leitura, hierarquia, números,
          acentuação, interface e comportamento em diferentes tamanhos de tela.
        </footer>
      </div>
    </div>
  );
}
