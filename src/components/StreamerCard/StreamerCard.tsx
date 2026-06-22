import type { Streamer } from '../../types/streamer'
import './StreamerCard.css'

type StreamerCardProps = {
  streamer: Streamer
}

export function StreamerCard({ streamer }: StreamerCardProps) {
  const { username, avatar, twitch_url, is_live } = streamer

  return (
    <article className="streamer-card">
      <img
        className="streamer-card__avatar"
        src={avatar}
        alt={`Avatar de ${username}`}
        width={56}
        height={56}
      />

      <div className="streamer-card__info">
        <div className="streamer-card__name-row">
          {is_live && (
            <span
              className="streamer-card__live-indicator"
              aria-label="Ao vivo"
            />
          )}
          <h2 className="streamer-card__username">{username}</h2>
        </div>

        <a
          className="streamer-card__twitch-link"
          href={twitch_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver no Twitch
        </a>
      </div>
    </article>
  )
}
