# hulool-rifad

مكتبة TypeScript لبناء طبقة تشغيل موحّدة لوكلاء الذكاء الاصطناعي: **routing، commands، skills، prompts، workflows، automation**.

## التثبيت

```bash
npm install hulool-rifad
```

## مثال سريع

```ts
import { AgentRouter, PromptRegistry, SkillRegistry, routeByKeywords } from 'hulool-rifad';

const prompts = new PromptRegistry().register({ name: 'welcome', template: 'مرحبًا {{name}}، كيف أساعدك؟' });
const skills = new SkillRegistry().register({
  name: 'summarize', tags: ['text'], instructions: 'Summarize text',
  run: ({ input }) => ({ output: `Summary: ${input.slice(0, 80)}` })
});
const router = new AgentRouter()
  .command({ name: 'help', aliases: ['مساعدة'], handler: () => ({ output: 'Available commands: help' }) })
  .route(routeByKeywords(['لخص', 'summarize'], ({ input }) => skills.run('summarize', { input, metadata: {}, state: {} }), 'summarizer'));

console.log(prompts.render('welcome', { name: 'Rifad' }));
console.log(await router.dispatch('لخص هذا النص الطويل'));
```

## الوحدات

- `AgentRouter`: أوامر exact/aliases ثم routes مرتبة حسب الأولوية.
- `PromptRegistry`: قوالب `{{variable}}` مع دعم المسارات مثل `{{user.name}}`.
- `SkillRegistry`: تسجيل، اكتشاف، وتشغيل المهارات.
- `WorkflowRunner`: تنفيذ خطوات متسلسلة، شروط، state، وإعادة المحاولة.
- `AutomationManager`: مؤقتات دورية قابلة للإيقاف والإدارة.

## الحالة الحالية

هذه نسخة MVP قابلة للتوسعة. المرحلة التالية المقترحة: adapters لمزوّدات النماذج (OpenAI-compatible/Anthropic/local)، persistence للـ state، event bus، observability، وملفات تعريف YAML للـ skills/workflows.

## موقع التصفح عبر GitHub Pages

يوجد موقع عربي ثابت داخل `docs/` لتصفح الموجهات، الأوامر، المسارات، المهارات، prompts، workflows والأتمتة، مع بحث وتصنيف متجاوب.

الرابط المتوقع بعد تفعيل Pages:

<https://alsutanamer-ye.github.io/hulool-rifad/>

النشر مهيأ تلقائيًا عبر `.github/workflows/pages.yml`. للتفعيل لأول مرة من GitHub:

1. افتح **Settings → Pages** في المستودع.
2. اختر **Source: GitHub Actions**.
3. أعد تشغيل workflow باسم **Deploy hulool-rifad site to GitHub Pages** أو ادفع commit جديدًا إلى `main`.
