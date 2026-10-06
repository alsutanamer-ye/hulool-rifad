export interface AgentContext {
  input: string;
  sessionId?: string;
  metadata: Record<string, unknown>;
  state: Record<string, unknown>;
  signal?: AbortSignal;
}
export interface AgentResult { output: string; state?: Record<string, unknown>; metadata?: Record<string, unknown>; }
export type AgentHandler = (ctx: AgentContext) => Promise<AgentResult> | AgentResult;
export interface Route { name: string; description?: string; match: (ctx: AgentContext) => boolean; handler: AgentHandler; priority?: number; }
export interface Command { name: string; description?: string; aliases?: string[]; handler: AgentHandler; }
export interface Skill { name: string; description?: string; tags?: string[]; instructions: string; run: AgentHandler; }
export interface PromptTemplate { name: string; template: string; variables?: string[]; }
export interface WorkflowStep { id: string; run: AgentHandler; condition?: (ctx: AgentContext) => boolean; retry?: number; }
export interface Workflow { name: string; description?: string; steps: WorkflowStep[]; }
export interface Automation { name: string; everyMs: number; run: () => Promise<void> | void; immediate?: boolean; }
