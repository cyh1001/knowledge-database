import { createClient } from '@supabase/supabase-js'
import SearchBar from '@/components/SearchBar'
import EntryCard from '@/components/EntryCard'
import Link from 'next/link'
import { Suspense } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/tabs'
import TextCard from '@/components/TextCard'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getKnowledgeCardIds() {
  console.log('Fetching knowledge card IDs from Supabase...')

  const { data, error } = await supabase
    .from('knowledge_card')
    .select('id')
    .order('updated_at', { ascending: false })
    .range(0, 100)

  if (error) {
    console.error('Error fetching knowledge card ids:', error)
    return []
  }

  console.log('Knowledge card IDs fetched:', data)
  return data.map(card => card.id)
}

async function getOriginalTextIds() {
  console.log('Fetching original text IDs from Supabase...')

  const { data, error } = await supabase
    .from('original_text')
    .select('id, title, text')
    .order('updated_at', { ascending: false })
    .range(0, 100)

  if (error) {
    console.error('Error fetching original text ids:', error)
    return []
  }

  console.log('Original text IDs fetched:', data)
  return data
}

export default async function HomePage() {
  const cardIds = await getKnowledgeCardIds()
  const originalTextData = await getOriginalTextIds()
  return (
    <div className="container mx-auto px-4 py-8 ">
      <Tabs defaultValue="home">
      <div className="flex justify-center">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
          
          <TabsTrigger value="review">Review</TabsTrigger>
        </TabsList>
        </div>
        <SearchBar />

        <TabsContent value="knowledge">
          {/* Knowledge 内容 */}
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Suspense fallback={<div>Loading...</div>}>
              {cardIds.map((id) => (
                <Link href={`/i/4cf39c7b-6361-4973-840c-168e129f176d/card/${id}`} key={id}>
                  <EntryCard key={id} card_id={id} />
                </Link>
              ))}
            </Suspense>
          </div>
        </TabsContent>


        <TabsContent value="home">
          {/* Home 内容 */}
        {/* Home 内容 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Suspense fallback={<div>Loading...</div>}>
            {originalTextData.map((data: { id: string; title: string; text: string }) => (
              <Link href={`/i/4cf39c7b-6361-4973-840c-168e129f176d/original/${data.id}`}  key={data.id}>
                {/* <TextCard key={data.id} textcard_id={data.id} title={data.title} text={data.text} /> */}
                <TextCard key={data.id} textcard_id={data.id} />
              </Link>
            ))}
          </Suspense>
        </div>
        </TabsContent>


        <TabsContent value="review">
          {/* Review 内容 */}
          <div>这里可以帮你做定期总结，正在开发中</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}