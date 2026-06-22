# Chess.com Streamers

Aplicação web que consome a [API pública de streamers do Chess.com](https://api.chess.com/pub/streamers) e exibe uma lista de streamers com avatar, nome, link para o Twitch e indicador visual de transmissão ao vivo.

## Funcionalidades

- Listagem de todos os streamers retornados pela API em cards
- Indicador de live (bolinha vermelha) ao lado do nome quando o streamer está transmitindo
- Estados de feedback: loading durante o carregamento e empty state em caso de erro ou lista vazia
- Links para o Twitch que abrem em nova aba
- Tema visual verde-claro com cards arredondados e sombra sutil

## Stack

- [Vite](https://vite.dev/)
- [React 19](https://react.dev/)
- TypeScript
- CSS por componente (sem bibliotecas de UI)

## Pré-requisitos

- Node.js 18+
- npm

## Como executar

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

Após `npm run dev`, abra a URL exibida no terminal (geralmente `http://localhost:5173`). A API é consultada automaticamente ao carregar a página.

## Estrutura do projeto

```
src/
├── types/
│   └── streamer.ts          # Tipos da resposta da API
├── components/
│   ├── StreamerList/        # Grid/lista de cards
│   ├── StreamerCard/        # Card individual (avatar, nome, live, Twitch)
│   ├── Loading/             # Feedback de carregamento
│   └── EmptyState/          # Mensagens de erro ou lista vazia
├── App.tsx                  # Fetch da API e renderização condicional
├── App.css                  # Layout da página e tema global
├── main.tsx
└── index.css                # Reset/base global
```

## Arquitetura

| Componente    | Responsabilidade |
|---------------|------------------|
| `App`         | Fetch da API via `useEffect`; estados `loading`, `error` e `streamers`; renderização condicional |
| `StreamerList`| Recebe `Streamer[]` e renderiza a lista de `StreamerCard` |
| `StreamerCard`| Exibe avatar, username, link Twitch e indicador live |
| `Loading`     | Feedback visual enquanto os dados carregam |
| `EmptyState`  | Mensagem quando não há streamers ou ocorreu erro |

### Fluxo de estados

```
Montagem do App → loading
       ↓
   fetch API ──┬── sucesso + dados → StreamerList
               ├── sucesso + vazio → EmptyState (vazio)
               └── erro            → EmptyState (erro)
```

## API

**Endpoint:** `GET https://api.chess.com/pub/streamers`

Sem autenticação. A resposta contém um array `streamers` com objetos que incluem `username`, `avatar`, `twitch_url`, `url` e `is_live`.

Documentação da API: [Chess.com Streamers API](https://api.chess.com/pub/streamers)

## Fora de escopo (v1)

- Filtros, busca ou ordenação
- Paginação
- Autenticação
- Refresh automático / polling
- Bibliotecas de UI (Material, Tailwind, etc.)
- State management externo (Redux, Zustand, etc.)

## Referências

- PRD do projeto: [.docs/prd.md](.docs/prd.md)
- Brain dump original: [.docs/brain-dump.md](.docs/brain-dump.md)
