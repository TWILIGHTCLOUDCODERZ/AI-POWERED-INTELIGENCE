import { AzureOpenAI } from "openai";
import { config } from '../config';

export class OpenAIClient {
  private static instance: OpenAIClient;
  private client: AzureOpenAI;
  private apiKey: string;
  private endpoint: string;

  private constructor() {
    this.apiKey = config.openai.apiKey?.trim();
    this.endpoint = config.openai.endpoint?.trim();

    if (!this.apiKey || !this.endpoint) {
      console.error('OpenAI credentials are missing:', { endpoint: this.endpoint, apiKey: this.apiKey });
      throw new Error('OpenAI credentials are missing');
    }

    this.client = new AzureOpenAI({
      apiKey: this.apiKey,
      endpoint: this.endpoint,
      apiVersion: "2024-02-15-preview",
      deployment: "gpt-4",
      dangerouslyAllowBrowser: true
    });
  }

  public static getInstance(): OpenAIClient {
    if (!OpenAIClient.instance) {
      OpenAIClient.instance = new OpenAIClient();
    }
    return OpenAIClient.instance;
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800,
        temperature: 0.7,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: null
      });

      if (!response.choices[0]?.message?.content) {
        throw new Error('Empty response from API');
      }
      return response.choices[0].message.content;
    } catch (error: any) {
      if (error.message?.includes('quota')) {
        return `**API Quota Exceeded**\n\nPlease wait a moment before trying again.`;
      }
      if (error.message?.includes('content filter')) {
        return `**Content Filtered**\n\nThe request was blocked by content filters. Please try rephrasing your request.`;
      }
      throw error;
    }
  }
}

export const openAIClient = OpenAIClient.getInstance();