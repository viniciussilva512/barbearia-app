import { Archivo_Narrow, DM_Sans } from "next/font/google";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const archivoNarrow = Archivo_Narrow({
  variable: "--font-ui-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-ui-body",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = {
  fontFamily: "var(--font-ui-display)",
};

const bodyFont = {
  fontFamily: "var(--font-ui-body)",
};

export default function TypographyUiPage() {
  return (
    <main
      className={`${archivoNarrow.variable} ${dmSans.variable} min-h-screen bg-background text-foreground`}
    >
      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
        <header className="mb-10 border-b border-border pb-8">
          <p
            className="text-sm font-medium uppercase tracking-[0.16em] text-primary"
            style={bodyFont}
          >
            D3.4b · UI real
          </p>

          <h1
            className="mt-3 text-5xl font-semibold uppercase leading-none sm:text-6xl"
            style={displayFont}
          >
            Agende seu horário
          </h1>

          <p
            className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
            style={bodyFont}
          >
            Escolha o serviço, o barbeiro, a data e o melhor horário para seu
            atendimento.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <section className="space-y-8">
            <Card>
              <CardHeader>
                <p
                  className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
                  style={bodyFont}
                >
                  Serviço
                </p>

                <CardTitle
                  className="text-4xl font-semibold uppercase"
                  style={displayFont}
                >
                  Corte + Barba
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p
                      className="text-base text-muted-foreground"
                      style={bodyFont}
                    >
                      Corte masculino completo + barba
                    </p>

                    <p
                      className="mt-2 text-sm text-muted-foreground"
                      style={bodyFont}
                    >
                      70 min
                    </p>
                  </div>

                  <p
                    className="text-4xl font-semibold tabular-nums"
                    style={bodyFont}
                  >
                    R$ 55,00
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <p
                  className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
                  style={bodyFont}
                >
                  Barbeiro
                </p>

                <CardTitle
                  className="text-3xl font-semibold uppercase"
                  style={displayFont}
                >
                  Escolha seu barbeiro
                </CardTitle>
              </CardHeader>

              <CardContent className="grid gap-3 sm:grid-cols-3">
                {["Lucas", "Rafael", "André"].map((barber) => (
                  <button
                    key={barber}
                    type="button"
                    className="min-h-11 border border-border px-4 py-3 text-left transition-colors hover:bg-muted"
                    style={bodyFont}
                  >
                    <span className="block font-medium">{barber}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      Disponível
                    </span>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <p
                  className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
                  style={bodyFont}
                >
                  Horário
                </p>

                <CardTitle
                  className="text-3xl font-semibold uppercase"
                  style={displayFont}
                >
                  Quinta-feira, 08 de outubro
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {["09:00", "10:30", "14:00", "16:30"].map((time) => (
                    <button
                      key={time}
                      type="button"
                      className="min-h-11 border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                      style={bodyFont}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <aside>
            <Card className="lg:sticky lg:top-6">
              <CardHeader>
                <p
                  className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
                  style={bodyFont}
                >
                  Resumo
                </p>

                <CardTitle
                  className="text-3xl font-semibold uppercase"
                  style={displayFont}
                >
                  Seu agendamento
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3" style={bodyFont}>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Serviço</span>
                    <span className="font-medium">Corte + Barba</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Duração</span>
                    <span className="font-medium tabular-nums">70 min</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Horário</span>
                    <span className="font-medium tabular-nums">14:00</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-end justify-between gap-4">
                    <span
                      className="text-sm text-muted-foreground"
                      style={bodyFont}
                    >
                      Total
                    </span>

                    <span
                      className="text-4xl font-semibold tabular-nums"
                      style={bodyFont}
                    >
                      R$ 55,00
                    </span>
                  </div>

                  <Badge className="mt-4" style={bodyFont}>
                    Pagamento no local
                  </Badge>
                </div>

                <Button className="min-h-11 w-full" style={bodyFont}>
                  Confirmar agendamento
                </Button>

                <p
                  className="text-xs leading-5 text-muted-foreground"
                  style={bodyFont}
                >
                  Você poderá cancelar ou remarcar seu horário dentro das
                  regras de cancelamento da barbearia.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}