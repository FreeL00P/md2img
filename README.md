# md2img

md2img is a browser-based Markdown to poster image editor. It combines a Monaco Markdown editor, live poster preview, theme controls, pagination modes, and PNG copy/download workflows for quickly turning Markdown content into shareable images.

This project is modified from [gcui-art/markdown-to-image](https://github.com/gcui-art/markdown-to-image). The original work is licensed under the Apache License 2.0.

## Features

- Live Markdown editing with Monaco Editor
- Real-time poster preview powered by `markdown-to-image`
- Long image, automatic pagination, and manual pagination modes
- Multiple poster themes with background opacity control
- Fixed aspect ratio options for paginated images
- Copy the current poster as a PNG image
- Download a single poster or all paginated posters as PNG files
- Chinese and English UI switching
- Docs page with usage and export notes
- Unit tests for pagination and aspect ratio behavior

## Tech Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Monaco Editor
- html2canvas
- Vitest
- Playwright configuration for browser tests

## Quick Start

This repository uses `pnpm`. If `pnpm` is not installed globally, use Corepack:

```bash
corepack pnpm install
corepack pnpm dev --hostname 127.0.0.1
```

Open the app in your browser:

```text
http://127.0.0.1:3000
```

If you already have `pnpm` available globally, these commands also work:

```bash
pnpm install
pnpm dev
```

## Usage

1. Write Markdown in the editor panel.
2. Pick a poster theme from the toolbar.
3. Choose a render mode.
4. Adjust background opacity if needed.
5. Hover the preview card to copy or download the rendered PNG.

## Render Modes

- Long image: renders all Markdown content as one continuous poster.
- Automatic pagination: splits content by first-level headings. If there are no first-level headings, it falls back to chunks of 10 lines.
- Manual pagination: splits pages with a standalone `---` separator.

Example manual pagination:

```markdown
# Page One

Content for the first image.

---

# Page Two

Content for the second image.
```

## Export Notes

Image export runs in the browser with `html2canvas`. Remote images must allow cross-origin access, otherwise the browser may block copy/download. For reliable exports, use local images, same-origin images, or remote images with permissive CORS headers.

Clipboard image copy also depends on browser support for `navigator.clipboard.write` and `ClipboardItem`.

## Scripts

```bash
corepack pnpm dev      # start the development server
corepack pnpm test     # run unit tests
corepack pnpm lint     # run Next.js linting
corepack pnpm build    # build the production app
corepack pnpm start    # start the built app
```

Browser tests are configured with Playwright:

```bash
corepack pnpm test:e2e
```

Playwright requires browser binaries. Install Chromium before running E2E tests if needed:

```bash
corepack pnpm exec playwright install chromium
```

## Project Structure

```text
src/app              Next.js routes and app layout
src/components       UI and editor components
src/lib              shared editor, export, language, and poster utilities
tests/e2e            Playwright browser tests
```

## Known Limitations

- Remote images can fail during export if the image server does not allow CORS.
- Browser clipboard image copy may not work in every browser or insecure context.
- Automatic pagination is rule-based and does not currently measure rendered content height.
- Playwright browser binaries are not committed and must be installed locally when running E2E tests.

## License

Apache License 2.0. See [LICENSE](./LICENSE).
