// /app/api/summarize/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.DIFY_API_KEY;
const BASE_URL = 'https://api.dify.ai/v1';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const response = await axios.post(`${BASE_URL}/workflows/run`, {
      inputs: { text_to_summarize: text },
      response_mode: 'blocking',
      user: 'user123'  // 使用一个唯一的用户标识符
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.data.status === 'succeeded') {
      const summary = response.data.data.outputs.summary;
      return NextResponse.json({ summary });
    } else {
      return NextResponse.json({ error: 'Summarization failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}