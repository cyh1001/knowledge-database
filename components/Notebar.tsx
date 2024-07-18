// 'use client'

// import { useState, useEffect } from 'react'
// import { createClient } from '@supabase/supabase-js'
// import { FaSave } from 'react-icons/fa'

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

// const NoteComponent = ({ knowledgeCardId }: { knowledgeCardId: string }) => {
//   const [text, setText] = useState('')

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data, error } = await supabase
//         .from('knowledge_card')
//         .select('text_mark')
//         .eq('id', knowledgeCardId)
//         .single()

//       if (error) {
//         console.error('Error fetching knowledge card mark:', error)
//       } else {
//         setText(data?.text_mark || '')
//       }
//     }

//     fetchData()
//   }, [knowledgeCardId])

//   const saveNote = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('knowledge_card')
//         .update({ text_mark: text })
//         .eq('id', knowledgeCardId)
//         .single()

//       if (error) {
//         console.error('Error saving note:', error)
//       } else {
//         console.log('Note saved successfully:', data)
//       }
//     } catch (error) {
//       console.error('Error saving note:', error)
//     }
//   }

//   return (
//     <div className="card bg-base-200 shadow-xl">
//       <div className="card-body">
//         <textarea
//           className="textarea textarea-bordered w-full"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           rows={6}
//         />
//         <div className="card-actions justify-end">
//           <button
//             className="btn btn-circle btn-primary"
//             onClick={saveNote}
//             title="Save Note"
//           >
//             <FaSave />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default NoteComponent


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

  // if (!textMark) {
  //   return <div className="alert alert-warning">No notes available</div>
  // }

  return (
    <div className="card bg-base-200 shadow-lg">
      <div className="card-body">
        <h3 className="card-title text-xl mb-2">你的笔记</h3>
        <p className="whitespace-pre-wrap">{textMark}</p>
      </div>
    </div>
  )
}