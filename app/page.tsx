const services = [
  {
    number: "01",
    name: "Corte",
    description: "Precisão nos detalhes e estilo que combina com você.",
    price: "R$ 35",
    duration: "40 min",
  },
  {
    number: "02",
    name: "Barba",
    description: "Cuidado, alinhamento e acabamento impecável.",
    price: "R$ 25",
    duration: "30 min",
  },
  {
    number: "03",
    name: "Corte + Barba",
    description: "A experiência completa para renovar seu visual.",
    price: "R$ 55",
    duration: "60 min",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <header className="border-b border-black/10 bg-[#FAFAF7]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="#" className="font-display text-3xl font-bold uppercase tracking-wide text-[#123F46]">
            BARBEARIA<span className="text-[#D7C3A5]">.</span>
          </a>

          <nav className="hidden items-center gap-9 text-sm font-medium text-[#555B58] md:flex">
            <a href="#servicos" className="transition hover:text-[#123F46]">Serviços</a>
            <a href="#experiencia" className="transition hover:text-[#123F46]">A experiência</a>
            <a href="#contato" className="transition hover:text-[#123F46]">Contato</a>
          </nav>

          <a
            href="#agendar"
            className="bg-[#123F46] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1C5961]"
          >
            Agendar horário <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <section className="relative bg-[#123F46] text-[#FAFAF7]">
        <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-24">
          <div className="relative z-10">
            <p className="mb-7 text-xs font-semibold uppercase tracking-[0.28em] text-[#D7C3A5]">
              Mais que um corte. Uma experiência.
            </p>

            <h1 className="max-w-3xl font-display text-7xl font-semibold uppercase leading-[0.88] tracking-tight sm:text-8xl lg:text-[112px]">
              Seu corte.
              <br />
              Seu horário.
              <br />
              <span className="text-[#D7C3A5]">Sem complicação.</span>
            </h1>

            <p className="mt-8 max-w-md text-base leading-7 text-white/70">
              Seu estilo merece atenção aos detalhes. Escolha seu serviço,
              encontre o melhor horário e deixe o resto com a gente.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#agendar"
                className="bg-[#D7C3A5] px-7 py-4 text-sm font-bold text-[#161A19] transition hover:bg-[#FAFAF7]"
              >
                Agendar horário <span aria-hidden="true">↗</span>
              </a>
              <a
                href="#servicos"
                className="text-sm font-semibold text-white transition hover:text-[#D7C3A5]"
              >
                Conhecer serviços <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="relative mx-auto flex aspect-[4/5] w-full max-w-md items-end overflow-hidden bg-[#1C5961] p-8">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border border-[#FAFAF7]" />
              <div className="absolute -right-8 -top-8 h-56 w-56 rounded-full border border-[#FAFAF7]" />
              <div className="absolute bottom-0 left-0 h-2/3 w-full bg-gradient-to-t from-[#123F46] to-transparent" />
            </div>

            <div className="relative z-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#D7C3A5]">
                Estilo em cada detalhe
              </p>
              <p className="font-display text-5xl font-semibold uppercase leading-none sm:text-6xl">
                Sua melhor
                <br />
                versão começa
                <br />
                aqui.
              </p>
              <div className="mt-7 h-px w-16 bg-[#D7C3A5]" />
            </div>
            <span className="absolute right-7 top-7 font-display text-sm uppercase tracking-[0.2em] text-white/60">
              Desde sempre, por você.
            </span>
          </div>
        </div>
      </section>

      <section id="servicos" className="bg-[#F1F0EC] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#1C5961]">
                O que fazemos
              </p>
              <h2 className="font-display text-6xl font-semibold uppercase leading-none text-[#161A19] sm:text-7xl">
                Escolha seu estilo.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#666B67]">
              Serviços pensados para valorizar seu visual, com cuidado em cada
              etapa e atenção ao que realmente importa.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.number}
                className="group border border-black/10 bg-[#FAFAF7] p-7 transition hover:border-[#123F46] sm:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl text-[#1C5961]">{service.number}</span>
                  <span className="text-xs text-[#858983]">{service.duration}</span>
                </div>
                <h3 className="mt-12 font-display text-4xl font-semibold uppercase text-[#161A19]">
                  {service.name}
                </h3>
                <p className="mt-3 min-h-12 text-sm leading-6 text-[#666B67]">
                  {service.description}
                </p>
                <div className="mt-8 flex items-end justify-between border-t border-black/10 pt-6">
                  <span className="font-display text-3xl font-semibold text-[#123F46]">
                    {service.price}
                  </span>
                  <a
                    href="#agendar"
                    className="text-sm font-semibold text-[#123F46] transition group-hover:text-[#1C5961]"
                  >
                    Escolher ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experiencia" className="bg-[#FAFAF7] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-[#D7C3A5] p-10">
            <div className="absolute h-64 w-64 rounded-full border border-[#123F46]/30" />
            <div className="absolute h-48 w-48 rounded-full border border-[#123F46]/30" />
            <span className="relative font-display text-7xl font-bold uppercase leading-none text-[#123F46] sm:text-8xl">
              Feito
              <br />
              com
              <br />
              cuidado.
            </span>
          </div>

          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#1C5961]">
              A experiência
            </p>
            <h2 className="font-display text-6xl font-semibold uppercase leading-[0.95] text-[#161A19] sm:text-7xl">
              Seu momento.
              <br />
              Seu estilo.
              <br />
              Nossa dedicação.
            </h2>
            <p className="mt-7 max-w-lg text-base leading-7 text-[#666B67]">
              Acreditamos que cuidar do visual também é cuidar de si. Por isso,
              cada atendimento é feito com atenção, técnica e respeito ao seu
              estilo.
            </p>
            <a
              href="#agendar"
              className="mt-9 inline-flex bg-[#123F46] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#1C5961]"
            >
              Venha conhecer <span className="ml-3">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section id="agendar" className="bg-[#123F46] px-6 py-24 text-center text-[#FAFAF7] lg:px-10">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#D7C3A5]">
          Seu próximo horário está esperando
        </p>
        <h2 className="mx-auto max-w-4xl font-display text-6xl font-semibold uppercase leading-[0.95] sm:text-8xl">
          Bora cuidar do visual?
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-white/70">
          Escolha seu serviço e encontre um horário que funcione para você.
        </p>
        <a
          href="#contato"
          className="mt-9 inline-flex bg-[#D7C3A5] px-8 py-4 text-sm font-bold text-[#161A19] transition hover:bg-[#FAFAF7]"
        >
          Quero agendar <span className="ml-3">↗</span>
        </a>
      </section>

      <footer id="contato" className="bg-[#161A19] px-6 py-10 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <a href="#" className="font-display text-3xl font-bold uppercase tracking-wide">
            BARBEARIA<span className="text-[#D7C3A5]">.</span>
          </a>
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Barbearia. Todos os direitos reservados.
          </p>
          <a href="#agendar" className="text-sm text-[#D7C3A5] transition hover:text-white">
            Agendar horário ↗
          </a>
        </div>
      </footer>
    </main>
  );
}
