import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // 知識ファイルを読み込み
    const knowledgePath = path.join(
      process.cwd(),
      'src/app/api/aichat/knowledge.txt'
    );
    const knowledge = fs.readFileSync(knowledgePath, 'utf-8');

    // systemメッセージとして追加
    const systemMessage = {
      role: 'system',
      content: `あなたはポートフォリオの所有者です。以下の知識に基づいて質問に答えてください:\n${knowledge}`,
    };
    const fullMessages = [systemMessage, ...messages];

    const response = await axios.post(
      'https://api.x.ai/v1/chat/completions',
      {
        model: 'grok-4-1-fast-reasoning', // 2025年11月時点で最強＆高速
        messages: fullMessages, // 会話履歴まるごと転送
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROK_API_KEY}`,
        },
      }
    );
    const AiResponse = response.data.choices[0].message.content;
    return NextResponse.json({ replay: AiResponse });
  } catch (error) {
    let errorMessage = 'Unknown error';
    if (error instanceof AxiosError) {
      errorMessage =
        error.response?.data?.error?.message ||
        error.response?.data ||
        error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('🚨 xAI API Error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
