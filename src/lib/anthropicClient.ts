import { Client } from '@anthropic-ai/sdk';

export const anthropic = new Client(process.env.ANTHROPIC_API_KEY!);
