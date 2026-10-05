# Layout System

## Princípio

O layout da plataforma deve equilibrar respiro visual e densidade de
informação.

O produto não deve parecer excessivamente espaçado nem visualmente comprimido.

A hierarquia deve ser construída através de espaçamento, tipografia,
alinhamento e agrupamento de conteúdo.

## Containers

O sistema utiliza três larguras principais:

| Token | Tailwind | Largura | Uso |
|---|---|---:|---|
| Content | `max-w-6xl` | 72rem | Conteúdo principal |
| Wide | `max-w-7xl` | 80rem | Hero, grids e seções amplas |
| Reading | `max-w-3xl` | 48rem | Conteúdo textual |

### Container padrão

```tsx
<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
  ...
</div>