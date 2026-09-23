import Link from 'next/link'
import { createClient } from '@/prismicio'

export const dynamic = 'force-dynamic'

function parseTime(time: string | null | undefined): number {
  if (!time) return Infinity

  const match = time.trim().match(/^(\d{1,2}):(\d{2})$/)
  if (!match) return Infinity

  const minutes = parseInt(match[1], 10) * 60 + parseInt(match[2], 10)

  // Overnight festival: early-morning times (before 06:00) come after evening
  if (minutes < 6 * 60) {
    return minutes + 24 * 60
  }

  return minutes
}

function hasPerformanceText(
  icelandicText: string | null | undefined,
  englishText: string | null | undefined,
) {
  return Boolean(icelandicText?.trim() || englishText?.trim())
}

export default async function SchedulePage() {
  const client = createClient()

  const performances = (await client.getAllByType('performance'))
    .slice()
    .sort((a, b) => parseTime(a.data.time) - parseTime(b.data.time))

  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-8">
      <div className="mx-auto max-w-4xl space-y-4 text-[#D10000]">
        {performances.map((performance) => {
          const clickable = hasPerformanceText(
            performance.data.icelandic_text,
            performance.data.english_text,
          )
          const rowClassName =
            'flex items-start justify-between gap-6 text-xl leading-snug md:text-2xl'
          const content = (
            <>
              <span className="shrink-0">
                {[performance.data.time, performance.data.title]
                  .filter(Boolean)
                  .join(' ')}
              </span>
              {performance.data.artist && (
                <span className="text-right">{performance.data.artist}</span>
              )}
            </>
          )

          if (clickable) {
            return (
              <Link
                key={performance.id}
                href={`/schedule/${performance.uid}`}
                className={`${rowClassName} transition-opacity hover:opacity-70`}
              >
                {content}
              </Link>
            )
          }

          return (
            <div key={performance.id} className={rowClassName}>
              {content}
            </div>
          )
        })}
      </div>
    </div>
  )
}
