'use client';
import React, { useState, ChangeEvent, TextareaHTMLAttributes, useRef, useCallback } from 'react'
import { Button } from './ui/button'
import { Languages } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Editor as MonacoEditor } from '@monaco-editor/react';
import type { OnMount } from '@monaco-editor/react';
import { editorTheme } from '@/lib/editor-theme';
import { useLanguage } from '@/lib/language-context'
import { splitMarkdown, themes, type AspectRatio, type RenderMode, type Theme } from '@/lib/poster-options'
import { copyElementAsPng, downloadElementAsPng } from '@/lib/image-export'
import PosterPreview from './PosterPreview'

const Textarea: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ onChange, value, defaultValue }) => {
  const handleEditorChange = (value: string | undefined) => {
    if (onChange && value !== undefined) {
      const event = {
        target: { value },
      } as ChangeEvent<HTMLTextAreaElement>;
      onChange(event);
    }
  };

  const handleEditorDidMount = useCallback<OnMount>((editor, monaco) => {
    // 注册自定义主题
    monaco.editor.defineTheme('markdown-light', editorTheme);
    monaco.editor.setTheme('markdown-light');

    // 配置 Markdown 折叠规则
    editor.updateOptions({
      folding: true,
      foldingStrategy: 'indentation',
      foldingHighlight: true,
      foldingImportsByDefault: true,
      showFoldingControls: 'always',
      lineDecorationsWidth: 20,
      lineNumbersMinChars: 3,
      glyphMargin: true,
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
      automaticLayout: true,
      minimap: { enabled: false },
      fontSize: 14,
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      lineHeight: 24,
      padding: { top: 16, bottom: 16 },
      wordWrap: 'on',
      bracketPairColorization: {
        enabled: true
      },
      guides: {
        indentation: true,
        bracketPairs: true,
        bracketPairsHorizontal: true,
        highlightActiveBracketPair: true,
        highlightActiveIndentation: true
      },
      // 滚动条配置
      scrollbar: {
        vertical: 'visible',
        horizontal: 'visible',
        useShadows: false,
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8,
        verticalHasArrows: false,
        horizontalHasArrows: false,
        arrowSize: 0,
        handleMouseWheel: true,
        alwaysConsumeMouseWheel: false
      },
      // 编辑器外观
      overviewRulerLanes: 0,
      overviewRulerBorder: false,
      hideCursorInOverviewRuler: true,
      renderValidationDecorations: 'on',
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      cursorStyle: 'line',
      smoothScrolling: true,
      mouseWheelZoom: true,
      // 内容配置
      tabSize: 2,
      insertSpaces: true,
      detectIndentation: true,
      trimAutoWhitespace: true,
      // 选择配置
      selectOnLineNumbers: true,
      selectionHighlight: true,
      selectionClipboard: true,
      // 其他配置
      contextmenu: true,
      quickSuggestions: true,
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: 'on',
      tabCompletion: 'on',
      wordBasedSuggestions: 'currentDocument',
      parameterHints: {
        enabled: true
      }
    });

    // 注册 Markdown 语言配置
    monaco.languages.register({ id: 'markdown' });
    monaco.languages.setLanguageConfiguration('markdown', {
      brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
        ['```', '```'],
        ['`', '`']
      ],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '```', close: '```' },
        { open: '`', close: '`' }
      ],
      surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '```', close: '```' },
        { open: '`', close: '`' }
      ],
      folding: {
        markers: {
          start: /^#+\s+|\s*```/,
          end: /^#+\s+|\s*```/
        }
      }
    });
  }, []);

  return (
    <div className="w-full h-full">
        <MonacoEditor
          height="100%"
          defaultLanguage="markdown"
        value={(value ?? defaultValue ?? '') as string}
        onChange={handleEditorChange}
        theme="markdown-light"
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          lineNumbers: 'on',
          folding: true,
          foldingStrategy: 'indentation',
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          fontSize: 14,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          lineHeight: 24,
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          renderWhitespace: 'selection',
          wordWrap: 'on',
          automaticLayout: true,
          bracketPairColorization: {
            enabled: true
          },
          guides: {
            indentation: true,
            bracketPairs: true,
            bracketPairsHorizontal: true,
            highlightActiveBracketPair: true,
            highlightActiveIndentation: true
          },
          suggest: {
            preview: true,
            showMethods: true,
            showFunctions: true,
            showConstructors: true,
            showFields: true,
            showVariables: true,
            showClasses: true,
            showStructs: true,
            showInterfaces: true,
            showModules: true,
            showProperties: true,
            showEvents: true,
            showOperators: true,
            showUnits: true,
            showValues: true,
            showConstants: true,
            showEnums: true,
            showEnumMembers: true,
            showKeywords: true,
            showWords: true,
            showColors: true,
            showFiles: true,
            showReferences: true,
            showFolders: true,
            showTypeParameters: true,
            showSnippets: true
          }
        }}
      />
    </div>
  );
};

