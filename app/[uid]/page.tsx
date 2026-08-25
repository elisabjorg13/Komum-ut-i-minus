import { createClient } from '@/prismicio'
import { SliceZone } from '@prismicio/react'
import { components } from '@/slices'
import { notFound } from 'next/navigation'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()

  const page = await client.getByUID('page', params.uid).catch(() => null)

  if (!page) {
    notFound()
  }

  return (
    <div>
      <SliceZone slices={page.data.slices} components={components} />
    </div>
  )
}

export async function generateStaticParams() {
  const client = createClient()

  try {
    const pages = await client.getAllByType('page')
    return pages
      .filter((page) => page.uid !== 'home')
      .map((page) => ({ uid: page.uid }))
  } catch {
    return []
  }
}
