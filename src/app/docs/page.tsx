const sections = [
  {
    title: 'Editing',
    body: 'Write Markdown in the left editor. The preview updates immediately on the right side, or below the editor on small screens.'
  },
  {
    title: 'Render Modes',
    body: 'Long image renders all content as one poster. Automatic pagination splits by first-level headings, then falls back to ten-line chunks. Manual pagination uses a standalone --- separator.'
  },
  {
    title: 'Export',
    body: 'Hover a preview page to copy or download it. In paginated modes, the first page also offers download-all. Remote images must allow cross-origin access for browser export to succeed.'
  },
  {
    title: 'Themes',
    body: 'Use the toolbar to switch poster theme, fixed aspect ratio, and background opacity. Aspect ratio controls are available in paginated modes.'
  },
  {
    title: 'Troubleshooting',
    body: 'If export fails, first check whether the Markdown contains remote images. Browser canvas export requires those images to send permissive CORS headers.'
  },
  {
    title: 'Deployment',
    body: 'The app is a standard Next.js project. Run pnpm build before deploying, then deploy the repository to Vercel or any host that supports Next.js.'
  }
];

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-wide text-indigo-700">Documentation</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-950">md2img usage guide</h1>
        <p className="mt-4 text-lg text-gray-600">
          md2img turns Markdown into poster-style PNG images directly in the browser.
        </p>
      </div>

      <div className="grid gap-4">
        {sections.map(section => (
          <section key={section.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-950">{section.title}</h2>
            <p className="mt-3 text-gray-600">{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
