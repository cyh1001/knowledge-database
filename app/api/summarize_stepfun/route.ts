// /app/api/summarize_stepfun
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.STEPFUN_API_KEY,
  baseURL: "https://api.stepfun.com/v1"
});

type ContentItem = 
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

export async function POST(request: NextRequest) {
  try {
    const { content, contentType, fileUrl } = await request.json();

    // 准备消息
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: "你是一个AI助手，能够根据用户提供的内容生成摘要。请简明扼要地总结主要内容。"
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "请总结以下内容："
          }
        ] as ContentItem[]
      }
    ];

    // 根据内容类型添加适当的消息
    if (contentType === 'text') {
      (messages[1].content as ContentItem[]).push({
        type: "text",
        text: content
      });
    } else if (contentType === 'image') {
      (messages[1].content as ContentItem[]).push({
        type: "image_url",
        image_url: {
          url: fileUrl
        }
      });
    } else if (contentType === 'url') {
      (messages[1].content as ContentItem[]).push({
        type: "text",
        text: `请总结这个网页的内容：${content}`
      });
    }

    const completion = await openai.chat.completions.create({
      model: "step-1v-8k", // 使用适当的模型
      messages: messages,
      max_tokens: 150 // 限制摘要长度
    });

    const summary = completion.choices[0].message.content || '无法生成摘要';
    const title = summary.split('\n')[0]; // 使用摘要的第一行作为标题

    return NextResponse.json({
      success: true,
      summary: summary,
      title: title,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error in summarize_stepfun:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}