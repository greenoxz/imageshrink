import { CompressionOptions } from '../hooks/useImageCompression';

interface CompressionControlsProps {
  options: CompressionOptions;
  onChange: (options: CompressionOptions) => void;
  onCompress: () => void;
  onClear: () => void;
  imageCount: number;
  isCompressing: boolean;
}

export default function CompressionControls({
  options,
  onChange,
  onCompress,
  onClear,
  imageCount,
  isCompressing,
}: CompressionControlsProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        ตั้งค่าการบีบอัด
      </h2>

      <div className="space-y-5">
        {/* Quality Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">คุณภาพ</label>
            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              {options.quality}%
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={options.quality}
            onChange={(e) =>
              onChange({ ...options, quality: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>ขนาดเล็ก</span>
            <span>คุณภาพสูง</span>
          </div>
        </div>

        {/* Max Dimensions */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              ความกว้างสูงสุด
            </label>
            <input
              type="number"
              value={options.maxWidth}
              onChange={(e) =>
                onChange({ ...options, maxWidth: parseInt(e.target.value) || 4096 })
              }
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              ความสูงสูงสุด
            </label>
            <input
              type="number"
              value={options.maxHeight}
              onChange={(e) =>
                onChange({ ...options, maxHeight: parseInt(e.target.value) || 4096 })
              }
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Output Format */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            รูปแบบไฟล์
          </label>
          <div className="flex gap-2">
            {[
              { value: 'image/webp', label: 'WebP', desc: 'แนะนำ' },
              { value: 'image/jpeg', label: 'JPEG', desc: 'เข้ากันได้' },
              { value: 'image/png', label: 'PNG', desc: 'ไม่สูญเสีย' },
            ].map((fmt) => (
              <button
                key={fmt.value}
                onClick={() =>
                  onChange({
                    ...options,
                    outputFormat: fmt.value as CompressionOptions['outputFormat'],
                  })
                }
                className={`flex-1 rounded-lg border px-3 py-2 text-center transition-all ${
                  options.outputFormat === fmt.value
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className="text-sm font-semibold">{fmt.label}</div>
                <div className="text-xs opacity-70">{fmt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onCompress}
            disabled={imageCount === 0 || isCompressing}
            className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isCompressing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                กำลังบีบอัด...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                บีบอัดทั้งหมด ({imageCount} ไฟล์)
              </span>
            )}
          </button>
          <button
            onClick={onClear}
            disabled={imageCount === 0}
            className="rounded-xl border border-gray-200 px-4 py-3 text-gray-600 transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
