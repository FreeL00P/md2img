'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'zh' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  zh: {
    'theme': '主题样式',
    'renderMode': '渲染方式',
    'aspectRatio': '图片比例',
    'bgOpacity': '背景透明度',
    'longMode': '长图模式',
    'autoPagination': '自动分页',
    'manualPagination': '手动分页',
    'auto': '自适应',
    'copy': '复制图片',
    'download': '下载当前图片',
    'downloadAll': '下载全部图片',
    'manualPaginationTip': '提示：在手动分页模式下，使用 "---" 来分割页面，点击下载将保存所有页面',
    'autoPaginationTip': '提示：在自动分页模式下，会按标题自动分页，点击下载将保存所有页面',
    'longModeTip': '提示：长图模式下将生成并下载单张完整图片',
    'placeholder': '在这里输入 Markdown 内容，使用 --- 来分页',
    'SpringGradientWave': '春日渐变',
    'SummerSunset': '夏日晚霞',
    'AutumnWarmth': '秋日暖阳',
    'WinterFrost': '冬日霜雪',
    'DarkGradientWave': '暗夜渐变',
    'PurpleNight': '紫夜静谧',
    'SimpleLight': '简约亮色',
    'SimpleDark': '简约暗色',
    'GithubLight': 'GitHub亮色',
    'GithubDark': 'GitHub暗色'
  },
  en: {
    'theme': 'Theme',
    'renderMode': 'Render Mode',
    'aspectRatio': 'Aspect Ratio',
    'bgOpacity': 'Background Opacity',
    'longMode': 'Long Image',
    'autoPagination': 'Auto Pagination',
    'manualPagination': 'Manual Pagination',
    'auto': 'Auto',
    'copy': 'Copy Image',
    'download': 'Download Current',
    'downloadAll': 'Download All',
    'manualPaginationTip': 'Tip: In manual pagination mode, use "---" to split pages, click download to save all pages',
    'autoPaginationTip': 'Tip: In auto pagination mode, pages are split by headings, click download to save all pages',
    'longModeTip': 'Tip: In long image mode, a single complete image will be generated and downloaded',
    'placeholder': 'Enter Markdown content here, use "---" to split pages',
    'SpringGradientWave': 'Spring Gradient',
    'SummerSunset': 'Summer Sunset',
    'AutumnWarmth': 'Autumn Warmth',
    'WinterFrost': 'Winter Frost',
    'DarkGradientWave': 'Dark Gradient',
    'PurpleNight': 'Purple Night',
    'SimpleLight': 'Simple Light',
    'SimpleDark': 'Simple Dark',
    'GithubLight': 'GitHub Light',
    'GithubDark': 'GitHub Dark'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh')

  const t = (key: string) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 