const defaultMd = `# AI Morning News - April 29th
![image](https://imageio.forbes.com/specials-images/imageserve/64b5825a5b9b4d3225e9bd15/artificial-intelligence--ai/960x0.jpg?format=jpg&width=1440)

1. **MetaElephant Company Releases Multi-Modal Large Model XVERSE-V**: Supports image input of any aspect ratio, performs well in multiple authoritative evaluations, and has been open-sourced.
2. **Tongyi Qianwen Team Open-Sources Billion-Parameter Model Qwen1.5-110B**: Uses Transformer decoder architecture, supports multiple languages, and has an efficient attention mechanism.

# AI Technology Updates
3. **Shengshu Technology and Tsinghua University Release Video Large Model Vidu**: Adopts a fusion architecture of Diffusion and Transformer, generates high-definition videos with one click, leading internationally.
4. **Mutable AI Launches Auto Wiki v2**: Automatically converts code into Wikipedia-style articles, solving the problem of code documentation.

# Industry News
5. **Google Builds New Data Center in the U.S.**: Plans to invest $3 billion to build a data center campus in Indiana, expand facilities in Virginia, and launch an artificial intelligence opportunity fund.
6. **China Academy of Information and Communications Technology Releases Automobile Large Model Standard**: Aims to standardize and promote the intelligent development of the automotive industry.

# Product Updates
7. **Kimi Chat Mobile App Update**: Version 1.2.1 completely revamps the user interface, introduces a new light mode, and provides a comfortable and intuitive experience.`

