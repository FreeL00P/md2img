'use client';

import React, { useRef } from 'react';
import { Copy, Download, LoaderCircle } from 'lucide-react';
import { Md2Poster, Md2PosterContent } from 'markdown-to-image';
import { Button } from './ui/button';
import { getAspectRatioClass, type AspectRatio, type RenderMode, type Theme } from '@/lib/poster-options';

type PosterPreviewProps = {
  content: string;
  currentTheme: Theme;
  renderMode: RenderMode;
  aspectRatio: AspectRatio;
  bgOpacity: number;
  copyLoading: boolean;
  downloadLoading: boolean;
  copyLabel: string;
  downloadLabel: string;
  downloadAllLabel: string;
  index?: number;
  total?: number;
  onCopy: (container: HTMLElement) => void;
  onDownload: (container: HTMLElement) => void;
  onDownloadAll: () => void;
  onCopySuccess: () => void;
};

export default function PosterPreview({
  content,
  currentTheme,
  renderMode,
  aspectRatio,
  bgOpacity,
  copyLoading,
  downloadLoading,
  copyLabel,
  downloadLabel,
  downloadAllLabel,
  index,
  total,
  onCopy,
  onDownload,
  onDownloadAll,
  onCopySuccess
}: PosterPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const aspectRatioClass = renderMode === 'long' || aspectRatio === 'auto' ? '' : getAspectRatioClass(aspectRatio);
  const isDarkTheme = currentTheme.value.includes('Dark');
  const actionButtonClass = `
    backdrop-blur-sm rounded-lg w-8 h-8 p-0
    ${isDarkTheme
      ? 'bg-gray-800/80 hover:bg-gray-800/90 text-white border-gray-700'
      : 'bg-white/80 hover:bg-white/90 border-gray-200'}
  `;

  return (
    <div className="page-content relative group w-full mb-8">
      <div ref={previewRef}>
        <Md2Poster
          theme={currentTheme.markdownTheme}
          copySuccessCallback={onCopySuccess}
          className={`
            ${isDarkTheme ? 'prose-invert' : ''}
            ${aspectRatioClass}
            relative rounded-lg overflow-hidden ${currentTheme.background}
            w-full
          `}
        >
          <div
            aria-hidden="true"
            className={`absolute inset-0 ${currentTheme.background}`}
            style={{ opacity: bgOpacity / 100 }}
          />
          <div className={`
            relative z-10 w-full h-full flex flex-col
            ${renderMode !== 'long' && aspectRatio !== 'auto' ? 'justify-center' : ''}
          `}>
            <Md2PosterContent>{content}</Md2PosterContent>
          </div>
        </Md2Poster>
      </div>

      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="outline"
          size="sm"
          className={actionButtonClass}
          onClick={(e) => {
            e.stopPropagation();
            if (previewRef.current) {
              onCopy(previewRef.current);
            }
          }}
          disabled={copyLoading}
          title={copyLabel}
        >
          {copyLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Copy className="w-4 h-4" />}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className={actionButtonClass}
          onClick={(e) => {
            e.stopPropagation();
            if (previewRef.current) {
              onDownload(previewRef.current);
            }
          }}
          disabled={downloadLoading}
          title={downloadLabel}
        >
          {downloadLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        </Button>

        {index === 0 && total && total > 1 && (
          <Button
            variant="outline"
            size="sm"
            className={actionButtonClass}
            onClick={(e) => {
              e.stopPropagation();
              onDownloadAll();
            }}
            disabled={downloadLoading}
            title={downloadAllLabel}
          >
            {downloadLoading ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              <div className="relative">
                <Download className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 text-[10px] font-bold">*</span>
              </div>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
