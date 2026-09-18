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
        relative cursor-pointer rounded-2xl p-10 text-center transition-all duration-500
        ${isDragging ? 'glass-strong scale-[1.01]' : 'glass hover:glass-strong'}
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
      <div className="flex flex-col items-center gap-4 relative z-10">
        <div className={`rounded-full p-4 transition-all duration-300 ${isDragging ? 'bg-white/25 scale-110' : 'bg-white/15'}`}>
          <svg
            className={`h-10 w-10 transition-colors ${isDragging ? 'text-white' : 'text-white/80'}`}
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
          <p className="text-base font-semibold glass-text">
            {isDragging ? 'วางไฟล์ที่นี่' : 'ลากไฟล์ภาพมาวาง หรือคลิกเพื่อเลือก'}
          </p>
          <p className="mt-1 text-sm glass-text-muted">
            รองรับ JPG, PNG, WebP
          </p>
        </div>
        <button
          type="button"
          className="mt-1 glass-btn-primary rounded-full px-6 py-2.5 text-sm font-semibold"
        >
          เลือกไฟล์ภาพ
        </button>
      </div>
    </div>
  );
}
