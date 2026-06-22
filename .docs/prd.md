# PRD — Listagem de Streamers do Chess.com

**Projeto:** `react-streamers-chess`  
**Versão:** 1.0  
**Público-alvo deste documento:** agente de IA responsável pela implementação  
**Stack:** Vite, React 19, TypeScript, CSS por componente

---

## 1. Visão geral

Aplicação web que consome a API pública do Chess.com e exibe uma lista de streamers com avatar, nome, link para o Twitch e indicador visual de transmissão ao vivo.

O repositório já contém o scaffold Vite + React + TypeScript. A implementação deve **substituir o conteúdo boilerplate** de `App.tsx` e `App.css` pelo fluxo descrito neste documento, mantendo a estrutura base do projeto (`main.tsx`, `index.css`, configs).

---

## 2. Objetivos

| Objetivo | Descrição |
|---|---|
| Listar streamers | Exibir todos os streamers retornados pela API em cards |
| Indicar live | Mostrar bolinha vermelha ao lado do nome quando `is_live === true` |
| Feedback de estado | Loading durante fetch, empty state em erro ou lista vazia |
| Organização | Componentes em `src/components/`, um arquivo CSS por componente |
| Visual | Tema verde-claro, cards com borda arredondada e sombra |

---

## 3. Fora de escopo (v1)

- Filtros, busca ou ordenação
- Paginação (a API retorna a lista completa)
- Autenticação ou chamadas autenticadas
- Testes automatizados (a menos que solicitado separadamente)
- Bibliotecas de UI (Material, Tailwind, etc.)
- State management externo (Redux, Zustand, etc.)
- Refresh automático / polling periódico
- Suporte a múltiplas plataformas além do Twitch na UI (usar `twitch_url` como link principal)

---

## 4. API

### Endpoint

```
GET https://api.chess.com/pub/streamers
```

Sem autenticação. Resposta JSON.

### Formato de resposta

```json
{
  "streamers": [
    {
      "username": "kebab_skewer",
      "avatar": "https://images.chesscomfiles.com/uploads/v1/user/103941792.fa35eb12.50x50o.7354eeb4edc3.jpg",
      "twitch_url": "https://twitch.tv/edable_derangements",
      "url": "https://www.chess.com/member/kebab_skewer",
      "is_live": true,
      "is_community_streamer": false,
      "platforms": [
        {
          "type": "twitch",
          "stream_url": "https://twitch.tv/edable_derangements",
          "channel_url": "https://twitch.tv/edable_derangements",
          "is_live": true,
          "is_main_live_platform": true
        }
      ]
    }
  ]
}
```

### Tipos TypeScript esperados

Criar em `src/types/streamer.ts`:

```typescript
export type StreamerPlatform = {
  type: string
  stream_url: string
  channel_url: string
  is_live: boolean
  is_main_live_platform: boolean
}

export type Streamer = {
  username: string
  avatar: string
  twitch_url: string
  url: string
  is_live: boolean
  is_community_streamer: boolean
  platforms: StreamerPlatform[]
}

export type StreamersResponse = {
  streamers: Streamer[]
}
```

### Regras de fetch

- Executar **uma vez** ao montar o componente principal, via `useEffect`
- Usar `fetch` nativo (sem axios ou similar)
- Tratar os seguintes cenários:
  - **Sucesso com dados:** renderizar lista
  - **Sucesso com array vazio:** empty state
  - **Erro de rede ou HTTP não-ok:** empty state com mensagem de erro
- Não expor detalhes técnicos do erro ao usuário (mensagem genérica é suficiente)

---

## 5. Arquitetura de componentes

### Estrutura de arquivos alvo

```
src/
├── types/
│   └── streamer.ts
├── components/
│   ├── StreamerList/
│   │   ├── StreamerList.tsx
│   │   └── StreamerList.css
│   ├── StreamerCard/
│   │   ├── StreamerCard.tsx
│   │   └── StreamerCard.css
│   ├── Loading/
│   │   ├── Loading.tsx
│   │   └── Loading.css
│   └── EmptyState/
│       ├── EmptyState.tsx
│       └── EmptyState.css
├── App.tsx          (orquestra fetch + renderização condicional)
├── App.css          (layout da página e tema global)
├── main.tsx         (sem alterações significativas)
└── index.css        (reset/base mínimo, se necessário)
```

Nomes de pastas e arquivos podem seguir PascalCase para componentes, conforme convenção acima.

### Responsabilidades

| Componente | Responsabilidade |
|---|---|
| `App` | Fetch da API via `useEffect`; estados `loading`, `error`, `streamers`; renderização condicional |
| `StreamerList` | Recebe array de `Streamer[]`; renderiza grid/lista de `StreamerCard` |
| `StreamerCard` | Exibe avatar, username, link Twitch, indicador live |
| `Loading` | Feedback visual enquanto carrega |
| `EmptyState` | Mensagem quando não há streamers ou ocorreu erro |

---

## 6. Especificação de UI

### Layout da página (`App`)

- Container centralizado com largura máxima razoável (~960px)
- Título da aplicação no topo (ex.: "Chess.com Streamers" ou equivalente)
- Fundo e tipografia alinhados ao tema verde-claro

### `StreamerList`

- Lista vertical ou grid responsivo de cards
- Espaçamento consistente entre cards

### `StreamerCard`

Cada card deve exibir:

| Elemento | Fonte de dados | Comportamento |
|---|---|---|
| Avatar | `avatar` | `<img>` com alt descritivo (ex.: avatar de `{username}`) |
| Nome | `username` | Texto visível |
| Indicador live | `is_live` | Bolinha vermelha **ao lado do nome** quando `true`; oculta ou ausente quando `false` |
| Link Twitch | `twitch_url` | Link clicável que abre em nova aba (`target="_blank"`, `rel="noopener noreferrer"`) |

