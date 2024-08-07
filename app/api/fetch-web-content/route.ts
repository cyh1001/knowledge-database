import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

// 用于验证 URL 的辅助函数
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    console.warn(`Invalid URL: ${url}`, error);
    return false;
  }
}

export async function POST(request: Request) {
  console.log('POST request received');
  try {
    // 解析请求体
    const { url } = await request.json();
    console.log(`Received URL: ${url}`);

    // 验证 URL
    if (!url || !isValidUrl(url)) {
      console.error('Invalid URL provided:', url);
      return NextResponse.json({ error: 'Invalid URL provided' }, { status: 400 });
    }

    console.log('Sending HTTP request to:', url);
    // 发送 HTTP 请求获取网页内容
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    console.log('Response received, status:', response.status);
    const html = response.data;

    // 使用 cheerio 解析 HTML 并提取文本内容
    console.log('Parsing HTML with cheerio');
    const $ = cheerio.load(html);

    // 移除脚本和样式标签
    $('script, style').remove();

    // 提取主要文本内容
    let text = $('body').text().trim();

    // 简单的文本清理
    text = text.replace(/\s+/g, ' ');
    console.log('Cleaned text:', text);

    console.log(`Extracted text length: ${text.length} characters`);

    // 返回结果
    console.log('Returning parsed content');
    return NextResponse.json({ content: text });

  } catch (error) {
    console.error('Error fetching web content:', error);
    
    // 错误处理
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Axios error: ${error.response.status}`, error.response.data);
      return NextResponse.json(
        { error: `Error fetching content: ${error.response.status}` },
        { status: error.response.status }
      );
    }

    console.error('Unknown error occurred', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the web content' },
      { status: 500 }
    );
  }
}

// 可选：如果你想限制只允许 POST 请求
export const GET = () => {
  console.log('GET request received (not allowed)');
  return new NextResponse('Method not allowed', { status: 405 });
};
export const PUT = () => {
  console.log('PUT request received (not allowed)');
  return new NextResponse('Method not allowed', { status: 405 });
};
export const DELETE = () => {
  console.log('DELETE request received (not allowed)');
  return new NextResponse('Method not allowed', { status: 405 });
};