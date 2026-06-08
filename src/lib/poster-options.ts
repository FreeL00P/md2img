export type ThemeType = 'blue' | 'pink' | 'purple' | 'green' | 'yellow' | 'gray' | 'red' | 'indigo' | 'SpringGradientWave';

export interface ThemeConfig {
  value: string;
  label: string;
  background: string;
  markdownTheme: ThemeType;
}

export const themes = [
  {
    value: 'SpringGradientWave',
    label: 'SpringGradientWave',
    background: 'bg-gradient-to-br from-green-50 to-blue-50',
    markdownTheme: 'SpringGradientWave'
  },
  {
    value: 'SummerSunset',
    label: 'SummerSunset',
    background: 'bg-gradient-to-br from-orange-50 to-pink-50',
    markdownTheme: 'pink'
  },
  {
    value: 'AutumnWarmth',
    label: 'AutumnWarmth',
    background: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    markdownTheme: 'yellow'
  },
  {
    value: 'WinterFrost',
    label: 'WinterFrost',
    background: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    markdownTheme: 'blue'
  },
  {
    value: 'DarkGradientWave',
    label: 'DarkGradientWave',
    background: 'bg-gradient-to-br from-gray-900 to-gray-800',
    markdownTheme: 'gray'
  },
  {
    value: 'PurpleNight',
    label: 'PurpleNight',
    background: 'bg-gradient-to-br from-purple-900 to-indigo-900',
    markdownTheme: 'purple'
  },
  {
    value: 'SimpleLight',
    label: 'SimpleLight',
    background: 'bg-white',
    markdownTheme: 'indigo'
  },
  {
    value: 'SimpleDark',
    label: 'SimpleDark',
    background: 'bg-gray-900',
    markdownTheme: 'gray'
  },
  {
    value: 'GithubLight',
    label: 'GithubLight',
    background: 'bg-[#ffffff]',
    markdownTheme: 'indigo'
  },
  {
    value: 'GithubDark',
    label: 'GithubDark',
    background: 'bg-[#0d1117]',
    markdownTheme: 'gray'
  }
] as const satisfies readonly ThemeConfig[];

export type Theme = typeof themes[number];
export type RenderMode = 'long' | 'auto-pagination' | 'manual-pagination';
export type AspectRatio = '4:3' | '16:9' | 'auto';

export function splitMarkdown(markdown: string, mode: RenderMode): string[] {
  if (mode === 'manual-pagination') {
    return markdown
      .split(/^\s*---\s*$/gm)
      .map(content => content.trim())
      .filter(content => content.length > 0);
  }

  if (mode === 'auto-pagination') {
    const sections = markdown.split(/(?=^#\s+)/gm).map(section => section.trim()).filter(Boolean);

    if (sections.length > 1) {
      return sections;
    }

    const lines = markdown.split('\n');
    const pages: string[] = [];

    for (let i = 0; i < lines.length; i += 10) {
      const pageContent = lines.slice(i, i + 10).join('\n').trim();
      if (pageContent) {
        pages.push(pageContent);
      }
    }

    return pages;
  }

  return markdown.trim() ? [markdown] : [];
}

export function getAspectRatioClass(ratio: AspectRatio) {
  switch (ratio) {
    case '4:3':
      return 'aspect-[4/3]';
    case '16:9':
      return 'aspect-[16/9]';
    default:
      return '';
  }
}
