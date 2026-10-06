import test from 'node:test';
import assert from 'node:assert/strict';
import { AgentRouter, PromptRegistry, WorkflowRunner } from '../dist/index.js';

test('router dispatches commands before routes', async () => {
  const router = new AgentRouter().command({ name: 'help', aliases: ['h'], handler: () => ({ output: 'ok' }) });
  assert.equal((await router.dispatch('/h')).output, 'ok');
});

test('prompt registry renders variables', () => {
  const prompts = new PromptRegistry().register({ name: 'x', template: 'Hello {{user.name}}' });
  assert.equal(prompts.render('x', { user: { name: 'Rifad' } }), 'Hello Rifad');
});

test('workflow carries state between steps', async () => {
  const runner = new WorkflowRunner();
  const result = await runner.run({ name: 'x', steps: [
    { id: 'one', run: () => ({ output: 'a', state: { n: 1 } }) },
    { id: 'two', run: ({ state }) => ({ output: String(state.n + 1) }) }
  ] }, { input: '', metadata: {}, state: {} });
  assert.equal(result.output, '2');
});
