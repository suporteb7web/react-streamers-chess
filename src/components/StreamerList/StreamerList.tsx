import type { Streamer } from '../../types/streamer'
import { StreamerCard } from '../StreamerCard/StreamerCard'
import './StreamerList.css'

type StreamerListProps = {
  streamers: Streamer[]
}

export function StreamerList({ streamers }: StreamerListProps) {
  return (
    <ul className="streamer-list">
      {streamers.map((streamer) => (
        <li key={streamer.username} className="streamer-list__item">
          <StreamerCard streamer={streamer} />
        </li>
      ))}
    </ul>
  )
}
