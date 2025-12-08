import axios, { AxiosError } from 'axios';
import fs from 'fs/promises';
import path from 'path';

type ChatMessage = { role: string; content: string };

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
    throw new Error('GROK_API_KEY is not set');
  }

  const knowledge = await loadKnowledge();
  const systemMessage = knowledge
    ? {
        role: 'system',
        content:
          'あなたはポートフォリオの所有者です。以下の知識に基づいて質問に答えてください:\n' +
          knowledge,
      }
    : null;

  const fullMessages = systemMessage
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
      }
    );

    const reply = response.data?.choices?.[0]?.message?.content;
    if (!reply) {
      throw new Error('AIからの返信が空でした');
    }
    return reply;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message =
        error.response?.data?.error?.message ||
        error.response?.data ||
        error.message;
      throw new Error(message);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('不明なエラーが発生しました');
  }
}
