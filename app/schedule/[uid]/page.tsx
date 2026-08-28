import { createClient } from '@/prismicio'
import { PrismicNextImage } from '@prismicio/next'
import { isFilled } from '@prismicio/client'
import { notFound } from 'next/navigation'

type Params = { uid: string }

export default async function PerformancePage({ params }: { params: Params }) {
  const client = createClient()

  const performance = await client
    .getByUID('performance', params.uid)
    .catch(() => null)

  if (!performance) {
    notFound()
  }

  const paragraphs = (performance.data.text || '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

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
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-xl leading-snug md:text-2xl">
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
