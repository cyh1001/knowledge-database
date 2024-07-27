'use client';

import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Notebar from '@/components/Notebar';
import AIabstract from '@/components/AIabstract';
import { notFound } from 'next/navigation';

// 修改 PageProps 类型定义
type PageProps = {
  params: {
    user_id: string;
    card_id: string;
  };
};

// 定义 KnowledgeCard 类型
type KnowledgeCard = {
  id: string;
  original_text_id: string;
  title: string;
  text_ai: string;
  text_mark: string;
  text_origin: string;
  created_at: string;
  updated_at: string;
};

// 初始化 Supabase 客户端
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getKnowledgeCard(id: string): Promise<KnowledgeCard | null> {
  console.log('Attempting to fetch knowledge card with id:', id);

  const { data, error } = await supabase
    .from('knowledge_card')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching knowledge card:', error);
    return null;
  }

  console.log('Knowledge card fetched successfully:', data);
  return data;
}

async function getOriginalTextUserId(originalTextId: string): Promise<string | null> {
  console.log('Attempting to fetch user_id for original text with id:', originalTextId);

  const { data, error } = await supabase
    .from('original_text')
    .select('user_id')
    .eq('id', originalTextId)
    .single();

  if (error) {
    console.error('Error fetching original text user_id:', error);
    return null;
  }

  console.log('Original text user_id fetched successfully:', data?.user_id);
  return data?.user_id || null;
}

export default async function CardDetail({ params }: PageProps) {
  console.log('CardDetail component rendering with params:', params);

  const { card_id } = params;

  if (!card_id) {
    console.error('card_id is undefined or null');
    notFound();
  }

  const card = await getKnowledgeCard(card_id);
  if (!card) {
    console.error('Knowledge card not found for id:', card_id);
    notFound();
  }

  const userId = await getOriginalTextUserId(card.original_text_id);
  if (!userId) {
    console.error('Failed to load user_id for original text:', card.original_text_id);
    notFound();
  }

  console.log('Rendering CardDetail component');
  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4">{card.title}</h2>
          <div className="flex justify-between items-center mb-4">
            {/* <div>
              <span className="text-gray-500 mr-2">Created:</span>
              <span className="font-semibold">{new Date(card.created_at).toLocaleDateString()}</span>
            </div> */}
            <div>
              <span className="text-gray-500 mr-2">更新时间</span>
              <span className="font-semibold">{new Date(card.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
          <Link href={`/i/${userId}/original/${card.original_text_id}`}>
  <button className="btn text-white bg-[#AE2AFE] hover:bg-[#9c27e6] px-6 py-3 mb-4">查看原文</button>
</Link>
          <div className="flex flex-col md:flex-row gap-4 h-full">
            <div className="flex-1 h-full">
              <Notebar knowledgeCardId={card_id}  />
            </div>
            <div className="flex-1 h-full">
              <AIabstract knowledgeCardId={card_id} />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

