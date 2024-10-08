// /components/SearchBar
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

// 初始化 Supabase 客户端
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface ApiResponse {
  success: boolean
  summary: string
  timestamp: string
}
interface SearchBarProps {
  userId: string | null
}
console.log('Supabase client initialized')
type InputType = 'text' | 'image' | 'link' | 'file'

export default function SearchBar({ userId }: SearchBarProps) {
  const [file, setFile] = useState<File | null>(null)
  const [inputType, setInputType] = useState<InputType>('text')

  const [query, setQuery] = useState('')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false) // 新增加载状态

  console.log('SearchBar component rendered')

  // 处理输入类型变化
  const handleInputTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputType(e.target.value as InputType)
    setQuery('') // 重置查询输入
    // setFile(null) // 重置文件输入
  }

  // 获取网页内容的函数
  const fetchWebContent = async (url: string): Promise<string> => {
    console.log('Fetching web content for URL:', url)
    try {
      const response = await fetch('/api/fetch-web-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      if (!response.ok) throw new Error('Failed to fetch web content')
      const data = await response.json()
      console.log('API response:', data)
      return data.content
    } catch (error) {
      console.error('Error fetching web content:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    let textToProcess = '';
    console.log('inputType:', inputType)
if (inputType === 'link') {
  textToProcess = await fetchWebContent(query);
  console.log('linktextToProcess:', textToProcess)
} else {
  textToProcess = query.trim();
  console.log('textToProcess:', textToProcess)
}
    e.preventDefault()
    if (!userId) {
      console.log('User not logged in, submission aborted')
      return
    }
    if (!textToProcess || !userId) {
      console.log('Empty query or user not logged in, submission aborted')
      return
    }

    console.log('Submitting query:', textToProcess)
    setIsLoading(true) // 设置加载状态为 true
    setQuery('') // 立即清空输入框

    try {
      // 根据输入类型处理内容
      if (inputType === 'link') {
        textToProcess = await fetchWebContent(query)
      }

      if (!textToProcess) {
        console.log('No content to process')
        return
      }
      
      // 1. 存储查询到 Supabase 的 original_text 表
      console.log('Storing query in Supabase')
      console.log('query.trim', textToProcess)
      console.log('userId:', userId)
      console.log('title:', textToProcess.substring(0, 35))
      const { data: originalTextData, error: originalTextError } = await supabase
        .from('original_text')
        .insert({
          user_id: userId, // 请替换为实际的用户ID
          title: query.trim().substring(0, 35), // 使用查询的前20个字符作为标题
          text: query.trim(),
        })
        .select()

      if (originalTextError) {
        console.error('Error storing query:', originalTextError)
        throw originalTextError
      }

      if (!originalTextData || originalTextData.length === 0) {
        console.error('Failed to insert original text: No data returned')
        throw new Error('Failed to insert original text')
      }

      const originalTextId = originalTextData[0].id
      console.log('Query stored successfully, id:', originalTextId)

      // 2. 触发summarize API
      // console.log('Calling summarize API')
      // console.log('query.trim', textToProcess)


      // const response = await fetch('/api/summarize', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ text: textToProcess }),
      // })
      // console.log('Summarize API response:', response)
    // Calling summarize API
    console.log('Calling summarize API. Content length:', textToProcess.length);
    console.log('API endpoint:', '/api/summarize');
    
    const requestBody = JSON.stringify({ text: textToProcess });
    console.log('Request body length:', requestBody.length);

    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody,
    });

    console.log('Summarize API response status:', response.status);
    console.log('Summarize API response OK:', response.ok);



      if (!response.ok) {
        console.error('Summarize API failed:', response.statusText)
        throw new Error('Failed to summarize')
      }

      console.log('Summarize API response:')
      const result = await response.json() as ApiResponse
      console.log('API response:', result)

      if (!result.success || typeof result.summary !== 'string') {
        throw new Error('Unexpected API response structure')
      }

      const summary = result.summary
      console.log('Summary received:', summary)

      // 提取标题(假设摘要的第一行是标题)
      const lines = summary.split('\n')
      const rawTitle = lines[0].trim() || '总结'
      const title = rawTitle.replace(/<[^>]+>/g, '') // 使用正则表达式去除HTML标签
      console.log('Extracted title:', title)

      // 摘要文本（除了第一行的其余部分）
      const textAi = lines.slice(1).join('\n').trim()
      console.log('Cleaned text_ai:', textAi)

      console.log('Storing response in Supabase')
      const { data: knowledgeCardData, error: storeError } = await supabase
        .from('knowledge_card')
        .insert({
          original_text_id: originalTextId,
          user_id: userId,
          title: title,
          text_ai: textAi,
          text_mark: null, // 如果有标记版本的文本，可以在这里添加
          text_origin: query.trim(),
        })
        .select()

      if (storeError) {
        console.error('Error storing response:', storeError)
        throw storeError
      }

      if (knowledgeCardData && knowledgeCardData.length > 0) {
        console.log('Response stored successfully, new record id:', knowledgeCardData[0].id)
      } else {
        console.log('Response stored successfully, but no data returned')
      }

      // 4. 刷新页面或更新UI
      console.log('Refreshing page')
      router.refresh()
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      // 在这里处理错误，例如显示一个错误消息给用户
    } finally {
      setIsLoading(false) // 无论成功或失败，都设置加载状态为 false
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
            {/* 输入类型选择下拉菜单 */}
            {inputType === 'text' && (
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入你需要收集的信息，可以自动生成知识卡片哦~"
          className="flex-grow p-2 border rounded"
          disabled={isLoading}
        />
      )}

      {inputType === 'image' && (
  <div className="p-2 border rounded bg-gray-100 text-gray-600 flex-grow">
  正在开发中，敬请期待
</div>
      )}

      {inputType === 'link' && (
        <input
          type="url"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入链接..."
          className="flex-grow p-2 border rounded"
          disabled={isLoading}
        />
      )}

      {inputType === 'file' && (
  <div className="p-2 border rounded bg-gray-100 text-gray-600 flex-grow">
  正在开发中，敬请期待
</div>
      )}
      {/* <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="输入你需要收集的信息，可以自动生成知识卡片哦~"
        className="flex-grow p-2 border rounded"
        disabled={isLoading} // 在加载状态时禁用输入框
      /> */}
      <select
        value={inputType}
        onChange={handleInputTypeChange}
        className="p-2 border rounded"
      >
        <option value="text">文本</option>
        <option value="image">图片</option>
        <option value="link">链接</option>
        <option value="file">文件</option>
      </select>
      {isLoading ? (
        // 显示加载动画
        <button type="button" className="btn btn-primary loading " disabled>
          正在处理...
        </button>
      ) : (
        // 显示提交按钮
        <button
          type="submit"
          className="flex items-center justify-center px-4 py-2 bg-[#AE2AFE] hover:bg-[#9c27e6] text-white rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      )}
    </form>
  )
}