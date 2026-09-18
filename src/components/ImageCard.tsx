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
    <div className="rounded-2xl bg-white border border-gray-100 shadow-md overflow-hidden transition-all hover:shadow-lg">
      {/* Image Preview */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <img
          src={image.compressedUrl || image.originalUrl}
          alt={image.file.name}
          className="w-full h-full object-contain"
        />
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          {image.status === 'compressing' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
              <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              กำลังบีบอัด
            </span>
          )}
          {image.status === 'done' && (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                isSmaller
                  ? 'bg-green-100 text-green-700'
                  : 'bg-orange-100 text-orange-700'
              }`}
            >
              {isSmaller ? '✓ ลดลง' : 'ไม่ลดลง'}{' '}
              {isSmaller ? `${savings}%` : ''}
            </span>
          )}
          {image.status === 'error' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
              ✗ ผิดพลาด
            </span>
          )}
        </div>
        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 rounded-full bg-white/80 backdrop-blur-sm p-1.5 text-gray-500 hover:text-red-500 hover:bg-white transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Info Section */}
      <div className="p-4">
        <p className="text-sm font-medium text-gray-800 truncate mb-3" title={image.file.name}>
          {image.file.name}
        </p>

        {/* Size Comparison */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="rounded-lg bg-gray-50 p-2.5">
            <div className="text-xs text-gray-500 mb-0.5">เดิม</div>
            <div className="text-sm font-bold text-gray-700">
              {formatSize(image.originalSize)}
            </div>
            {image.width > 0 && (
              <div className="text-xs text-gray-400">
                {image.width} × {image.height}
              </div>
            )}
          </div>
          <div
            className={`rounded-lg p-2.5 ${
              image.status === 'done'
                ? isSmaller
                  ? 'bg-green-50'
                  : 'bg-orange-50'
                : 'bg-gray-50'
            }`}
          >
            <div className="text-xs text-gray-500 mb-0.5">หลังบีบอัด</div>
            <div
              className={`text-sm font-bold ${
                image.status === 'done'
                  ? isSmaller
                    ? 'text-green-700'
                    : 'text-orange-700'
                  : 'text-gray-400'
              }`}
            >
              {image.status === 'done'
                ? formatSize(image.compressedSize)
                : '—'}
            </div>
            {image.status === 'done' && image.compressedWidth > 0 && (
              <div className="text-xs text-gray-400">
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
              className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {image.status === 'compressing' ? 'กำลังทำ...' : 'บีบอัด'}
            </button>
          )}
          {image.status === 'done' && (
            <>
              <button
                onClick={onDownload}
                className="flex-1 rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                ดาวน์โหลด
              </button>
              <button
                onClick={onCompress}
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
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
