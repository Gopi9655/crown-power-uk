# Crown Power Energy Systems

Production website for Crown Power Energy Systems Ltd, built with Next.js 16, React, TypeScript and Tailwind CSS. The application uses the App Router, optimized local imagery, static content data and a progressively enhanced contact form.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks and production build

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

## Contact form environment variables

Copy `.env.example` to `.env.local` to enable email delivery through Resend:

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL=
CONTACT_TO_EMAIL=info@crownpoweruk.co.uk
```

If Resend is not configured, the site remains fully buildable and the contact form directs visitors to `info@crownpoweruk.co.uk`; it never reports a false submission success.

## Content and assets

- Shared navigation, services, offices, announcements and page content: `src/data/site.ts`
- Team members: `src/data/team.ts`
- Production imagery: `public/images/`
- Reference prototype material: `reference/claude-design/` (not loaded by the application)

## Vercel deployment

Import this repository into Vercel, add the optional environment variables above, and deploy with the default Next.js settings. No database or CMS is required.
