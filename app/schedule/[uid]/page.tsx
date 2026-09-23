import { createClient } from '@/prismicio'
import { PrismicNextImage } from '@prismicio/next'
import { isFilled } from '@prismicio/client'
import { notFound } from 'next/navigation'

type Params = { uid: string }

function splitParagraphs(text: string | null | undefined) {
  return (text || '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export default async function PerformancePage({ params }: { params: Params }) {
  const client = createClient()

  const performance = await client
    .getByUID('performance', params.uid)
    .catch(() => null)

  if (!performance) {
    notFound()
  }

  const icelandicParagraphs = splitParagraphs(performance.data.icelandic_text)
  const icelandicBio = splitParagraphs(performance.data.icelandic_artist_bio)
  const englishParagraphs = splitParagraphs(performance.data.english_text)
  const englishBio = splitParagraphs(performance.data.english_artist_bio)

  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-8">
      <div className="mx-auto max-w-2xl space-y-6 text-[#D10000]">
        {performance.data.title && (
          <p className="text-2xl leading-snug md:text-3xl">
            {performance.data.title}
          </p>
        )}
        {performance.data.artist && (
          <p className="text-xl leading-snug md:text-2xl">
            {performance.data.artist}
          </p>
        )}
        {isFilled.image(performance.data.image) && (
          <PrismicNextImage
            field={performance.data.image}
            className="h-auto w-full object-contain"
            alt=""
          />
        )}
        {icelandicParagraphs.map((paragraph, i) => (
          <p key={`is-text-${i}`} className="text-xl leading-snug md:text-2xl">
            {paragraph}
          </p>
        ))}
        {icelandicBio.map((paragraph, i) => (
          <p key={`is-bio-${i}`} className="text-xl leading-snug md:text-2xl">
            {paragraph}
          </p>
        ))}
        {englishParagraphs.map((paragraph, i) => (
          <p key={`en-text-${i}`} className="text-xl leading-snug md:text-2xl">
            {paragraph}
          </p>
        ))}
        {englishBio.map((paragraph, i) => (
          <p key={`en-bio-${i}`} className="text-xl leading-snug md:text-2xl">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const client = createClient()

  try {
    const performances = await client.getAllByType('performance')
    return performances.map((performance) => ({ uid: performance.uid }))
  } catch {
    return []
  }
}
