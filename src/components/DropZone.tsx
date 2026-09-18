import { useCallback, useRef, useState } from 'react';

interface DropZoneProps {
  onFilesAdded: (files: File[]) => void;
}

export default function DropZone({ onFilesAdded }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) onFilesAdded(files);
    },
    [onFilesAdded]
  );

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) onFilesAdded(files);
    e.target.value = '';
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`
        relative cursor-pointer rounded-2xl border-2 border-dashed p-6 sm:p-12 text-center transition-all duration-200
        ${
          isDragging
            ? 'border-[#e95f3d] bg-[#e95f3d]/10'
            : 'border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#e95f3d]/50 hover:bg-[#1f1a18]'
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-4">
        <div className={`rounded-full p-4 transition-colors ${isDragging ? 'bg-[#e95f3d]/20' : 'bg-[#222]'}`}>
          <svg
            className={`h-10 w-10 transition-colors ${isDragging ? 'text-[#e95f3d]' : 'text-[#666]'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <p className="text-base font-semibold text-[#e5e5e5]">
            {isDragging ? 'วางไฟล์ที่นี่' : 'ลากไฟล์ภาพมาวาง หรือคลิกเพื่อเลือก'}
          </p>
          <p className="mt-1 text-sm text-[#777]">
            รองรับ JPG, PNG, WebP
          </p>
        </div>
        <button
          type="button"
          className="mt-1 rounded-full bg-[#e95f3d] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#d14e2f] transition-colors"
        >
          เลือกไฟล์ภาพ
        </button>
      </div>
    </div>
  );
}
