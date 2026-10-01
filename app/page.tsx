import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16 lg:px-8">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Barbearia
            </span>

            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Seu corte. Seu horário.
              <span className="block text-primary">Sem complicação.</span>
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Agende seu horário de forma rápida e escolha o serviço, barbeiro
              e melhor horário para você.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg">Agendar horário</Button>

            <Button size="lg" variant="outline">
              Conhecer serviços
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}