Estilo do card:

- Borda arredondada (`border-radius`)
- Sombra sutil (`box-shadow`)
- Fundo claro contrastando com o tema verde da página

### Indicador live

- Círculo vermelho pequeno (~8–10px)
- Posicionado imediatamente à esquerda ou direita do username (preferência: à esquerda)
- Deve ser visualmente claro mesmo em telas pequenas
- Opcional: `aria-label="Ao vivo"` para acessibilidade

### `Loading`

- Texto ou spinner simples centralizado
- Ex.: "Carregando streamers..." ou indicador animado com CSS puro

### `EmptyState`

- Mensagem centralizada
- Dois contextos possíveis (prop `variant` ou mensagem passada por prop):
  - **Erro:** "Não foi possível carregar os streamers. Tente novamente mais tarde."
  - **Vazio:** "Nenhum streamer encontrado no momento."

---

## 7. Tema visual

### Paleta sugerida (referência para o agente)

| Token | Valor sugerido | Uso |
|---|---|---|
| `--color-bg` | `#e8f5e9` ou similar | Fundo da página |
| `--color-bg-card` | `#ffffff` | Fundo dos cards |
| `--color-primary` | `#2e7d32` ou similar | Títulos, links, acentos |
| `--color-live` | `#e53935` | Bolinha de live |
| `--color-text` | `#1b2e1b` | Texto principal |
| `--color-text-muted` | `#558b2f` | Texto secundário |

O agente pode ajustar tons dentro da família verde-claro, desde que mantenha coerência visual.

### Tipografia

- Fonte sans-serif do sistema ou definida em `index.css` / `App.css`
- Hierarquia clara: título > nome do streamer > links

---

## 8. Fluxo de estados

```
Montagem do App
      │
      ▼
  [loading = true]
      │
      ▼
  fetch API ──────────────────────┐
      │                           │
      ▼                           ▼
  resposta ok                 erro / !ok
      │                           │
      ├── streamers.length > 0      ▼
      │         │              [error = true]
      │         ▼                   │
      │   [StreamerList]            ▼
      │                        [EmptyState erro]
      │
      └── streamers.length === 0
                │
                ▼
         [EmptyState vazio]
```

Implementação em `App.tsx`:

```typescript
// Pseudocódigo — o agente deve implementar de forma completa
useEffect(() => {
  let cancelled = false

  async function loadStreamers() {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('https://api.chess.com/pub/streamers')
      if (!res.ok) throw new Error('Failed to fetch')
      const data: StreamersResponse = await res.json()
      if (!cancelled) setStreamers(data.streamers ?? [])
    } catch {
      if (!cancelled) setError(true)
    } finally {
      if (!cancelled) setLoading(false)
    }
  }

  loadStreamers()
  return () => { cancelled = true }
}, [])
```

> **Obrigatório:** cleanup no `useEffect` para evitar setState após unmount.

---

## 9. Requisitos técnicos

### Obrigatórios

- [ ] TypeScript estrito — tipar props, estado e resposta da API
- [ ] `useEffect` para fetch na montagem (não fetch no corpo do componente)
- [ ] Componentes funcionais com hooks
- [ ] Um arquivo `.css` importado por cada componente em `src/components/`
- [ ] Sem dependências adicionais além das já presentes no `package.json`
- [ ] Código passando em `npm run build` e `npm run lint`

### Boas práticas esperadas

- Props tipadas com `type` (`StreamerCardProps`, etc.)
- Keys estáveis em listas (`key={streamer.username}`)
- Imagens com `alt` significativo
- Links externos com `rel="noopener noreferrer"`
- CSS scoped por classe (sem CSS Modules obrigatório, mas sem conflitos globais desnecessários)

### Limpeza do boilerplate

- Remover imports e JSX do template Vite em `App.tsx` (counter, logos, hero, etc.)
- Remover ou substituir estilos não utilizados em `App.css`
- Não deletar arquivos de config (`vite.config.ts`, `tsconfig.*`, `eslint.config.js`)

---

## 10. Critérios de aceite

A implementação está completa quando **todos** os itens abaixo forem verdadeiros:

1. Ao abrir a aplicação (`npm run dev`), a API é consultada automaticamente
2. Durante o fetch, o componente `Loading` é exibido
3. Após sucesso, cada streamer aparece em um card com avatar, nome e link Twitch
4. Streamers com `is_live: true` exibem bolinha vermelha ao lado do nome
5. Streamers com `is_live: false` não exibem a bolinha (ou equivalente visual neutro)
6. Em caso de erro de rede/API, `EmptyState` com mensagem de erro é exibido
7. Se a API retornar lista vazia, `EmptyState` com mensagem de vazio é exibido
8. Componentes residem em `src/components/` com CSS dedicado
9. `npm run build` completa sem erros de TypeScript
10. `npm run lint` passa sem erros

---

## 11. Ordem de implementação sugerida

Para o agente de IA, seguir esta sequência minimiza retrabalho:

1. Criar `src/types/streamer.ts`
2. Criar `Loading` e `EmptyState` (estados extremos primeiro)
3. Criar `StreamerCard` + CSS
4. Criar `StreamerList` + CSS
5. Refatorar `App.tsx` com fetch, estados e composição
6. Aplicar tema verde-claro em `App.css` e ajustes em `index.css`
7. Remover boilerplate Vite não utilizado
8. Validar com `npm run build` e `npm run lint`

---

## 12. Referências

- Brain dump original: `.docs/brain-dump.md`
- API Chess.com Streamers: https://api.chess.com/pub/streamers
- Documentação React (useEffect): https://react.dev/reference/react/useEffect
