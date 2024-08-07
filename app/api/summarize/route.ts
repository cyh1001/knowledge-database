// /app/api/summarize/route.ts
//  这是是使用dify.ai，做文本总结
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const DIFY_API_KEY = process.env.DIFY_API_KEY;
const BASE_URL = 'https://api.dify.ai/v1';

export async function POST(request: NextRequest) {
  console.log('POST request received at /api/summarize');
  
  try {
    const { text } = await request.json();
    console.log('Received text:', text);

    if (!text) {
      console.log('Error: 文本是必需的');
      return NextResponse.json({ error: '文本是必需的' }, { status: 400 });
    }

    console.log('Sending request to Dify API');
    const response = await axios.post(`${BASE_URL}/workflows/run`, {
      inputs: { input: text, summaryStyle:'概述'},
      response_mode: 'blocking',
      user: 'abc-123'
    }, {
      headers: {
        'Authorization': `Bearer ${DIFY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Received response from Dify API', response.data);
    
    // 从正确的位置提取摘要文本
    const summary = response.data.data.outputs.output;
    console.log('Extracted summary:', summary);

    // 返回格式化的响应
    const formattedResponse = {
      success: true,
      summary: summary,
      timestamp: new Date().toISOString(),
    };
    console.log('Sending formatted response:', formattedResponse);
    return NextResponse.json(formattedResponse, { status: 200 });

  } catch (error) {
    console.error('错误:', error);
    
    // 更详细的错误处理
    if (axios.isAxiosError(error)) {
      // 处理 Axios 错误
      const statusCode = error.response?.status || 500;
      const errorMessage = error.response?.data?.error || '请求 Dify API 时发生错误';
      console.log(`Axios error: ${statusCode} - ${errorMessage}`);
      return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }

    // 处理其他类型的错误
    console.log('Internal server error');
    return NextResponse.json({ error: '内部服务器错误' }, { status: 500 });
  }
}
// export async function POST(request: NextRequest) {
//   try {
//     // console.log('收到POST请求', request);
//     const { text } = await request.json();

//     console.log('收到要summarize的文本:', text);

//     if (!text) {
//       console.error('错误：文本是必需的');
//       return NextResponse.json({ error: '文本是必需的' }, { status: 400 });
//     }

//     console.log('正在发送请求到Dify API...');
//     const response = await axios.post(`${BASE_URL}/workflows/run`, {
//       inputs: { input: text, summaryStyle:'概述'},
//       response_mode: 'blocking',
//       user: 'abc-123'  // 使用API格式中提供的用户标识符
//     }, {
//       headers: {
//         'Authorization': `Bearer ${DIFY_API_KEY}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     console.log('收到来自Dify API的响应:', response.data);

//     // 由于响应模式改为 'streaming'，我们需要修改响应处理逻辑
//     return new NextResponse(response.data, {
//       headers: {
//         // 'Content-Type': 'text/event-stream',
//         // 'Cache-Control': 'no-cache',
//         // 'Connection': 'keep-alive'
//         'Authorization': `Bearer ${DIFY_API_KEY}`,
//         'Content-Type': 'application/json',
//       }
//     });
//     console.log('响应已发送');
//   } catch (error) {
//     console.error('错误:', error);
//     return NextResponse.json({ error: '内部服务器错误' }, { status: 500 });
//   }
// }