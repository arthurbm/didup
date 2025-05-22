import { streamText, type CoreMessage } from 'ai';
import { openai } from '@ai-sdk/openai';
import { env } from '@/env';
import { type Task } from '@doist/todoist-api-typescript';

interface SummarizeRequestBody {
  tasks: Task[] | null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as SummarizeRequestBody;
    const { tasks } = body;

    if (!tasks || tasks.length === 0) {
      return new Response('No tasks provided for summary.', { status: 400 });
    }

    if (!env.OPENAI_API_KEY) {
      console.error('[AI Summary API Error] OpenAI API Key not configured');
      return new Response('AI configuration error. Critical environment variable missing.', { status: 500 });
    }

    const taskDetails = tasks.map(task => {
      let detail = `- ${task.content}`;
      if (task.due) {
        detail += ` (Due: ${task.due.string})`;
      }
      if (task.description) {
        detail += ` | Description: ${task.description.substring(0, 100)}${task.description.length > 100 ? '...' : ''}`;
      }
      if (task.labels && task.labels.length > 0) {
        detail += ` | Labels: ${task.labels.join(', ')}`;
      }
      return detail;
    }).join('\n');

    const systemMessage = "You are a helpful assistant. Your goal is to provide a concise and actionable summary of Todoist tasks.";
    const userMessage =  `Based on the following Todoist tasks, provide a summary. Highlight key activities, priorities (if discernible), and any upcoming deadlines. Aim for clarity and usefulness.\n\nTasks:\n${taskDetails}\n\nSummary:`;

    const messages: CoreMessage[] = [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage },
    ];

    const result = streamText({
      model: openai('gpt-4.1'),
      messages: messages,
      // maxTokens: 250,
      // temperature: 0.4,
    });

    return result.toDataStreamResponse();

  } catch (error) {
    console.error('[AI Summary API Error]', error);
    if (error instanceof Error && error.name === 'AbortError') {
      return new Response('Request aborted by client', { status: 499 });
    }
    let errorMessage = 'An error occurred while generating the AI summary.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return new Response(JSON.stringify({ error: errorMessage }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' }
    });
  }
} 