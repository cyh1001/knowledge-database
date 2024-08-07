import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import SearchBar from '@/components/SearchBar'
import EntryCard from '@/components/EntryCard'
import Link from 'next/link'
import { Suspense } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/tabs'
import TextCard from '@/components/TextCard'
import Masonry from 'react-masonry-css';

// 更新 KnowledgeCard 类型
type KnowledgeCard = {
  id: string;
  original_text_id: string;
  title: string;
  text_ai: string;
  text_mark: string;
  text_origin: string;
  created_at: string;
  updated_at: string;
  // 如果还有其他字段，请添加
};

// 更新 OriginalText 类型
type OriginalText = {
  id: string;
  user_id: string;
  title: string | null;
  text: string | null;
  created_at: string;
  updated_at: string;
  // 如果还有其他字段，请添加
};

type UserProfile = {
  id: string;
  name?: string;
  // 添加其他必要的字段
};

async function getKnowledgeCards(userId: string): Promise<KnowledgeCard[]> {
  const supabase = createClient()
  console.log('Fetching knowledge cards from Supabase...')

  const { data, error } = await supabase
    .from('knowledge_card')
    .select('*')
    .eq('user_id', userId)
    .range(0, 300)

  if (error) {
    console.error('Error fetching knowledge cards:', error)
    return []
  }

  console.log(`Successfully fetched ${data.length} knowledge cards`)
  return data.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
}

async function getOriginalTexts(userId: string): Promise<OriginalText[]> {
  const supabase = createClient()
  console.log('Fetching original texts from Supabase...')

  const { data, error } = await supabase
    .from('original_text')
    .select('*')
    .eq('user_id', userId)
    .range(0, 500)

  if (error) {
    console.error('Error fetching original texts:', error)
    return []
  }

  console.log(`Successfully fetched ${data.length} original texts`)
  return data.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
}

export default async function HomePage() {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  console.log('Rendering HomePage')
  const supabase = createClient()

  console.log('Checking user authentication')
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    console.log('User not authenticated, redirecting to login page')
    redirect('/login')
  }
  console.log('User ID:', user.id)
  console.log('User authenticated, fetching data')
  const knowledgeCards = await getKnowledgeCards(user.id)
  const originalTexts = await getOriginalTexts(user.id)

  console.log('Rendering page content')
  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="home">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
          </TabsList>
        </div>
        <SearchBar userId={user.id}/>

        <TabsContent value="knowledge">
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Suspense fallback={<div>Loading...</div>}>
              {knowledgeCards.map((card) => (
                <Link
                  href={`/i/card/${card.id}`}
                  key={card.id}
                >
                  <EntryCard card={card} />
                </Link>
              ))}
            </Suspense>
          </div>
        </TabsContent>
        {/* <TabsContent value="home">
      <div className="mt-8">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          <Suspense fallback={<div>Loading...</div>}>
            {originalTexts.map((text) => (
              <div key={text.id} className="mb-4">
                <Link href={`/i/original/${text.id}`}>
                  <TextCard text={text} />
                </Link>
              </div>
            ))}
          </Suspense>
        </Masonry>
      </div>
    </TabsContent> */}
        <TabsContent value="home">
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Suspense fallback={<div>Loading...</div>}>
              {originalTexts.map((text) => (
                <Link
                  href={`/i/original/${text.id}`}
                  key={text.id}
                >
                  <TextCard text={text} />
                </Link>
              ))}
            </Suspense>
          </div>
        </TabsContent>

        <TabsContent value="review">
          <div>这里可以帮你做定期总结，正在开发中</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}