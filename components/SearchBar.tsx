'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js'

// 初始化 Supabase 客户端
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface ApiResponse {
  success: boolean;
  summary: string;
  timestamp: string;
}

console.log('Supabase client initialized');

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  console.log('SearchBar component rendered');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      console.log('Empty query, submission aborted');
      return;
    }

    console.log('Submitting query:', query.trim());

    try {
      // 1. 存储查询到 Supabase 的 original_text 表
      console.log('Storing query in Supabase');
      const { data: originalTextData, error: originalTextError } = await supabase
        .from('original_text')
        .insert({ 
          user_id: '4cf39c7b-6361-4973-840c-168e129f176d', // 请替换为实际的用户ID
          title: query.trim().substring(0, 20), // 使用查询的前20个字符作为标题
          text: query.trim()
        })
        .select();

      if (originalTextError) {
        console.error('Error storing query:', originalTextError);
        throw originalTextError;
      }
      
      if (!originalTextData || originalTextData.length === 0) {
        console.error('Failed to insert original text: No data returned');
        throw new Error('Failed to insert original text');
      }
      
      const originalTextId = originalTextData[0].id;
      console.log('Query stored successfully, id:', originalTextId);

      // 2. 触发summarize API
      console.log('Calling summarize API');
      console.log('query.trim',query.trim());
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: query.trim() }),
      });

      if (!response.ok) {
        console.error('Summarize API failed:', response.statusText);
        throw new Error('Failed to summarize');
      }

      console.log('Summarize API response:');
      const result = await response.json() as ApiResponse;
      console.log('API response:', result);
      
      if (!result.success || typeof result.summary !== 'string') {
        throw new Error('Unexpected API response structure');
      }
      
      const summary = result.summary;
      console.log('Summary received:', summary);

      // 提取标题（假设摘要的第一行是标题）
      const lines = summary.split('\n');
      const title = lines[0].trim() || '总结';
      console.log('Extracted title:', title);

      // 摘要文本（除了第一行的其余部分）
      const textAi = lines.slice(1).join('\n').trim();
      console.log('Cleaned text_ai:', textAi);

      console.log('Storing response in Supabase');
      const { data: knowledgeCardData, error: storeError } = await supabase
        .from('knowledge_card')
        .insert({
          original_text_id: originalTextId,
          title: title,
          text_ai: textAi,
          text_mark: null, // 如果有标记版本的文本，可以在这里添加
          text_origin: query.trim()
        })
        .select();

      if (storeError) {
        console.error('Error storing response:', storeError);
        throw storeError;
      }

      if (knowledgeCardData && knowledgeCardData.length > 0) {
        console.log('Response stored successfully, new record id:', knowledgeCardData[0].id);
      } else {
        console.log('Response stored successfully, but no data returned');
      }

      // 4. 刷新页面或更新UI
      console.log('Refreshing page');
      router.refresh();

      // 5. 清空输入
      setQuery('');
      console.log('Input cleared');

    } catch (error) {
      console.error('Error in handleSubmit:', error);
      // 在这里处理错误，例如显示一个错误消息给用户
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query"
        className="flex-grow p-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </form>
  );
}
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { createClient } from '@supabase/supabase-js'

// // 初始化 Supabase 客户端
// const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

// interface ApiResponse {
//   data: {
//     outputs: {
//       output: string;
//     };
//   };
// }

// console.log('Supabase client initialized');

// export default function SearchBar() {
//   const [query, setQuery] = useState('');
//   const router = useRouter();

//   console.log('SearchBar component rendered');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!query.trim()) {
//       console.log('Empty query, submission aborted');
//       return;
//     }

//     console.log('Submitting query:', query.trim());

//     try {
//       // 1. 存储查询到 Supabase 的 original_text 表
//       console.log('Storing query in Supabase');
//       const { data: originalTextData, error: originalTextError } = await supabase
//         .from('original_text')
//         .insert({ 
//           user_id: '4cf39c7b-6361-4973-840c-168e129f176d', // 请替换为实际的用户ID
//           title: query.trim().substring(0, 20), // 使用查询的前20个字符作为标题
//           text: query.trim()
//         })
//         .select();

//       if (originalTextError) {
//         console.error('Error storing query:', originalTextError);
//         throw originalTextError;
//       }
      
//       if (!originalTextData || originalTextData.length === 0) {
//         console.error('Failed to insert original text: No data returned');
//         throw new Error('Failed to insert original text');
//       }
      
//       const originalTextId = originalTextData[0].id;
//       console.log('Query stored successfully, id:', originalTextId);

//       // 2. 触发summarize API
//       console.log('Calling summarize API');
//       console.log('query.trim',query.trim());
//       const response = await fetch('/api/summarize', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: query.trim() }),
//       });

//       if (!response.ok) {
//         console.error('Summarize API failed:', response.statusText);
//         throw new Error('Failed to summarize');
//       }

//       console.log('Summarize API response:');
//       const responseText = await response.text();
//       console.log('Raw API response:', responseText);
      
