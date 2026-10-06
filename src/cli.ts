#!/usr/bin/env node
import { AgentRouter } from './router.js';

const [, , command, ...args] = process.argv;
if (command === 'run') {
  const input = args.join(' ');
  const router = new AgentRouter().command({ name: 'help', aliases: ['h'], description: 'Show help', handler: () => ({ output: 'hulool-rifad: register your agent commands, routes, skills and workflows.' }) });
  const result = await router.dispatch(input || '/help');
  console.log(result.output);
} else if (command === 'version') console.log('0.1.0');
else console.log('Usage: hulool-rifad run <input> | version');
