import { useEffect, useState } from 'react'
import { EmptyState } from './components/EmptyState/EmptyState'
import { Loading } from './components/Loading/Loading'
import { StreamerList } from './components/StreamerList/StreamerList'
import type { Streamer, StreamersResponse } from './types/streamer'
import './App.css'

const STREAMERS_API_URL = 'https://api.chess.com/pub/streamers'

function App() {
  const [streamers, setStreamers] = useState<Streamer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadStreamers() {
      setLoading(true)
      setError(false)

      try {
        const response = await fetch(STREAMERS_API_URL)

        if (!response.ok) {
          throw new Error('Failed to fetch streamers')
        }

        const data: StreamersResponse = await response.json()

        if (!cancelled) {
          setStreamers(data.streamers ?? [])
        }
      } catch {
        if (!cancelled) {
          setError(true)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadStreamers()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Chess.com Streamers</h1>
        <p className="app__subtitle">
          Streamers oficiais do Chess.com e seus canais no Twitch
        </p>
      </header>

      <main className="app__main">
        {loading && <Loading />}
        {!loading && error && <EmptyState variant="error" />}
        {!loading && !error && streamers.length === 0 && (
          <EmptyState variant="empty" />
        )}
        {!loading && !error && streamers.length > 0 && (
          <StreamerList streamers={streamers} />
        )}
      </main>
    </div>
  )
}

export default App
