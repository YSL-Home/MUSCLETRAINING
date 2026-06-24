import { TELEGRAM_URL } from '@/lib/social'

/** Encart discret invitant à rejoindre le canal Telegram (fin d'article). */
export default function TelegramCTA() {
  return (
    <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-2xl p-4 mt-8 transition-all hover:-translate-y-0.5"
      style={{ background: 'rgba(35,164,239,0.07)', border: '1px solid rgba(35,164,239,0.25)' }}>
      <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="#229ED9">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.86 8.78c-.14.62-.51.77-1.03.48l-2.85-2.1-1.37 1.32c-.15.15-.28.28-.57.28l.2-2.9 5.27-4.76c.23-.2-.05-.32-.35-.12L8.4 13.5l-2.8-.88c-.61-.19-.62-.61.13-.9l10.95-4.22c.51-.18.96.12.78.66z"/>
      </svg>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm" style={{ color: '#EDE8E0' }}>📲 Rejoins le canal Telegram</p>
        <p className="text-xs" style={{ color: '#8A9BB5' }}>3 conseils musculation par semaine, gratuit.</p>
      </div>
      <span className="text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0" style={{ background: '#229ED9', color: '#fff' }}>Rejoindre</span>
    </a>
  )
}
