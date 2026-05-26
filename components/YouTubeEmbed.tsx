'use client'

import { useState } from 'react'

interface YouTubeEmbedProps {
  videoId: string
  title: string
}

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  if (!loaded) {
    return (
      <button
        onClick={() => setLoaded(true)}
        className="relative w-full aspect-video rounded-2xl overflow-hidden group cursor-pointer"
        aria-label={`Lire la vidéo : ${title}`}
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:bg-red-500 transition-colors">
              <svg className="w-8 h-8 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-white font-semibold text-sm bg-black/60 px-4 py-1.5 rounded-full">
              Voir la technique en vidéo
            </span>
          </div>
        </div>
      </button>
    )
  }

  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
}
