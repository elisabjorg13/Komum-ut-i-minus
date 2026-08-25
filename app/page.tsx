import Link from 'next/link'
import { createClient } from '@/prismicio'
import { PrismicNextImage } from '@prismicio/next'
import { isFilled } from '@prismicio/client'

export default async function Home() {
  const client = createClient()

  const images = (await client.getAllByType('homepageimage'))
    .filter((doc) => isFilled.image(doc.data.image))
    .sort((a, b) =>
      (a.data.name || a.uid || '').localeCompare(
        b.data.name || b.uid || '',
        undefined,
        { numeric: true },
      ),
    )

  return (
    <div className="relative h-[100dvh] overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-start justify-between px-3 pt-2">
        <div className="relative flex flex-col items-start">
          <img
            src="/images/kall.png"
            alt=""
            className="relative z-10 mb-[-25px] ml-2 h-auto w-28 select-none"
          />
          <p className="relative z-0 text-4xl font-bold leading-none text-[#D10000]">
            Komum út í mínus
          </p>
        </div>
        <div className="pointer-events-auto mt-36 flex flex-col items-end leading-none md:mt-28">
          <Link href="/info" className="text-3xl font-bold text-[#D10000]">
            info
          </Link>
          <Link href="/schedule" className="text-3xl font-bold text-[#D10000]">
            schedule
          </Link>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 z-10 bg-white/10" />

      <div className="h-full overflow-y-auto">
        <div className="flex flex-col items-center opacity-100">
          {images.map((doc) => (
            <PrismicNextImage
              key={doc.id}
              field={doc.data.image}
              className="h-auto w-full object-contain"
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  )
}
