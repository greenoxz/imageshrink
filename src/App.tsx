import { useMemo } from 'react';
import DropZone from './components/DropZone';
import CompressionControls from './components/CompressionControls';
import ImageCard from './components/ImageCard';
import StatsBar from './components/StatsBar';
import { useImageCompression } from './hooks/useImageCompression';

export default function App() {
  const {
    images,
    options,
    setOptions,
    addFiles,
    compressAll,
    compressSingle,
    removeImage,
    clearAll,
    downloadImage,
    downloadAll,
  } = useImageCompression();

  const isCompressing = images.some((img) => img.status === 'compressing');
  const doneCount = images.filter((img) => img.status === 'done').length;

  const { totalOriginal, totalCompressed } = useMemo(() => {
    return images.reduce(
      (acc, img) => ({
        totalOriginal: acc.totalOriginal + img.originalSize,
        totalCompressed:
          acc.totalCompressed + (img.status === 'done' ? img.compressedSize : img.originalSize),
      }),
      { totalOriginal: 0, totalCompressed: 0 }
    );
  }, [images]);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <header className="border-b border-[#1a1a1a] bg-[#111] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-3 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="rounded-full bg-[#e95f3d] p-1.5 sm:p-2 flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold text-[#e5e5e5] truncate">ImageShrink</h1>
              <p className="text-[10px] sm:text-[11px] text-[#777] truncate hidden sm:block">บีบอัดภาพให้เล็กลง คุณภาพเท่าเดิม</p>
            </div>
          </div>
          {doneCount > 0 && (
            <button
              onClick={downloadAll}
              className="rounded-full bg-[#e95f3d] px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#d14e2f] transition-colors flex items-center gap-1 sm:gap-1.5 flex-shrink-0"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="hidden sm:inline">ดาวน์โหลดทั้งหมด</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-5 py-8">
        {/* Hero Section */}
        {images.length === 0 && (
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#e5e5e5] mb-2">
              บีบอัดภาพของคุณ
            </h2>
            <p className="text-xs sm:text-sm text-[#888] max-w-md mx-auto leading-relaxed px-2">
              ลดขนาดไฟล์ภาพให้เล็กลงโดยไม่สูญเสียคุณภาพ • ประมวลผลในเบราว์เซอร์ของคุณ ไม่อัพโหลดไปที่เซิร์ฟเวอร์
            </p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-5">
              <div className="flex items-center gap-1.5 text-xs text-[#888]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e95f3d]"></span>
                ไม่มีการอัพโหลด
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#888]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e95f3d]"></span>
                ประมวลผลในเครื่อง
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#888]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e95f3d]"></span>
                ไม่จำกัดขนาด
              </div>
            </div>
          </div>
        )}

        {/* Drop Zone */}
        <div className="mb-5 sm:mb-7">
          <DropZone onFilesAdded={addFiles} />
        </div>

        {/* Stats */}
        {doneCount > 0 && (
          <div className="mb-6">
            <StatsBar
              totalOriginal={totalOriginal}
              totalCompressed={totalCompressed}
              imageCount={images.length}
              doneCount={doneCount}
            />
          </div>
        )}

        {/* Controls + Images Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Controls */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <CompressionControls
                  options={options}
                  onChange={setOptions}
                  onCompress={compressAll}
                  onClear={clearAll}
                  imageCount={images.length}
                  isCompressing={isCompressing}
                />
              </div>
            </div>

            {/* Image Cards */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((image) => (
                  <ImageCard
                    key={image.id}
                    image={image}
                    onCompress={() => compressSingle(image.id)}
                    onRemove={() => removeImage(image.id)}
                    onDownload={() => downloadImage(image.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        {images.length === 0 && (
          <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#222] p-6 text-center">
              <div className="rounded-full bg-[#e95f3d]/10 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-[#e95f3d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#e5e5e5] text-sm mb-1.5">ปลอดภัย 100%</h3>
              <p className="text-xs text-[#777] leading-relaxed">
                ภาพของคุณไม่ถูกอัพโหลดไปที่ไหน ประมวลผลทั้งหมดในเบราว์เซอร์
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#222] p-6 text-center">
              <div className="rounded-full bg-[#e95f3d]/10 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-[#e95f3d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#e5e5e5] text-sm mb-1.5">รวดเร็ว</h3>
              <p className="text-xs text-[#777] leading-relaxed">
                บีบอัดภาพได้ทันที ไม่ต้องรออัพโหลดหรือดาวน์โหลด
              </p>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] border border-[#222] p-6 text-center">
              <div className="rounded-full bg-[#e95f3d]/10 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-[#e95f3d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#e5e5e5] text-sm mb-1.5">คุณภาพสูง</h3>
              <p className="text-xs text-[#777] leading-relaxed">
                รองรับ WebP, JPEG, PNG ปรับคุณภาพได้ตามต้องการ
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] mt-16">
        <div className="max-w-5xl mx-auto px-5 py-5 text-center text-xs text-[#555]">
          <p>ImageShrink — บีบอัดภาพในเบราว์เซอร์ • ปลอดภัย • ไม่มีการอัพโหลด</p>
        </div>
      </footer>
    </div>
  );
}
