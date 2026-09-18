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
        relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300
        ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50 scale-[1.02] shadow-lg'
            : 'border-gray-300 bg-gray-50/50 hover:border-indigo-400 hover:bg-indigo-50/50'
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
        <div
          className={`rounded-full p-4 transition-all duration-300 ${
            isDragging ? 'bg-indigo-100' : 'bg-gray-100'
          }`}
        >
          <svg
            className={`h-12 w-12 transition-colors ${
              isDragging ? 'text-indigo-500' : 'text-gray-400'
            }`}
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
          <p className="text-lg font-semibold text-gray-700">
            {isDragging ? 'วางไฟล์ที่นี่' : 'ลากไฟล์ภาพมาวางที่นี่'}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            หรือคลิกเพื่อเลือกไฟล์ • รองรับ JPG, PNG, WebP
          </p>
        </div>
        <div className="mt-2 rounded-full bg-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-md transition-transform hover:scale-105">
          เลือกไฟล์ภาพ
        </div>
      </div>
    </div>
  );
}
