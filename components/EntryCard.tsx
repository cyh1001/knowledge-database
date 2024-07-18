'use client'

import { useState, useEffect } from 'react'
import { formatDate } from '@/utils/date'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import Providers from '@/components/ProgressBarProvider';
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

export default function EntryCard({ card_id }: { card_id: string }) {
  const [card, setCard] = useState<KnowledgeCard | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('knowledge_card')
          .select('id, title, text_ai, updated_at')
          .eq('id', card_id)
          .single()

        if (error) {
          console.error('Error fetching knowledge card:', error)
          setLoading(false)
        } else {
          setCard(data)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching knowledge card:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [card_id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!card) {
    return null
  }

  return (
    // <Link href={`/i/4cf39c7b-6361-4973-840c-168e129f176d/card/${card.id}`}>
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200">
      <div className="card-body">
        <div className="text-sm text-gray-500 mb-2">
          {formatDate(card.updated_at)}
        </div>
        <h2 className="card-title text-lg mb-2">{card.title}</h2>
        <p className="text-sm line-clamp-3">{card.text_ai}</p>
      </div>
    </div>
    // </Link>
  )
}

// // components/EntryCard.tsx
// // 'use client'
// import { formatDate } from '@/utils/date'
// import { createClient } from '@supabase/supabase-js'
// import Link from 'next/link'

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

// type KnowledgeCard = {
//   id: string
//   title: string
//   text_ai: string
//   updated_at: string
// }

// async function getKnowledgeCard(id: string): Promise<KnowledgeCard | null> {
//   const { data, error } = await supabase
//     .from('knowledge_card')
//     .select('id, title, text_ai, updated_at')
//     .eq('id', id)
//     .single()

//   if (error) {
//     console.error('Error fetching knowledge card:', error)
//     return null
//   }

//   return data
// }

// export default async function EntryCard({ card_id }: { card_id: string }) {
//   const card = await getKnowledgeCard(card_id)

//   if (!card) {
//     return null
//   }

//   return (
//     // <Link href={`/i/4cf39c7b-6361-4973-840c-168e129f176d/card/${card.id}`}>
//     <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200">
//     <div className="card-body">
//       <div className="text-sm text-gray-500 mb-2">
//         {formatDate(card.updated_at)}
//       </div>
//       <h2 className="card-title text-lg mb-2">{card.title}</h2>
//       <p className="text-sm line-clamp-3">{card.text_ai}</p>
//     </div>
//   </div>
//     // </Link>
//   )
// }