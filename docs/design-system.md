# Design System

Base visual e princípios de interface da plataforma de agendamento e gestão da barbearia.

> Este documento registra decisões de design que devem orientar o desenvolvimento do produto.
> Ele não deve impedir decisões melhores quando surgirem novas necessidades reais da interface.

## Direção visual

A direção adotada para o produto é **Urbano Profundo**.

### Características

- Urbano
- Artesanal
- Acolhedor
- Profissional
- Autêntico

### Evitar

- Genérico
- Ostentoso
- Caricato
- Frio
- Artificial

A interface deve transmitir qualidade e personalidade sem parecer uma franquia genérica, um SaaS corporativo ou uma experiência de luxo inacessível.

A composição pode utilizar referências editoriais, materiais naturais e elementos urbanos, mantendo a interface funcional e objetiva.

---

## Princípios de interface

### Hierarquia antes da decoração

A interface deve priorizar:

1. Clareza da informação
2. Hierarquia visual
3. Facilidade de uso
4. Consistência
5. Identidade visual

Elementos decorativos não devem competir com informações importantes ou ações principais.

### Estrutura antes da ornamentação

Bordas, espaçamento, tipografia e contraste devem construir a interface antes do uso de sombras, efeitos ou elementos decorativos.

### Autenticidade

Fotografias futuras devem utilizar imagens reais da barbearia sempre que possível.

Enquanto as fotografias reais não estiverem disponíveis, utilizar placeholders honestos, como blocos de cor, textura ou indicações explícitas de conteúdo provisório.

---

## Cores

A paleta principal utiliza azul petróleo como cor de identidade.

### Referências visuais

- Azul petróleo: `#123F46`
- Azul petróleo claro: `#1C5961`
- Fundo claro: `#F1F0EC`
- Texto principal: `#161A19`
- Concreto: `#C8C8C2`
- Areia: `#D7C3A5`
- Branco: `#FAFAF7`

Os valores acima representam a direção visual. Na implementação, os componentes utilizam tokens semânticos CSS/OKLCH para permitir evolução controlada da paleta.

### Tokens semânticos

Os componentes devem preferir tokens como:

- `background`
- `foreground`
- `card`
- `primary`
- `secondary`
- `muted`
- `accent`
- `destructive`
- `border`
- `border-strong`
- `focus-ring`

Evitar utilizar cores diretamente nos componentes quando existir um token semântico apropriado.

---

## Tipografia

### Tipografia oficial

O sistema utiliza duas famílias tipográficas:

- **Archivo Narrow** — display, títulos, headings e elementos de destaque.
- **DM Sans** — corpo de texto, interface, botões, formulários e números.

A combinação foi escolhida após comparação visual entre quatro alternativas em um
laboratório tipográfico dedicado.

### Archivo Narrow

Utilizada para criar personalidade visual e presença nos títulos.

Aplicações:

- Hero headings
- Títulos de seção
- Nomes de serviços
- Destaques editoriais
- Elementos de grande hierarquia

### DM Sans

Utilizada como fonte funcional da interface.

Aplicações:

- Texto corrido
- Labels
- Botões
- Inputs
- Informações de serviço
- Valores monetários
- Horários
- Dados e números

### Implementação

As fontes são carregadas utilizando `next/font/google`.

Variáveis CSS:

```text
--font-archivo-narrow
--font-dm-sans

### Barlow Condensed

Utilizada principalmente para:

- Títulos
- Headings
- Destaques
- Números de grande destaque
- Elementos editoriais

### Inter

Utilizada principalmente para:

- Texto corrido
- Formulários
- Botões
- Navegação
- Informações auxiliares
- Conteúdo de interface

A tipografia será revisada posteriormente em uma etapa específica de comparação entre combinações tipográficas.

---

## Raios

A interface utiliza uma escala curta de raios.

| Token | Valor | Uso |
| --- | ---: | --- |
| `sm` | 2px | Elementos pequenos |
| `md` | 4px | Componentes comuns |
| `lg` | 6px | Cards e superfícies |
| `xl` | 8px | Exceções controladas |

O raio padrão do sistema é:

```text
6px