export default function Editor() {
  const { language, setLanguage, t } = useLanguage()
  const [mdString, setMdString] = useState(defaultMd)
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0])
  const [renderMode, setRenderMode] = useState<RenderMode>('long')
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('auto')
  const [bgOpacity, setBgOpacity] = useState(100);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMdString(e.target.value)
  }
  const [copyLoading, setCopyLoading] = useState(false)
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [message, setMessage] = useState('')
  const containerRef = useRef<HTMLDivElement>(null);

  const showMessage = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(''), 3000);
  };

  const getExportErrorMessage = (err: unknown) => {
    const reason = err instanceof Error ? err.message : String(err);
    return `${t('exportFailed')} ${t('crossOriginTip')} ${reason ? `(${reason})` : ''}`;
  };

  const getExportBackgroundColor = () => currentTheme.value.includes("Dark") ? '#1a1a1a' : '#ffffff';

  const handleCopyFromChild = async (container: HTMLElement) => {
    setCopyLoading(true);
    try {
      await copyElementAsPng(container, getExportBackgroundColor());
      showMessage(t('copySuccess'));
    } catch (err) {
      console.error('复制出错', err);
      showMessage(getExportErrorMessage(err));
    }
    setCopyLoading(false);
  };

  const handleDownload = async (container: HTMLElement) => {
    setDownloadLoading(true);
    try {
      await downloadElementAsPng(container, 'markdown-poster.png', getExportBackgroundColor());
    } catch (err) {
      console.error('下载出错', err);
      showMessage(getExportErrorMessage(err));
    }
    setDownloadLoading(false);
  };

  const copySuccessCallback = () => {
    showMessage(t('copySuccess'))
  }

  const handleThemeChange = (value: string) => {
    const newTheme = themes.find(t => t.value === value)
    if (newTheme) {
      setCurrentTheme(newTheme)
    }
  }

  const handleDownloadAll = async () => {
    setDownloadLoading(true);
    try {
      const containers = document.querySelectorAll('.page-content');
      
      for (let i = 0; i < containers.length; i++) {
        const container = containers[i] as HTMLElement;
        if (!container) continue;

        await downloadElementAsPng(container, `markdown-poster-${String(i + 1).padStart(2, '0')}.png`, getExportBackgroundColor());

        // 添加延迟避免浏览器阻塞
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      showMessage(t('downloadAllSuccess'));
    } catch (err) {
      console.error('下载出错', err);
      showMessage(getExportErrorMessage(err));
    }
    setDownloadLoading(false);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-8rem)]">
      {/* 控制面板 */}
      <div className="w-full border-b border-gray-200 pb-6 mt-8" aria-label="Editor controls">
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{t('theme')}</span>
            <Select value={currentTheme.value} onValueChange={handleThemeChange}>
              <SelectTrigger className="w-[160px] sm:w-[180px]">
                <SelectValue placeholder={t('theme')} />
              </SelectTrigger>
              <SelectContent>
                {themes.map((theme) => (
                  <SelectItem key={theme.value} value={theme.value}>
                    {t(theme.value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{t('renderMode')}</span>
            <Select value={renderMode} onValueChange={(value: RenderMode) => setRenderMode(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={t('renderMode')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="long">{t('longMode')}</SelectItem>
                <SelectItem value="auto-pagination">{t('autoPagination')}</SelectItem>
                <SelectItem value="manual-pagination">{t('manualPagination')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {renderMode !== 'long' && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{t('aspectRatio')}</span>
                <Select value={aspectRatio} onValueChange={(value: AspectRatio) => setAspectRatio(value)}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder={t('aspectRatio')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">{t('auto')}</SelectItem>
                    <SelectItem value="4:3">4:3</SelectItem>
                    <SelectItem value="16:9">16:9</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{t('bgOpacity')}</span>
            <Slider
              className="w-[140px] sm:w-[200px]"
              value={[bgOpacity]}
              onValueChange={(value) => setBgOpacity(value[0])}
              max={100}
              step={1}
            />
            <span className="text-sm text-gray-500 w-9">{bgOpacity}%</span>
          </div>

          {/* 语言切换按钮 */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="sm:ml-auto"
          >
            <Languages className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {message && (
        <div className="max-w-6xl w-full mx-auto px-6 pt-3">
          <div className="rounded-md border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm text-indigo-900">
            {message}
          </div>
        </div>
      )}

      {/* 编辑器主体 */}
      <div className="flex-1 min-h-0">
        <div className="h-full w-full border-2 border-gray-900 rounded-xl overflow-hidden bg-white">
          <div className="flex flex-row h-full">
            {/* 编辑器区域 */}
            <div className="w-1/2 h-full border-r border-gray-200" aria-label="Markdown editor">
              <div className="h-full">
                <Textarea
                  placeholder={t('placeholder')}
                  onChange={handleChange}
                  value={mdString}
                  spellCheck={false}
                  className="h-full w-full resize-none focus:outline-none p-6 rounded-l-xl"
                />
              </div>
            </div>

            {/* 预览区域 */}
            <div className="w-1/2 h-full overflow-y-auto" aria-label="Poster preview">
              <div className="p-6">
                <div
                  ref={containerRef}
                  className="w-full"
                >
                  {renderMode !== 'long' ? (
                    (() => {
                      const pages = splitMarkdown(mdString, renderMode);
                      return pages.length > 0 ? pages.map((pageContent, index) => (
                        <PosterPreview 
                          key={index}
                          content={pageContent} 
                          currentTheme={currentTheme}
                          renderMode={renderMode}
                          aspectRatio={aspectRatio}
                          bgOpacity={bgOpacity}
                          copyLoading={copyLoading}
                          downloadLoading={downloadLoading}
                          copyLabel={t('copy')}
                          downloadLabel={t('download')}
                          downloadAllLabel={t('downloadAll')}
                          index={index} 
                          total={pages.length}
                          onCopy={handleCopyFromChild}
                          onDownload={handleDownload}
                          onDownloadAll={handleDownloadAll}
                          onCopySuccess={copySuccessCallback}
                        />
                      )) : <p className="text-sm text-gray-500">{t('emptyPreview')}</p>;
                    })()
                  ) : (
                    <PosterPreview
                      content={mdString}
                      currentTheme={currentTheme}
                      renderMode={renderMode}
                      aspectRatio={aspectRatio}
                      bgOpacity={bgOpacity}
                      copyLoading={copyLoading}
                      downloadLoading={downloadLoading}
                      copyLabel={t('copy')}
                      downloadLabel={t('download')}
                      downloadAllLabel={t('downloadAll')}
                      onCopy={handleCopyFromChild}
                      onDownload={handleDownload}
                      onDownloadAll={handleDownloadAll}
                      onCopySuccess={copySuccessCallback}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 使用说明 */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <p className="text-sm text-gray-500">
          {renderMode === 'manual-pagination' ? (
            t('manualPaginationTip')
          ) : renderMode === 'auto-pagination' ? (
            t('autoPaginationTip')
          ) : (
            t('longModeTip')
          )}
        </p>
      </div>
    </div>
  );
}
