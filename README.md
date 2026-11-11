# 💈 Barbearia App

**Uma plataforma de gestão e agendamento desenvolvida para barbearias.**

O Barbearia App é um projeto SaaS que busca centralizar a operação de uma barbearia em uma única plataforma, conectando clientes, barbeiros e administradores por meio de uma experiência simples e organizada.

O objetivo é desenvolver uma solução que permita gerenciar desde os agendamentos até a operação administrativa do estabelecimento, com suporte a múltiplas barbearias.

> 🚧 **Em desenvolvimento** — Construção da arquitetura, estrutura do banco de dados e fundamentos da aplicação.

---

## 🛠️ Tecnologias

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

### Ferramentas complementares

- **Postgres.js** — conexão com o PostgreSQL.
- **Drizzle Kit** — geração e execução de migrations.
- **Lucide React** — biblioteca de ícones.
- **Base UI** — primitives para construção de componentes.
- **Git e GitHub** — versionamento e organização do desenvolvimento.

---

## 🎯 Visão do Produto

A plataforma está sendo projetada em torno de três áreas principais:

| Área              | Objetivo                                                     |
| ----------------- | ------------------------------------------------------------ |
| **Cliente**       | Consultar serviços e realizar agendamentos.                  |
| **Barbeiro**      | Acompanhar sua agenda e seus atendimentos.                   |
| **Administrador** | Gerenciar a operação e acompanhar o desempenho da barbearia. |

### Módulos planejados

- 📅 **Agendamentos** — criação, acompanhamento e gerenciamento de horários.
- ✂️ **Serviços** — cadastro, duração e preços dos serviços.
- 💈 **Barbeiros** — gerenciamento da equipe e agendas individuais.
- 🕒 **Horários** — configuração do funcionamento da barbearia.
- 👥 **Clientes** — cadastro e histórico de atendimentos.
- 💳 **Pagamentos** — gerenciamento e integração com meios de pagamento.
- 📊 **Relatórios** — indicadores e acompanhamento da operação.

---

## 🏗️ Considerações Técnicas

### 1. Arquitetura do Projeto

O desenvolvimento prioriza a separação de responsabilidades, buscando manter a interface desacoplada das regras de negócio e da persistência dos dados.

A organização da aplicação considera diferentes camadas:

- **Interface:** páginas, layouts e componentes.
- **Aplicação:** casos de uso e orquestração das operações.
- **Domínio:** regras e conceitos centrais do negócio.
- **Persistência:** repositórios, Drizzle ORM e PostgreSQL.

O objetivo é facilitar a manutenção e permitir que o sistema evolua sem concentrar responsabilidades em componentes e páginas.

### 2. Next.js e TypeScript

O Next.js utiliza o App Router para organização das rotas e construção da aplicação.

O TypeScript é utilizado em modo estrito, priorizando contratos explícitos, segurança de tipos e previsibilidade durante o desenvolvimento.

### 3. Design System

A interface utiliza Tailwind CSS 4, shadcn/ui e componentes baseados em Base UI.

A proposta é manter uma identidade visual consistente, com componentes reutilizáveis e estilos centralizados.

### 4. Banco de Dados

O PostgreSQL é utilizado como banco de dados relacional, com Drizzle ORM para definição dos schemas e gerenciamento da persistência.

A modelagem inicial contempla **10 tabelas**:

| Entidade               | Responsabilidade                          |
| ---------------------- | ----------------------------------------- |
| `barbershops`          | Estabelecimentos cadastrados.             |
| `users`                | Usuários da plataforma.                   |
| `barbershop_members`   | Vínculo entre usuários e barbearias.      |
| `barbers`              | Profissionais da barbearia.               |
| `services`             | Serviços oferecidos.                      |
| `business_hours`       | Horários de funcionamento.                |
| `barber_schedules`     | Disponibilidade individual dos barbeiros. |
| `customers`            | Clientes dos estabelecimentos.            |
| `appointments`         | Agendamentos realizados.                  |
| `appointment_services` | Serviços associados aos agendamentos.     |

A estrutura utiliza chaves estrangeiras, índices compostos e constraints para preservar a integridade dos dados e o isolamento entre estabelecimentos.

As migrations são versionadas no diretório `drizzle/`.

### 5. Multi-tenancy

A aplicação está sendo projetada para atender múltiplas barbearias em uma mesma infraestrutura.

A modelagem utiliza identificadores de barbearia nas entidades relacionadas ao estabelecimento, permitindo estabelecer relacionamentos e restrições dentro do contexto de cada barbearia.

O isolamento e a autorização efetivos serão implementados nas próximas etapas da aplicação.

### 6. Integrações Planejadas

O projeto também prevê integração com serviços externos para ampliar suas funcionalidades:

- **Better Auth:** autenticação e gerenciamento de sessões.
- **Google OAuth:** autenticação com conta Google.
- **Mercado Pago:** processamento de pagamentos.
- **Resend:** envio de e-mails.
- **WhatsApp / Meta:** comunicação e notificações.
- **Redis:** suporte a operações de cache e processamento.
- **Sentry:** monitoramento e rastreamento de erros.

Essas integrações estão previstas na configuração do projeto e ainda dependem de implementação.

---

## 📈 Desenvolvimento

O projeto segue um fluxo de desenvolvimento organizado, utilizando Git, GitHub, branches e commits pequenos.

**Padrão de commits:** Conventional Commits.

Exemplos:

```text
feat: adicionar funcionalidade
fix: corrigir comportamento
refactor: reorganizar estrutura
docs: atualizar documentação
chore: ajustes de configuração
```

### Estado atual

- [x] Estrutura inicial do projeto.
- [x] Configuração do PostgreSQL.
- [x] Estruturação dos schemas com Drizzle ORM.
- [x] Modelagem inicial das 10 tabelas.
- [x] Relacionamentos e constraints de integridade.
- [x] Geração e aplicação da migration inicial.
- [x] Validação dos schemas e migrations.

As próximas etapas serão desenvolvidas progressivamente, respeitando a arquitetura definida para o projeto.

---

---

**Barbearia App**
_Desenvolvido por Marcos Vinicius._ 💈