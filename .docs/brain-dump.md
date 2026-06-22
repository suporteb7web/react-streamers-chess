# Projeto: Listagem de streamers do Chess.com

O projeto vai listar os streamers do Chess baseado na api:
https://api.chess.com/pub/streamers

Este é o formato de retorno:
```
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
```

O projeto usa Vite, React e Typescript.

Ao iniciar, o projeto vai consultar a API e exibir os streamers em uma lista com:
- Nome
- Avatar
- Link do Twitch
- Bolinha vermelha ao lado do nome se tiver live

O processo de consulta deve usar useEffect para proteger o componente.

Enquanto carrega, deve ter um loading.

Se der erro ou não encontrar nenhum, empty state.

Utilizar a pasta src/components para armazenar e separar os componentes corretamente.

A estilização será feita através de arquivo CSS para cada componente.

### Aspectos visuais

Cada Streamer vai estar em um card com borda arredondada e sombra.

A tonalidade geral do projeto é verde-claro.