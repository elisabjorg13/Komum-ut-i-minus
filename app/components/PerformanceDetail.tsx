'use client'

import { useState } from 'react'
import Image from 'next/image'

type Lang = 'IS' | 'ES'

type PerformanceDetailProps = {
  title: string | null
  artist: string | null
  imageUrl: string | null
  imageAlt: string
  icelandicText: string[]
  icelandicBio: string[]
  englishText: string[]
  englishBio: string[]
}

export default function PerformanceDetail({
  title,
  artist,
  imageUrl,
  imageAlt,
  icelandicText,
  icelandicBio,
  englishText,
  englishBio,
}: PerformanceDetailProps) {
  const [lang, setLang] = useState<Lang>('IS')

  const paragraphs = lang === 'ES' ? englishText : icelandicText
  const bio = lang === 'ES' ? englishBio : icelandicBio

  return (
    <div className="relative min-h-screen bg-white px-4 py-10 md:px-8">
      <div className="pointer-events-auto fixed right-4 top-4 z-20 flex gap-2 text-xl font-bold leading-none text-[#D10000] md:right-8 md:top-8 md:text-2xl">
        <button
          type="button"
          onClick={() => setLang('ES')}
          className={lang === 'ES' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}
        >
          ES
        </button>
        <span className="opacity-40">/</span>
        <button
          type="button"
          onClick={() => setLang('IS')}
          className={lang === 'IS' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}
        >
          IS
        </button>
      </div>

      <div className="w-full text-[#D10000]">
        <div className="mb-8 space-y-1 md:mb-12">
          {title && (
            <p className="text-2xl leading-snug md:text-3xl">{title}</p>
          )}
          {artist && (
            <p className="font-[Arial,Helvetica,sans-serif] text-xl leading-snug md:text-2xl">
              {artist}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="min-w-0 flex-1 space-y-16 font-[Arial,Helvetica,sans-serif] md:max-w-xl">
            {paragraphs.length > 0 && (
              <div className="space-y-4">
                {paragraphs.map((paragraph, i) => (
                  <p key={`text-${i}`} className="text-xl leading-snug">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
            {bio.length > 0 && (
              <div className="space-y-4">
                {bio.map((paragraph, i) => (
                  <p key={`bio-${i}`} className="text-xl leading-snug">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>

          {imageUrl && (
            <div className="w-full shrink-0 md:w-56 lg:w-72">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={600}
                height={800}
                className="h-auto w-full object-contain"
                unoptimized
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
