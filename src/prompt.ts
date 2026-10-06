import type { PromptTemplate } from './types.js';

export class PromptRegistry {
  private readonly prompts = new Map<string, PromptTemplate>();
  register(prompt: PromptTemplate): this { this.prompts.set(prompt.name, prompt); return this; }
  get(name: string): PromptTemplate { const p = this.prompts.get(name); if (!p) throw new Error(`Prompt not found: ${name}`); return p; }
  render(name: string, variables: Record<string, unknown> = {}): string {
    return this.get(name).template.replace(/{{\s*([\w.-]+)\s*}}/g, (_, key: string) => {
      const value = key.split('.').reduce<unknown>((v, k) => (v && typeof v === 'object' ? (v as Record<string, unknown>)[k] : undefined), variables);
      return value === undefined || value === null ? '' : String(value);
    });
  }
  list(): PromptTemplate[] { return [...this.prompts.values()]; }
}
