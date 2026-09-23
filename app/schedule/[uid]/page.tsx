import { createClient } from '@/prismicio'
import { isFilled } from '@prismicio/client'
import { notFound } from 'next/navigation'
import PerformanceDetail from '@/app/components/PerformanceDetail'

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

  return (
    <PerformanceDetail
      title={performance.data.title}
      artist={performance.data.artist}
      imageUrl={
        isFilled.image(performance.data.image)
          ? performance.data.image.url
          : null
      }
      imageAlt={performance.data.title || ''}
      icelandicText={splitParagraphs(performance.data.icelandic_text)}
      icelandicBio={splitParagraphs(performance.data.icelandic_artist_bio)}
      englishText={splitParagraphs(performance.data.english_text)}
      englishBio={splitParagraphs(performance.data.english_artist_bio)}
    />
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
