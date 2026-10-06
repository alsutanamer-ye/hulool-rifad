import type { AgentContext, AgentResult, Workflow } from './types.js';

export class WorkflowRunner {
  async run(workflow: Workflow, ctx: AgentContext): Promise<AgentResult> {
    let current: AgentContext = { ...ctx, state: { ...ctx.state } };
    const outputs: Record<string, string> = {};
    for (const step of workflow.steps) {
      if (step.condition && !step.condition(current)) continue;
      const attempts = (step.retry ?? 0) + 1;
      for (let attempt = 0; attempt < attempts; attempt++) {
        try {
          const result = await step.run(current);
          outputs[step.id] = result.output;
          current = { ...current, state: { ...current.state, ...(result.state ?? {}), [`${step.id}.output`]: result.output } };
          break;
        } catch (error) {
          if (attempt + 1 === attempts) throw error;
        }
      }
    }
    const lastId = workflow.steps.at(-1)?.id ?? '';
    return { output: outputs[lastId] ?? '', state: current.state, metadata: { workflow: workflow.name, outputs } };
  }
}
