# 🚀 Pluga Ferramentas Integradas

![Next.js](https://img.shields.io/badge/Next.js-15-blue?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![Jest](https://img.shields.io/badge/Tested%20with-Jest-red?logo=jest)

**Pluga Ferramentas Integradas** é uma aplicação web moderna construída com **Next.js 15** e **React 19**, que oferece uma interface ágil e intuitiva para explorar as integrações da Pluga. A arquitetura modular, aliada a **TypeScript** e testes automatizados, promove alta performance, escalabilidade e facilidade de manutenção.

---

## 🌍 Deploy

🔗 [Acesse a aplicação online](https://pluga-challenge-front-kappa.vercel.app)

## 📑 Sumário

1. [🔧 Pré-requisitos](#-pré-requisitos)
2. [🚀 Como Utilizar o Projeto](#-como-utilizar-o-projeto)
3. [🧪 Testes Automatizados](#-testes-automatizados)
4. [💻 Tecnologias Utilizadas](#-tecnologias-utilizadas)
5. [📁 Estrutura de Pastas](#-estrutura-de-pastas)

---

## 🔧 Pré-requisitos

- 🟢 **Node.js** v20.x ou superior
- 📦 **pnpm** (gerenciador de pacotes)
- 💻 **VSCode** recomendado

> ⚠️ Este projeto **utiliza exclusivamente pnpm** para instalação de dependências, garantindo melhor desempenho e isolamento.

---

## 🚀 Como Utilizar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/mariana-reis/pluga-challenge-front.git
```

### 2. Acesse o diretório

```bash
cd pluga-challenge-front
```

### 3. Instale as dependências

```bash
pnpm install
```

### 4. Inicie o ambiente de desenvolvimento

```bash
pnpm dev
```

> Acesse em: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testes Automatizados

O projeto utiliza **Jest** e **React Testing Library** para testes unitários e de integração, garantindo confiabilidade e estabilidade no código.

### Rodar os testes

```bash
pnpm test
```

---

## 💻 Tecnologias Utilizadas

| 💼 Categoria             | 🚀 Ferramenta                | 📋 Descrição                                                                       |
| ------------------------ | ---------------------------- | ---------------------------------------------------------------------------------- |
| ⚙️ Framework             | Next.js 15                   | Framework React com suporte a SSR, App Router e otimizações avançadas              |
| 💡 Biblioteca UI         | React 19                     | Biblioteca JavaScript para construção de interfaces reativas com hooks             |
| 🔐 Tipagem               | TypeScript                   | Superset do JS que adiciona tipagem estática e maior segurança na manutenção       |
| 🎨 Estilização           | Tailwind CSS + DaisyUI       | Estilização utilitária com componentes prontos e responsivos                       |
| 🧪 Testes                | Jest + React Testing Library | Framework de testes e biblioteca de render para validar componentes e lógica de UI |
| 🧹 Qualidade de Código   | ESLint + Prettier            | Linter e formatador para manter padrões e organização do código                    |
| 🔄 Commits               | Husky + Commitlint           | Valida e automatiza processos no Git usando `@commitlint/config-conventional`      |
| 📦 Gerenciador de Pacote | pnpm                         | Gerenciador de pacotes leve e performático, com caching otimizado                  |

---

## 📁 Estrutura de Pastas

A estrutura do projeto é baseada em **modularização por funcionalidade (feature-based)**, facilitando a escalabilidade, organização e independência de cada módulo.

### 🌐 Diretório Raiz

| Caminho             | 📋 Descrição                                                  |
| ------------------- | ------------------------------------------------------------- |
| `.github/`          | ⚙️ Configurações de CI/CD (GitHub Actions)                    |
| `.husky/`           | 🐶 Hooks Git para automações como validação de commit         |
| `.vscode/`          | 🧩 Configurações recomendadas do VSCode                       |
| `.next/`            | 🏗️ Build gerada automaticamente pelo Next.js                  |
| `coverage/`         | 🧪 Relatórios de cobertura de testes                          |
| `README.md`         | 📖 Documentação principal do projeto                          |
| `package.json` etc. | ⚙️ Configurações gerais (dependências, TS, Jest, ESLint etc.) |

---

### 🧩 `src/` - Núcleo da Aplicação

| Pasta       | 📋 Descrição                                                             |
| ----------- | ------------------------------------------------------------------------ |
| `app/`      | 🌐 Rotas da aplicação (via App Router), layout global e página principal |
| `features/` | 🔍 Módulos separados por domínio (ex: `tools`, `auth`, `users`)          |
| `shared/`   | 🧬 Componentes globais reutilizáveis (layout, UI genérica etc.)          |
| `styles/`   | 🎨 Estilos globais                                                       |

---

### 🧱 Exemplo: `features/tools/`

| Subpasta                | 📋 Responsabilidade                                                    |
| ----------------------- | ---------------------------------------------------------------------- |
| `components/`           | 🔧 Componentes específicos do domínio (ex: `ToolCard`, `SearchInput`)  |
| `components/__tests__/` | 🧪 Testes unitários de componentes                                     |
| `context/`              | 🧠 Context API e providers da funcionalidade                           |
| `hooks/`                | 🪝 Hooks específicos da feature                                        |
| `services/`             | 🌐 Integração com APIs externas                                        |
| `types/`                | 📄 Tipagens relacionadas à funcionalidade                              |
| `utils/`                | 🛠️ Funções utilitárias locais (ex: `pagination.ts`, `localStorage.ts`) |

---

### ✅ Benefícios dessa Arquitetura

- 📦 **Modularidade total**: cada domínio isolado e autônomo
- 🔍 **Facilidade de navegação**: previsível e organizada
- 🧼 **Alta coesão e baixo acoplamento**
- 🚀 **Escalabilidade real**: adição de novas features sem quebrar a base existente
