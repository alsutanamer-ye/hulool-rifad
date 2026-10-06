import type { AgentContext, AgentHandler, AgentResult, Command, Route } from './types.js';

export class AgentRouter {
  private routes: Route[] = [];
  private commands = new Map<string, Command>();
  route(route: Route): this { this.routes.push(route); this.routes.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0)); return this; }
  command(command: Command): this { this.commands.set(command.name, command); for (const alias of command.aliases ?? []) this.commands.set(alias, command); return this; }
  async dispatch(input: string, options: Partial<Omit<AgentContext, 'input'>> = {}): Promise<AgentResult> {
    const ctx: AgentContext = { input, metadata: {}, state: {}, ...options };
    const commandName = input.trim().split(/\s+/)[0]?.replace(/^\//, '');
    const command = commandName ? this.commands.get(commandName) : undefined;
    if (command) return command.handler(ctx);
    const route = this.routes.find((r) => r.match(ctx));
    if (!route) throw new Error(`No route matched input: ${input}`);
    return route.handler(ctx);
  }
  listCommands(): Command[] { return [...new Set(this.commands.values())]; }
}

export const routeByKeywords = (keywords: string[], handler: AgentHandler, name = keywords.join('-')): Route => ({
  name, handler, priority: keywords.length, match: ({ input }) => keywords.some((word) => input.toLowerCase().includes(word.toLowerCase()))
});
