<div align="center">

# 🎬 Próximo Ep.

> *O seu assistente definitivo de séries e filmes — inspirado no TV Time, criado para descomplicar a sua maratona.*

[![Status do Projeto](https://img.shields.io/badge/status-concluído-brightgreen.svg)]()
[![React](https://img.shields.io/badge/React-18.x-blue.svg)]()
[![Vite](https://img.shields.io/badge/Vite-Fast-purple.svg)]()
[![Licença](https://img.shields.io/badge/license-MIT-green.svg)]()

[Funcionalidades](#-funcionalidades) • [Tecnologias](#-tecnologias) • [Arquitetura](#-arquitetura--documentação) • [Como Executar](#-como-executar-o-projeto) • [Equipe](#-integrantes)

</div>

---

## 💡 O Problema

Quem assiste a várias séries e filmes simultaneamente enfrenta um desafio comum: **perder o fio da meada**. Saber o que já assistiu, o que está rolando no momento e qual foi a última reação a um episódio acaba ficando espalhado na memória, em post-its ou em anotações soltas, sem nenhum panorama divertido sobre o próprio hábito de consumo.

## 🚀 A Solução

O **Próximo Ep.** resolve isso reunindo o melhor dos mundos em uma Single Page Application (SPA) leve e fluida:
* 🌐 **Descoberta em tempo real**: listagem de tendências semanais direto da API oficial do **TMDB**.
* 📋 **Organização inteligente**: controle pessoal de status (`Quero assistir`, `Assistindo`, `Assistido`) persistido localmente via `localStorage`.
* 😄 **Reações rápidas**: expresse sua opinião pós-maratona com emojis (estilo Reddit/TV Time), ativados inteligentemente assim que você conclui um título.
* 📊 **Estatísticas de consumo**: acompanhe tempo total investido e gêneros favoritos de forma totalmente automatizada.

---

## 👥 Integrantes

| Nome | RA |
| :--- | :--- |
| **Kaick Lima Silva** | `574060` |
| **Pedro Feltrin** | `569038` |
| **Guilherme Kozikoski** | `571611` |

*Trabalho acadêmico desenvolvido para a disciplina de Engenharia de Software (2º semestre).*

---

## ✨ Funcionalidades

| Ícone | Recurso | Descrição |
| :---: | :--- | :--- |
| 🔎 | **Explorar & Buscar** | Descubra títulos em alta na home ou filtre instantaneamente por nome via barra de pesquisa. |
| 🏷️ | **Gestão de Status** | Alterne facilmente entre *Quero assistir*, *Assistindo* e *Assistido* com feedback visual imediato. |
| 😄 | **Reações Pós-Episódio** | Sistema ágil de emojis para registrar seu sentimento (chocado, empolgado, triste, etc.) exclusivo para itens concluídos. |
| 📋 | **Minha Lista** | Painel organizado com abas de filtro por status e remoção rápida de itens. |
| 📊 | **Dashboard Estatístico** | Métricas consolidadas de horas assistidas e gráfico em barras dos seus gêneros favoritos. |

---

## 🛠️ Tecnologias & Ferramentas

* **[React](https://react.dev/)** (Componentes funcionais, Hooks `useState` e `useEffect`).
* **[React Router](https://reactrouter.com/)** — Gerenciamento de rotas dinâmicas e layouts com aninhamento (`Outlet`).
* **[Vite](https://vitejs.dev/)** — Empacotador e ambiente de desenvolvimento ultrarrápido.
* **[lucide-react](https://lucide.dev/)** — Ícones modernos e limpos.
* **CSS Puro** — Design tokens customizados em `src/index.css` focados em uma experiência visual imersiva e escura (estilo *Letterboxd*).
* **[TMDB API](https://developer.themoviedb.org/)** — Fonte de dados cinematográficos e seriados.

---

## 📁 Arquitetura & Documentação

Toda a engenharia por trás do projeto está detalhadamente documentada na pasta [`docs/`](docs/):

* 📐 **[Arquitetura do Sistema (`docs/architecture.md`)](docs/architecture.md)**: Organização de componentes, serviços, fluxo de dados e rotas.
* 📝 **[Requisitos do Produto (`docs/requirements.md`)](docs/requirements.md)**: User Stories, critérios de aceitação e regras de negócio.
* 🎨 **[Referências Visuais (`docs/references/references.md`)](docs/references/references.md)**: Justificativas de design inspiradas no Notion, Reddit, Letterboxd, Trakt.tv e Google Calendário.

---

## ⚙️ Como Executar o Projeto

Siga os passos abaixo para rodar o ambiente de desenvolvimento na sua máquina:

### 📋 Pré-requisitos
* Ter o **[Node.js](https://nodejs.org/)** (versão 18 ou superior) instalado.
* Uma chave de API gratuita do **TMDB** (gere em [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)).

### 🚀 Passo a Passo

1. **Clone o repositório e acesse a pasta:**
   ```bash
   git clone <url-do-repositorio>
   cd proximo-tv-time
   ```

2. **Instale as dependências do projeto:**
   ```bash
   npm install
   ```

3. **Instale os pacotes de ícones complementares:**
   ```bash
   npm i react-icons
   ```

4. **Configure as variáveis de ambiente:**
   Copie o template de ambiente e insira sua chave do TMDB:
   ```bash
   cp template.env .env
   ```
   Abra o arquivo `.env` gerado e preencha:
   ```env
   VITE_TMDB_API_KEY=sua_chave_da_api_aqui
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

6. Acesse o endereço indicado no seu terminal (geralmente `http://localhost:5173`) e boa maratona! 🎉

---

## 🏗️ Build de Produção

Para gerar os arquivos otimizados de build e testar localmente:
```bash
npm run build
npm run preview
```

---

## 🤖 Uso de IA

Este projeto contou com o apoio de **Inteligência Artificial** como assistente de programação, sendo utilizada para:
* Estruturação e refinamento da documentação técnica (`requirements.md`, `architecture.md`, `references.md`).
* Geração base de componentes e serviços seguindo os padrões exigidos em aula.
* Revisão de consistência entre código e documentação.

*Todo o código gerado foi rigorosamente testado e ajustado pelo grupo. Esse repositorio é o secundario feito para a entrega*.

---

<div align="center">
Feito pelo grupo Próximo Ep.
</div>
