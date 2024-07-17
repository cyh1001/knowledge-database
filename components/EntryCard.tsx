// components/EntryCard.tsx
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type KnowledgeCard = {
  id: string
  title: string
  text_ai: string
  updated_at: string
}

async function getKnowledgeCard(id: string): Promise<KnowledgeCard | null> {
  const { data, error } = await supabase
    .from('knowledge_card')
    .select('id, title, text_ai, updated_at')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching knowledge card:', error)
    return null
  }

  return data
}

export default async function EntryCard({ card_id }: { card_id: string }) {
  const card = await getKnowledgeCard(card_id)

  if (!card) {
    return null
  }

  return (
    <Link href={`/i/card/${card.id}`}>
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200">
        <div className="card-body">
          <div className="text-sm text-gray-500 mb-2">
            {new Date(card.updated_at).toLocaleDateString()}
          </div>
          <h2 className="card-title text-lg mb-2">{card.title}</h2>
          <p className="text-sm line-clamp-3">{card.text_ai}</p>
        </div>
      </div>
    </Link>
  )
}