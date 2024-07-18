// app/i/page.tsx
import { createClient } from '@supabase/supabase-js'
import SearchBar from '@/components/SearchBar'
import EntryCard from '@/components/EntryCard'
import Link from 'next/link'
import { Suspense } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getKnowledgeCardIds() {
  console.log('Fetching knowledge card IDs from Supabase...')

  const { data, error } = await supabase
    .from('knowledge_card')
    .select('id')
    .order('updated_at', { ascending: false }) // 按照更新时间降序排列
    // .range() // 禁用分页,获取所有记录

  if (error) {
    console.error('Error fetching knowledge card ids:', error)
    return []
  }

  console.log('Knowledge card IDs fetched:', data)
  return data.map(card => card.id)
}

// export default async function HomePage() {
//   console.log('Rendering HomePage component...')

//   const cardIds = await getKnowledgeCardIds()

//   console.log(`Fetched ${cardIds.length} knowledge card IDs`)

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <SearchBar />
//       <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {cardIds.map((id) => (
//               <Link href={`/i/4cf39c7b-6361-4973-840c-168e129f176d/card/${id}`}>
//                 <EntryCard key={id} card_id={id} />
//               </Link>
//         ))}
//       </div>
//     </div>
//   )
// }
export default async function HomePage() {
  const cardIds = await getKnowledgeCardIds()

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          {cardIds.map((id) => (
            <EntryCard key={id} card_id={id} />
          ))}
        </Suspense>
      </div>
    </div>
  )
}