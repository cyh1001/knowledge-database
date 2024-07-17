// components/Notebar.tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getKnowledgeCardMark(id: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('knowledge_card')
    .select('text_mark')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching knowledge card mark:', error)
    return null
  }

  return data?.text_mark || null
}

export default async function Notebar({ knowledgeCardId }: { knowledgeCardId: string }) {
  const textMark = await getKnowledgeCardMark(knowledgeCardId)

  if (!textMark) {
    return <div className="alert alert-warning">No notes available</div>
  }

  return (
    <div className="card bg-base-200 shadow-lg">
      <div className="card-body">
        <h3 className="card-title text-xl mb-2">Notes</h3>
        <p className="whitespace-pre-wrap">{textMark}</p>
      </div>
    </div>
  )
}