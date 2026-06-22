import './EmptyState.css'

type EmptyStateVariant = 'error' | 'empty'

type EmptyStateProps = {
  variant: EmptyStateVariant
}

const messages: Record<EmptyStateVariant, string> = {
  error: 'Não foi possível carregar os streamers. Tente novamente mais tarde.',
  empty: 'Nenhum streamer encontrado no momento.',
}

export function EmptyState({ variant }: EmptyStateProps) {
  return (
    <div className="empty-state" role={variant === 'error' ? 'alert' : 'status'}>
      <p className="empty-state__message">{messages[variant]}</p>
    </div>
  )
}
