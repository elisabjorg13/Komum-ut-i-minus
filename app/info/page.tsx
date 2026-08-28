import { createClient } from '@/prismicio'

export default async function InfoPage() {
  const client = createClient()
  const doc = await client.getSingle('infotext').catch(() => null)

  const paragraphs = (doc?.data.text || '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-8">
      <div className="mx-auto max-w-2xl space-y-6 text-[#D10000]">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-xl leading-snug md:text-2xl">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}