//       let result: ApiResponse;
//       try {
//         result = JSON.parse(responseText) as ApiResponse;
//         console.log('Parsed API response:', result);
      
//         if (!result || !result.data || !result.data.outputs || typeof result.data.outputs.output !== 'string') {
//           throw new Error('Unexpected API response structure');
//         }
      
//         const summary = result.data.outputs.output;
//         console.log('Summary received:', summary);

//         // 提取 <h1> 标签中的标题
//         const titleMatch = summary.match(/<h1>(.*?)<\/h1>/);
//         const title = titleMatch ? titleMatch[1].trim() : '总结'; // 如果没有匹配到标题，使用默认标题 '总结'
//         console.log('Extracted title:', title);

//         // 移除 HTML 标签，只保留纯文本内容
//         const textAi = summary.replace(/<[^>]*>/g, '').trim();
//         console.log('Cleaned text_ai:', textAi);

//         console.log('Storing response in Supabase');
//         const { data: knowledgeCardData, error: storeError } = await supabase
//           .from('knowledge_card')
//           .insert({
//             original_text_id: originalTextId,
//             title: title,
//             text_ai: textAi,
//             text_mark: null, // 如果有标记版本的文本，可以在这里添加
//             text_origin: query.trim()
//           })
//           .select();

//         if (storeError) {
//           console.error('Error storing response:', storeError);
//           throw storeError;
//         }

//         if (knowledgeCardData && knowledgeCardData.length > 0) {
//           console.log('Response stored successfully, new record id:', knowledgeCardData[0].id);
//         } else {
//           console.log('Response stored successfully, but no data returned');
//         }

//         // 4. 刷新页面或更新UI
//         console.log('Refreshing page');
//         router.refresh();

//         // 5. 清空输入
//         setQuery('');
//         console.log('Input cleared');

//       } catch (parseError) {
//         console.error('Failed to parse API response:', parseError);
//         console.error('Raw response:', responseText);
//         throw new Error('Invalid or unexpected JSON response from API');
//       }
//     } catch (error) {
//       console.error('Error in handleSubmit:', error);
//       // 在这里处理错误，例如显示一个错误消息给用户
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-2">
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Enter your query"
//         className="flex-grow p-2 border rounded"
//       />
//       <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
//         Search
//       </button>
//     </form>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { createClient } from '@supabase/supabase-js'

// // 初始化 Supabase 客户端
// const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )
// interface ApiResponse {
//   data: {
//     outputs: {
//       output: string;
//     };
//   };
// }
// console.log('Supabase client initialized');

// export default function SearchBar() {
//   const [query, setQuery] = useState('');
//   const router = useRouter();

//   console.log('SearchBar component rendered');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!query.trim()) {
//       console.log('Empty query, submission aborted');
//       return;
//     }

//     console.log('Submitting query:', query.trim());

//     try {
//       // 1. 存储查询到 Supabase 的 original_text 表
//       console.log('Storing query in Supabase');
//       const { data: originalTextData, error: originalTextError } = await supabase
//         .from('original_text')
//         .insert({ 
//           user_id: '4cf39c7b-6361-4973-840c-168e129f176d', // 请替换为实际的用户ID
//           title: query.trim().substring(0, 20), // 使用查询的前20个字符作为标题
//           text: query.trim()
//         })
//         .select();

//       if (originalTextError) {
//         console.error('Error storing query:', originalTextError);
//         throw originalTextError;
//       }
      
//       if (!originalTextData || originalTextData.length === 0) {
//         console.error('Failed to insert original text: No data returned');
//         throw new Error('Failed to insert original text');
//       }
      
//       const originalTextId = originalTextData[0].id;
//       console.log('Query stored successfully, id:', originalTextId);

//       // 2. 触发summarize API
//       console.log('Calling summarize API');
//       console.log('query.trim',query.trim());
//       const response = await fetch('/api/summarize', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         // body: JSON.stringify({ text: query.trim() }),
//         body: JSON.stringify({ text: query.trim() }),
//       });
//       console.log('2');
//       if (!response.ok) {
//         console.error('Summarize API failed:', response.statusText);
//         throw new Error('Failed to summarize');
//       }
//       console.log('Summarize API response:');
//       const responseText = await response.text();
//       console.log('Raw API response:', responseText);
      
//       let result: ApiResponse;
//       try {
//         result = JSON.parse(responseText) as ApiResponse;
//         console.log('Parsed API response:', result);
      
//         if (!result || !result.data || !result.data.outputs || typeof result.data.outputs.output !== 'string') {
//           throw new Error('Unexpected API response structure');
//         }
      
//         const summary = result.data.outputs.output;
//         // console.log('Summary received:', summary);
//       console.log('Summary received:', summary);

//       // 提取 <h1> 标签中的标题
//       const titleMatch = summary.match(/<h1>(.*?)<\/h1>/);
//       const title = titleMatch ? titleMatch[1].trim() : '总结'; // 如果没有匹配到标题，使用默认标题 '总结'
//       console.log('Extracted title:', title);

