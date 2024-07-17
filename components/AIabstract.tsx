// components/AIabstract.tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getKnowledgeCardAI(id: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('knowledge_card')
    .select('text_ai')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching knowledge card AI text:', error)
    return null
  }

  return data?.text_ai || null
}

export default async function AIabstract({ knowledgeCardId }: { knowledgeCardId: string }) {
  const textAI = await getKnowledgeCardAI(knowledgeCardId)

  if (!textAI) {
    return <div className="alert alert-warning">No AI abstract available</div>
  }

  return (
    <div className="card bg-base-200 shadow-lg">
      <div className="card-body">
        <h3 className="card-title text-xl mb-2">AI Abstract</h3>
        <p className="whitespace-pre-wrap">{textAI}</p>
      </div>
    </div>
  )
}