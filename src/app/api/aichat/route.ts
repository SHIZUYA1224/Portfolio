import { NextRequest, NextResponse } from 'next/server';
import { getAiReply } from '@/lib/chatClient';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const reply = await getAiReply(messages);
    return NextResponse.json({ reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('🚨 xAI API Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
