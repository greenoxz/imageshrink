import { ImageFile } from '../hooks/useImageCompression';

interface ImageCardProps {
  image: ImageFile;
  onCompress: () => void;
  onRemove: () => void;
  onDownload: () => void;
}

function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default function ImageCard({
  image,
  onCompress,
  onRemove,
  onDownload,
}: ImageCardProps) {
  const savings =
    image.originalSize > 0 && image.compressedSize > 0
      ? Math.round((1 - image.compressedSize / image.originalSize) * 100)
      : 0;

  const isSmaller = image.compressedSize < image.originalSize;

  return (
    <div className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:glass-strong group">
      {/* Image Preview */}
      <div className="relative aspect-video bg-black/20 overflow-hidden">
        <img
          src={image.compressedUrl || image.originalUrl}
          alt={image.file.name}
          className="w-full h-full object-contain"
        />
        {/* Status Badge */}
        <div className="absolute top-2.5 left-2.5">
          {image.status === 'compressing' && (
            <span className="glass-badge-warning inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium">
              <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              กำลังบีบอัด
            </span>
          )}
          {image.status === 'done' && (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                isSmaller
                  ? 'glass-badge-success'
                  : 'glass-badge'
              }`}
            >
              {isSmaller ? `-${savings}%` : 'ไม่ลดลง'}
            </span>
          )}
          {image.status === 'error' && (
            <span className="glass-badge inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-red-200 border-red-300/40 bg-red-500/30">
              ผิดพลาด
            </span>
          )}
        </div>
        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="absolute top-2.5 right-2.5 glass-btn rounded-full p-1.5 glass-text opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Info Section */}
      <div className="p-4 relative z-10">
        <p className="text-sm font-medium glass-text truncate mb-3" title={image.file.name}>
          {image.file.name}
        </p>

        {/* Size Comparison */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="glass-subtle rounded-xl p-2.5">
            <div className="text-[10px] glass-text-dim uppercase tracking-wide mb-0.5">เดิม</div>
            <div className="text-sm font-semibold glass-text">
              {formatSize(image.originalSize)}
            </div>
            {image.width > 0 && (
              <div className="text-[11px] glass-text-dim">
                {image.width} × {image.height}
              </div>
            )}
          </div>
          <div
            className={`rounded-xl p-2.5 ${
              image.status === 'done' && isSmaller
                ? 'bg-green-500/20 border border-green-300/30 backdrop-blur-xl'
                : 'glass-subtle'
            }`}
          >
            <div className="text-[10px] glass-text-dim uppercase tracking-wide mb-0.5">หลังบีบอัด</div>
            <div
              className={`text-sm font-semibold ${
                image.status === 'done'
                  ? isSmaller
                    ? 'text-green-200'
                    : 'glass-text-muted'
                  : 'glass-text-dim'
              }`}
            >
              {image.status === 'done'
                ? formatSize(image.compressedSize)
                : '—'}
            </div>
            {image.status === 'done' && image.compressedWidth > 0 && (
              <div className="text-[11px] glass-text-dim">
                {image.compressedWidth} × {image.compressedHeight}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {image.status !== 'done' && (
            <button
              onClick={onCompress}
              disabled={image.status === 'compressing'}
              className="flex-1 glass-btn-primary rounded-xl px-3 py-2 text-xs font-semibold disabled:opacity-40"
            >
              {image.status === 'compressing' ? 'กำลังทำ...' : 'บีบอัด'}
            </button>
          )}
          {image.status === 'done' && (
            <>
              <button
                onClick={onDownload}
                className="flex-1 glass-btn-primary rounded-xl px-3 py-2 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                ดาวน์โหลด
              </button>
              <button
                onClick={onCompress}
                className="glass-btn rounded-xl px-3 py-2 glass-text"
                title="บีบอัดอีกครั้ง"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
