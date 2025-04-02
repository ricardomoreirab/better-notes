import { NoteOrganizer, NoteCategory, OrganizedNote } from '../../domain/ports/noteOrganizer';
import OpenAI from 'openai';

const PARA_CATEGORIES: NoteCategory[] = [
  {
    name: 'Projects',
    description: 'Short-term efforts with clear goals and deadlines'
  },
  {
    name: 'Areas',
    description: 'Long-term responsibilities and ongoing interests'
  },
  {
    name: 'Resources',
    description: 'Topics or themes that may be useful in the future'
  },
  {
    name: 'Archives',
    description: 'Inactive items that may be useful later'
  }
];

export class LLMNoteOrganizer implements NoteOrganizer {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async organizeNote(filePath: string, content: string): Promise<OrganizedNote> {
    const prompt = this.createPrompt(content);
    const response = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a note organization expert using the PARA method. Analyze the note content and categorize it into one of the PARA categories. Provide your reasoning and confidence level."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const llmResponse = response.choices[0].message.content;
    if (!llmResponse) {
      throw new Error('No response content from LLM');
    }

    const result = this.parseLLMResponse(llmResponse);
    return {
      originalPath: filePath,
      content,
      category: result.category,
      confidence: result.confidence,
      reasoning: result.reasoning
    };
  }

  private createPrompt(content: string): string {
    return `Please analyze this note and categorize it according to the PARA method:

${content}

Categories:
${PARA_CATEGORIES.map(cat => `- ${cat.name}: ${cat.description}`).join('\n')}

Please provide your response in the following JSON format:
{
  "category": "Category name",
  "confidence": 0.0-1.0,
  "reasoning": "Your explanation"
}`;
  }

  private parseLLMResponse(response: string): { category: NoteCategory; confidence: number; reasoning: string } {
    try {
      const result = JSON.parse(response);
      const category = PARA_CATEGORIES.find(cat => cat.name === result.category);
      
      if (!category) {
        throw new Error(`Invalid category: ${result.category}`);
      }

      return {
        category,
        confidence: result.confidence,
        reasoning: result.reasoning
      };
    } catch (error) {
      console.error('Error parsing LLM response:', error);
      throw new Error('Failed to parse LLM response');
    }
  }
} 