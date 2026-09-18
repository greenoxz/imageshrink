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
    <div className="rounded-2xl bg-[#1a1a1a] border border-[#222] overflow-hidden hover:border-[#333] transition-colors">
      {/* Image Preview */}
      <div className="relative aspect-video bg-[#111] overflow-hidden">
        <img
          src={image.compressedUrl || image.originalUrl}
          alt={image.file.name}
          className="w-full h-full object-contain"
        />
        {/* Status Badge */}
        <div className="absolute top-2.5 left-2.5">
          {image.status === 'compressing' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#e95f3d]/20 border border-[#e95f3d]/30 px-2.5 py-1 text-xs font-medium text-[#e95f3d]">
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
                  ? 'bg-[#1b5e20]/30 border border-[#2e7d32]/40 text-[#81c784]'
                  : 'bg-[#222] border border-[#333] text-[#888]'
              }`}
            >
              {isSmaller ? `-${savings}%` : 'ไม่ลดลง'}
            </span>
          )}
          {image.status === 'error' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#b71c1c]/30 border border-[#c62828]/40 px-2.5 py-1 text-xs font-medium text-[#ef5350]">
              ผิดพลาด
            </span>
          )}
        </div>
        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="absolute top-2.5 right-2.5 rounded-full bg-[#1a1a1a]/80 border border-[#333] p-1.5 text-[#888] hover:text-[#e95f3d] hover:border-[#e95f3d]/50 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Info Section */}
      <div className="p-3.5">
        <p className="text-sm font-medium text-[#e5e5e5] truncate mb-3" title={image.file.name}>
          {image.file.name}
        </p>

        {/* Size Comparison */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-xl bg-[#111] border border-[#222] p-2.5">
            <div className="text-[10px] text-[#666] uppercase tracking-wide mb-0.5">เดิม</div>
            <div className="text-sm font-semibold text-[#ccc]">
              {formatSize(image.originalSize)}
            </div>
            {image.width > 0 && (
              <div className="text-[11px] text-[#666]">
                {image.width} × {image.height}
              </div>
            )}
          </div>
          <div
            className={`rounded-xl p-2.5 ${
              image.status === 'done' && isSmaller
                ? 'bg-[#1b5e20]/20 border border-[#2e7d32]/30'
                : 'bg-[#111] border border-[#222]'
            }`}
          >
            <div className="text-[10px] text-[#666] uppercase tracking-wide mb-0.5">หลังบีบอัด</div>
            <div
              className={`text-sm font-semibold ${
                image.status === 'done'
                  ? isSmaller
                    ? 'text-[#81c784]'
                    : 'text-[#888]'
                  : 'text-[#555]'
              }`}
            >
              {image.status === 'done'
                ? formatSize(image.compressedSize)
                : '—'}
            </div>
            {image.status === 'done' && image.compressedWidth > 0 && (
              <div className="text-[11px] text-[#666]">
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
              className="flex-1 rounded-full bg-[#e95f3d] px-3 py-2 text-xs font-medium text-white hover:bg-[#d14e2f] transition-colors disabled:opacity-40"
            >
              {image.status === 'compressing' ? 'กำลังทำ...' : 'บีบอัด'}
            </button>
          )}
          {image.status === 'done' && (
            <>
              <button
                onClick={onDownload}
                className="flex-1 rounded-full bg-[#e95f3d] px-3 py-2 text-xs font-medium text-white hover:bg-[#d14e2f] transition-colors flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                ดาวน์โหลด
              </button>
              <button
                onClick={onCompress}
                className="rounded-full bg-[#222] border border-[#2a2a2a] px-3 py-2 text-[#888] hover:border-[#e95f3d]/50 hover:text-[#e95f3d] transition-colors"
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
