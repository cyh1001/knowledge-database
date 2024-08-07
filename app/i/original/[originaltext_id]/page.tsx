import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'

// 修改 PageProps 类型定义
type PageProps = {
    params: {
      user_id: string
      originaltext_id: string  // 改为 originaltext_id
    }
  }

// 定义 OriginalText 类型
type OriginalText = {
  id: string
  user_id: string
  title: string | null
  text: string | null
  created_at: string
  updated_at: string
}
// 初始化 Supabase 客户端
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

// console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
// console.log('Supabase client initialized')

async function getOriginalText(originaltext_id: string): Promise<OriginalText | null> {
    console.log('Attempting to fetch original text with id:', originaltext_id)
    
    const { data, error } = await supabase
      .from('original_text')
      .select('*')
      .eq('id', originaltext_id)
      .single()
  
    if (error) {
      console.error('Error fetching original text:', error)
      return null
    }
  
    console.log('Original text fetched successfully:', data)
    return data
  }
  
  export default async function OriginalPage({ params }: PageProps) {
    console.log('OriginalPage component rendering with params:', params)
    
    const { originaltext_id } = params  // 使用 originaltext_id
    console.log('Extracted originaltext_id:', originaltext_id)
  
    if (!originaltext_id) {
      console.error('originaltext_id is undefined or null')
      notFound()
    }
  
    const originalText = await getOriginalText(originaltext_id)
  
    if (!originalText) {
      console.error('Original text not found for id:', originaltext_id)
      notFound()
    }
  
    console.log('Rendering original text:', originalText)
  
  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">
            {originalText.title || 'Untitled'}
          </h2>
          <div className="text-gray-400">
  上次更新：{new Date(originalText.updated_at).toLocaleDateString()}
</div>
          <div className="divider"></div>
          <p className="whitespace-pre-wrap">
            {originalText.text || 'No content available'}
          </p>
          <div className="card-actions justify-end mt-4">

          </div>
        </div>
      </div>
    </div>
  )
}