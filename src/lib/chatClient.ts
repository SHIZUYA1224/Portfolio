import axios, { AxiosError } from 'axios';
import fs from 'fs/promises';
import path from 'path';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ApiChatMessage = ChatMessage | { role: 'system'; content: string };

const API_URL = 'https://api.x.ai/v1/chat/completions';
const MODEL = 'grok-4-1-fast-reasoning';
const KNOWLEDGE_PATH = path.join(
  process.cwd(),
  'src/app/api/aichat/knowledge.txt'
);

async function loadKnowledge(): Promise<string> {
  try {
    return await fs.readFile(KNOWLEDGE_PATH, 'utf-8');
  } catch {
    return '';
  }
}

export async function getAiReply(messages: ChatMessage[]): Promise<string> {
  if (!process.env.GROK_API_KEY) {
    throw new Error('Server configuration error');
  }

  const knowledge = await loadKnowledge();
  const systemMessage: ApiChatMessage | null = knowledge
    ? {
        role: 'system',
        content:
          'あなたはポートフォリオの所有者です。以下の知識に基づいて質問に答えてください:\n' +
          knowledge,
      }
    : null;

  const fullMessages: ApiChatMessage[] = systemMessage
    ? [systemMessage, ...messages]
    : messages;

  try {
    const response = await axios.post(
      API_URL,
      {
        model: MODEL,
        messages: fullMessages,
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROK_API_KEY}`,
        },
        timeout: 20_000,
      }
    );

    const reply = response.data?.choices?.[0]?.message?.content;
    if (!reply) {
      throw new Error('Empty AI response');
    }
    return reply;
  } catch (error) {
    if (error instanceof AxiosError) {
      const upstreamMessage =
        error.response?.data?.error?.message ||
        error.response?.data ||
        error.message;
      console.error('xAI upstream error:', upstreamMessage);
      throw new Error('AI service unavailable');
    }
    if (error instanceof Error) {
      console.error('AI request failed:', error.message);
      throw new Error('AI service unavailable');
    }
    console.error('Unknown AI request error');
    throw new Error('AI service unavailable');
  }
}
