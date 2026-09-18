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
    <div className="rounded-2xl bg-[#1a1a1a] border border-[#222] p-5">
      <h2 className="text-base font-semibold text-[#e5e5e5] mb-5 flex items-center gap-2">
        <span className="w-1 h-5 bg-[#e95f3d] rounded-full inline-block"></span>
        ตั้งค่าการบีบอัด
      </h2>

      <div className="space-y-5">
        {/* Quality Slider */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <label className="text-sm font-medium text-[#aaa]">คุณภาพ</label>
            <span className="text-sm font-bold text-[#e95f3d] bg-[#e95f3d]/10 px-2.5 py-0.5 rounded-full">
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
            className="w-full"
          />
          <div className="flex justify-between text-xs text-[#555] mt-1.5">
            <span>ขนาดเล็ก</span>
            <span>คุณภาพสูง</span>
          </div>
        </div>

        {/* Max Dimensions */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-[#aaa] mb-1.5 block">
              ความกว้างสูงสุด
            </label>
            <input
              type="number"
              value={options.maxWidth}
              onChange={(e) =>
                onChange({ ...options, maxWidth: parseInt(e.target.value) || 4096 })
              }
              className="w-full rounded-full bg-[#111] border border-[#2a2a2a] px-4 py-2.5 text-sm text-[#e5e5e5] focus:border-[#e95f3d] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[#aaa] mb-1.5 block">
              ความสูงสูงสุด
            </label>
            <input
              type="number"
              value={options.maxHeight}
              onChange={(e) =>
                onChange({ ...options, maxHeight: parseInt(e.target.value) || 4096 })
              }
              className="w-full rounded-full bg-[#111] border border-[#2a2a2a] px-4 py-2.5 text-sm text-[#e5e5e5] focus:border-[#e95f3d] outline-none transition-colors"
            />
          </div>
        </div>

        {/* Output Format */}
        <div>
          <label className="text-xs font-medium text-[#aaa] mb-2 block">
            รูปแบบไฟล์
          </label>
          <div className="flex gap-2">
            {[
              { value: 'image/webp', label: 'WebP', desc: 'แนะนำ' },
              { value: 'image/jpeg', label: 'JPEG', desc: 'ทั่วไป' },
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
                className={`flex-1 rounded-full px-3 py-2.5 text-center transition-colors ${
                  options.outputFormat === fmt.value
                    ? 'bg-[#e95f3d] text-white'
                    : 'bg-[#111] border border-[#2a2a2a] text-[#888] hover:border-[#444]'
                }`}
              >
                <div className="text-sm font-semibold">{fmt.label}</div>
                <div className={`text-[10px] mt-0.5 ${options.outputFormat === fmt.value ? 'opacity-80' : 'opacity-60'}`}>
                  {fmt.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={onCompress}
            disabled={imageCount === 0 || isCompressing}
            className="flex-1 rounded-full bg-[#e95f3d] px-5 py-3 text-sm font-medium text-white hover:bg-[#d14e2f] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isCompressing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                กำลังบีบอัด...
              </span>
            ) : (
              `บีบอัดทั้งหมด (${imageCount})`
            )}
          </button>
          <button
            onClick={onClear}
            disabled={imageCount === 0}
            className="rounded-full bg-[#222] border border-[#2a2a2a] px-4 py-3 text-[#888] hover:border-[#444] hover:text-[#aaa] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
