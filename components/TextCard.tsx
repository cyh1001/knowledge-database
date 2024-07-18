'use client'

import { useState, useEffect } from 'react'
import { formatDate } from '@/utils/date'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type TextCard = {
  id: string
  title: string
  text: string
  updated_at: string
}

export default function TextCard({ textcard_id }: { textcard_id: string }) {
  const [textcard, settextCard] = useState<TextCard | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('original_text')
        .select('id, title, text, updated_at')
        .eq('id', textcard_id)
        .single()

      if (error) {
        console.error('Error fetching knowledge card:', error)
      } else {
        settextCard(data)
      }

      setLoading(false)
    }

    fetchData()
  }, [textcard_id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!textcard) {
    return null
  }

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200">
      <div className="card-body">
        <div className="text-sm text-gray-500 mb-2">
          {formatDate(textcard.updated_at)}
        </div>
        <h2 className="card-title text-lg mb-2">{textcard.title}</h2>
        <p className="text-sm line-clamp-3">{textcard.text}</p>
      </div>
    </div>
  )
}