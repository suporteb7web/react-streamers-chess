import './Loading.css'

export function Loading() {
  return (
    <div className="loading" role="status" aria-live="polite">
      <div className="loading__spinner" aria-hidden="true" />
      <p className="loading__text">Carregando streamers...</p>
    </div>
  )
}
