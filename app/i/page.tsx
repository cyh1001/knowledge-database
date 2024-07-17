// app/i/page.tsx
import { createClient } from '@supabase/supabase-js'
import SearchBar from '@/components/SearchBar'
import EntryCard from '@/components/EntryCard'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getKnowledgeCardIds() {
  const { data, error } = await supabase
    .from('knowledge_card')
    .select('id')
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching knowledge card ids:', error)
    return []
  }

  return data.map(card => card.id)
}

export default async function HomePage() {
  const cardIds = await getKnowledgeCardIds()

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardIds.map((id) => (
          <EntryCard key={id} card_id={id} />
        ))}
      </div>
    </div>
  )
}