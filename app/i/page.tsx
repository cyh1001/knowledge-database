import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import SearchBar from '@/components/SearchBar'
import EntryCard from '@/components/EntryCard'
import Link from 'next/link'
import { Suspense } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/tabs'
import TextCard from '@/components/TextCard'

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
        <SearchBar />

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

// // 'use client';

// import { createClient } from '@supabase/supabase-js';
// import SearchBar from '@/components/SearchBar';
// import EntryCard from '@/components/EntryCard';
// import Link from 'next/link';
// import { Suspense } from 'react';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/tabs';
// import TextCard from '@/components/TextCard';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// async function getKnowledgeCards() {
//   console.log('Fetching knowledge cards from Supabase...');

//   const { data, error } = await supabase
//     .from('knowledge_card')
//     .select()
//     // .order('updated_at', { ascending: false })
//     .range(0, 300);

//   if (error) {
//     console.error('Error fetching knowledge cards:', error);
//     return [];
//   }

//   data.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
//   const dataCount = data.length;
//   console.log(`获取到 ${dataCount} 条 Knowledge_card 数据`);

//   // console.log('Knowledge cards fetched:', data);
//   return data;
// }

// async function getOriginalTexts() {
//   console.log('Fetching original texts from Supabase...');

//   const { data, error } = await supabase
//     .from('original_text')
//     .select()
//     // .order('updated_at', { ascending: false })
//     .range(0, 500);

//   if (error) {
//     console.error('Error fetching original texts:', error);
//     return [];
//   }
//   // data.forEach((text) => {
//   //   console.log('Original text id:', text.id, 'Title:', text.title);
//   // });
//     // 按照 updated_at 降序排列输出 original_text 的 id 和 title
//     data.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
//     const dataCount = data.length;
//     console.log(`获取到 ${dataCount} 条 original_text 数据`);
//     // data.forEach((text) => {
//     //   console.log('Original text id:', text.id, 'Title:', text.title);
//     // });
//   // console.log('Original texts fetched:', data);
//   return data;
// }

// export default async function HomePage() {
//   const knowledgeCards = await getKnowledgeCards();
//   const originalTexts = await getOriginalTexts();

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Tabs defaultValue="home">
//         <div className="flex justify-center">
//           <TabsList>
//             <TabsTrigger value="home">Home</TabsTrigger>
//             <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
//             <TabsTrigger value="review">Review</TabsTrigger>
//           </TabsList>
//         </div>
//         <SearchBar />

//         <TabsContent value="knowledge">
//           <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Suspense fallback={<div>Loading...</div>}>
//               {knowledgeCards.map((card) => (
//                 <Link
//                   href={`/i/4cf39c7b-6361-4973-840c-168e129f176d/card/${card.id}`}
//                   key={card.id}
//                 >
//                   <EntryCard card={card} />
//                 </Link>
//               ))}
//             </Suspense>
//           </div>
//         </TabsContent>

//         <TabsContent value="home">
//           <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Suspense fallback={<div>Loading...</div>}>
//               {originalTexts.map((text) => (
//                 <Link
//                   href={`/i/4cf39c7b-6361-4973-840c-168e129f176d/original/${text.id}`}
//                   key={text.id}
//                 >
//                   <TextCard text={text} />
//                 </Link>
//               ))}
//             </Suspense>
//           </div>
//         </TabsContent>

//         <TabsContent value="review">
//           <div>这里可以帮你做定期总结，正在开发中</div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
