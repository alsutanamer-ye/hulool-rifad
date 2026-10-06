import type { Automation } from './types.js';

export class AutomationManager {
  private timers = new Map<string, NodeJS.Timeout>();
  start(automation: Automation): this {
    this.stop(automation.name);
    const run = async () => { try { await automation.run(); } catch (error) { console.error(`[automation:${automation.name}]`, error); } };
    if (automation.immediate) void run();
    this.timers.set(automation.name, setInterval(run, automation.everyMs));
    return this;
  }
  stop(name: string): boolean { const timer = this.timers.get(name); if (!timer) return false; clearInterval(timer); this.timers.delete(name); return true; }
  stopAll(): void { for (const name of this.timers.keys()) this.stop(name); }
  running(): string[] { return [...this.timers.keys()]; }
}
