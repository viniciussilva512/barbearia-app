import { Button, buttonVariants } from "@/components/ui/button";
import { services } from "@/src/domain/services/services";
import { ArrowRight, Clock3, Scissors } from "lucide-react";


export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Scissors className="size-4" />
            </div>

            <span className="font-semibold tracking-tight">
              Barbearia
            </span>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-muted-foreground sm:flex">
            <a
              href="#servicos"
              className="transition-colors hover:text-foreground"
            >
              ServiÃ§os
            </a>
            <a
              href="#sobre"
              className="transition-colors hover:text-foreground"
            >
              Sobre
            </a>
          </nav>

          <Button size="sm">Agendar</Button>
        </div>
      </header>

      <section className="border-b border-border/60">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:py-28">
          <div className="max-w-3xl space-y-7">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Barbearia urbana
            </span>

            <div className="space-y-5">
              <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Seu corte.
                <span className="block text-primary">Seu horÃ¡rio.</span>
                <span className="block">Sem complicaÃ§Ã£o.</span>
              </h1>

              <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                Qualidade acima da mÃ©dia, preÃ§o justo e um atendimento feito
                para vocÃª sair daqui se sentindo bem.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg">
                Agendar horÃ¡rio
                <ArrowRight />
              </Button>

              <a
  href="#servicos"
  className={buttonVariants({ variant: "outline", size: "lg" })}
>
  Ver serviÃ§os
</a>
            </div>
          </div>

          <div className="hidden min-h-80 rounded-2xl border border-border bg-muted/30 lg:block" />
        </div>
      </section>

      <section id="servicos" className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="mb-10 max-w-2xl space-y-3">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            ServiÃ§os
          </span>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Escolha o que combina com vocÃª.
          </h2>

          <p className="text-muted-foreground">
            ServiÃ§os essenciais, preÃ§os transparentes e horÃ¡rios definidos
            para vocÃª nÃ£o perder tempo.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.name}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold">{service.name}</h3>

                <span className="text-lg font-semibold text-primary">
                  R$ {(service.priceInCents / 100).toFixed(2).replace(".", ",")}
                </span>
              </div>

              <p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">
                {service.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="size-4" />
                {service.durationMinutes} min	
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="sobre"
        className="border-y border-border/60 bg-muted/30"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl space-y-5">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              A experiÃªncia
            </span>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Um ambiente clÃ¡ssico com uma experiÃªncia moderna.
            </h2>

            <p className="text-lg leading-8 text-muted-foreground">
              A ideia Ã© simples: oferecer um atendimento profissional, um
              ambiente masculino acolhedor e um serviÃ§o de qualidade sem
              transformar o corte em uma experiÃªncia complicada.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Pronto para marcar seu horÃ¡rio?
            </h2>

            <p className="text-muted-foreground">
              Escolha o serviÃ§o, o barbeiro e o melhor horÃ¡rio para vocÃª.
            </p>
          </div>

          <Button size="lg">
            Agendar horÃ¡rio
            <ArrowRight />
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>Barbearia</span>
          <span>Qualidade, estilo e praticidade.</span>
        </div>
      </footer>
    </main>
  );
}