//       // 移除 HTML 标签，只保留纯文本内容
//       const textAi = summary.replace(/<[^>]*>/g, '').trim();
//       console.log('Cleaned text_ai:', textAi);

//       console.log('Storing response in Supabase');
//       const { data: knowledgeCardData, error: storeError } = await supabase
//         .from('knowledge_card')
//         .insert({
//           original_text_id: originalTextId,
//           title: title,
//           text_ai: textAi,
//           text_mark: null, // 如果有标记版本的文本，可以在这里添加
//           text_origin: query.trim()
//         })
//         .select();

//       if (storeError) {
//         console.error('Error storing response:', storeError);
//         throw storeError;
//       }

//       if (knowledgeCardData && knowledgeCardData.length > 0) {
//         console.log('Response stored successfully, new record id:', knowledgeCardData[0].id);
//       } else {
//         console.log('Response stored successfully, but no data returned');
//       }

//       // 4. 刷新页面或更新UI
//       console.log('Refreshing page');
//       router.refresh();

//       // 5. 清空输入
//       setQuery('');
//       console.log('Input cleared');

//     } catch (parseError) {
//       console.error('Failed to parse API response:', parseError);
//       console.error('Raw response:', responseText);
//       throw new Error('Invalid or unexpected JSON response from API');
//     };
//   // };

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-2">
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Enter your query"
//         className="flex-grow p-2 border rounded"
//       />
//       <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
//         Search
//       </button>
//     </form>
//   )
// }
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { createClient } from '@supabase/supabase-js'

// // 初始化 Supabase 客户端
// const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

// console.log('Supabase client initialized');
// // console.log('Dify API Key:', API_KEY);
// export default function SearchBar() {
//   const [query, setQuery] = useState('');
//   const router = useRouter();

//   console.log('SearchBar component rendered');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!query.trim()) {
//       console.log('Empty query, submission aborted');
//       return;
//     }

//     console.log('Submitting query:', query.trim());

//     try {
//       // 1. 存储查询到 Supabase 的 original_text 表
//       console.log('Storing query in Supabase');
//       const { data, error } = await supabase
//         .from('original_text')
//         .insert({ 
//           user_id: '4cf39c7b-6361-4973-840c-168e129f176d', // 请替换为实际的用户ID
//           title: query.trim().substring(0, 20), // 使用查询的前20个字符作为标题
//           text: query.trim()
//         })
//         .select();

//       if (error) {
//         console.error('Error storing query:', error);
//         throw error;
//       }
//       console.log('Query stored successfully:', data);

//       // 2. 触发summarize API
//       console.log('Calling summarize API');
//       const response = await fetch('/api/summarize', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: query.trim() }),
//       });

//       if (!response.ok) {
//         console.error('Summarize API failed:', response.statusText);
//         throw new Error('Failed to summarize');
//       }

//       const result = await response.json();
//       console.log('Summarize API response:', result);

//       // 3. 存储响应到Supabase（这部分可能需要根据你的需求进行调整）
//       // console.log('Storing response in Supabase');
//       // const { error: storeError } = await supabase
//       //   .from('responses')
//       //   .insert({ query: query.trim(), response: result.summary });

//       // if (storeError) {
//       //   console.error('Error storing response:', storeError);
//       //   throw storeError;
//       // }
//       // console.log('Response stored successfully');
//       // 3. 存储响应到Supabase的knowledge_card表
//       const summary = result.data.outputs.output;

//       // 提取 <h1> 标签中的标题
//       const titleMatch = summary.match(/<h1>(.*?)<\/h1>/);
//       const title = titleMatch ? titleMatch[1].trim() : '总结'; // 如果没有匹配到标题，使用默认标题 '总结'

//       // 移除 HTML 标签，只保留纯文本内容
//       const textAi = summary.replace(/<[^>]*>/g, '').trim();

//       console.log('Storing response in Supabase');
//       const { data: knowledgeCardData, error: storeError } = await supabase
//         .from('knowledge_card')
//         .insert({
//           original_text_id: originalTextId,
//           title: title,
//           text_ai: textAi,
//           text_mark: null, // 如果有标记版本的文本，可以在这里添加
//           text_origin: query.trim()
//         })
//         .select();

//       if (storeError) {
//         console.error('Error storing response:', storeError);
//         throw storeError;
//       }

//       if (knowledgeCardData && knowledgeCardData.length > 0) {
//         console.log('Response stored successfully, new record id:', knowledgeCardData[0].id);
//       } else {
//         console.log('Response stored successfully, but no data returned');
//       }

//       // 4. 刷新页面或更新UI
//       console.log('Refreshing page');
//       router.refresh();

//       // 5. 清空输入
//       setQuery('');
//       console.log('Input cleared');

//     } catch (error) {
//       console.error('Error in handleSubmit:', error);
//       // 在这里处理错误，例如显示一个错误消息给用户
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-2">
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Enter your query"
//         className="flex-grow p-2 border rounded"
//       />
//       <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
//         Search
//       </button>
//     </form>
//   );
// }