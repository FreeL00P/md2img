import { describe, expect, it } from 'vitest';
import { getAspectRatioClass, splitMarkdown } from './poster-options';

describe('splitMarkdown', () => {
  it('returns one page in long mode', () => {
    expect(splitMarkdown('# Title\ncontent', 'long')).toEqual(['# Title\ncontent']);
  });

  it('returns no pages for empty long mode content', () => {
    expect(splitMarkdown('   ', 'long')).toEqual([]);
  });

  it('splits manual pages by standalone separators', () => {
    expect(splitMarkdown('first\n---\nsecond\n  ---  \nthird', 'manual-pagination')).toEqual([
      'first',
      'second',
      'third'
    ]);
  });

  it('splits automatic pages by first-level headings', () => {
    expect(splitMarkdown('# One\na\n# Two\nb', 'auto-pagination')).toEqual([
      '# One\na',
      '# Two\nb'
    ]);
  });

  it('falls back to ten-line chunks without headings', () => {
    const markdown = Array.from({ length: 12 }, (_, index) => `line ${index + 1}`).join('\n');

    expect(splitMarkdown(markdown, 'auto-pagination')).toEqual([
      Array.from({ length: 10 }, (_, index) => `line ${index + 1}`).join('\n'),
      'line 11\nline 12'
    ]);
  });
});

describe('getAspectRatioClass', () => {
  it('returns Tailwind aspect ratio classes', () => {
    expect(getAspectRatioClass('4:3')).toBe('aspect-[4/3]');
    expect(getAspectRatioClass('16:9')).toBe('aspect-[16/9]');
    expect(getAspectRatioClass('auto')).toBe('');
  });
});
