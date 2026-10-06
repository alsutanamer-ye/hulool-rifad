import type { AgentContext, AgentResult, Skill } from './types.js';

export class SkillRegistry {
  private skills = new Map<string, Skill>();
  register(skill: Skill): this { this.skills.set(skill.name, skill); return this; }
  get(name: string): Skill { const s = this.skills.get(name); if (!s) throw new Error(`Skill not found: ${name}`); return s; }
  async run(name: string, ctx: AgentContext): Promise<AgentResult> { return this.get(name).run(ctx); }
  find(query: string): Skill[] { const q = query.toLowerCase(); return [...this.skills.values()].filter(s => `${s.name} ${s.description ?? ''} ${(s.tags ?? []).join(' ')}`.toLowerCase().includes(q)); }
  list(): Skill[] { return [...this.skills.values()]; }
}
