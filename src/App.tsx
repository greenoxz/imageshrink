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
    <div className="liquid-bg min-h-screen">
      {/* Header */}
      <header className="glass-subtle sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-5 py-3.5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="glass-btn rounded-xl p-2">
              <svg className="w-5 h-5 glass-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold glass-text">ImageShrink</h1>
              <p className="text-[11px] glass-text-muted">บีบอัดภาพให้เล็กลง คุณภาพเท่าเดิม</p>
            </div>
          </div>
          {doneCount > 0 && (
            <button
              onClick={downloadAll}
              className="glass-btn-primary rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              ดาวน์โหลดทั้งหมด
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-5 py-8 relative z-10">
        {/* Hero Section */}
        {images.length === 0 && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold glass-text mb-2">
              บีบอัดภาพของคุณ
            </h2>
            <p className="text-sm glass-text-muted max-w-md mx-auto leading-relaxed">
              ลดขนาดไฟล์ภาพให้เล็กลงโดยไม่สูญเสียคุณภาพ • ประมวลผลในเบราว์เซอร์ของคุณ ไม่อัพโหลดไปที่เซิร์ฟเวอร์
            </p>
            <div className="flex justify-center gap-5 mt-5">
              <div className="flex items-center gap-1.5 text-xs glass-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                ไม่มีการอัพโหลด
              </div>
              <div className="flex items-center gap-1.5 text-xs glass-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                ประมวลผลในเครื่อง
              </div>
              <div className="flex items-center gap-1.5 text-xs glass-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                ไม่จำกัดขนาด
              </div>
            </div>
          </div>
        )}

        {/* Drop Zone */}
        <div className="mb-7">
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
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="glass-btn rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 glass-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold glass-text text-sm mb-1.5">ปลอดภัย 100%</h3>
              <p className="text-xs glass-text-muted leading-relaxed">
                ภาพของคุณไม่ถูกอัพโหลดไปที่ไหน ประมวลผลทั้งหมดในเบราว์เซอร์
              </p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="glass-btn rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 glass-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold glass-text text-sm mb-1.5">รวดเร็ว</h3>
              <p className="text-xs glass-text-muted leading-relaxed">
                บีบอัดภาพได้ทันที ไม่ต้องรออัพโหลดหรือดาวน์โหลด
              </p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="glass-btn rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 glass-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold glass-text text-sm mb-1.5">คุณภาพสูง</h3>
              <p className="text-xs glass-text-muted leading-relaxed">
                รองรับ WebP, JPEG, PNG ปรับคุณภาพได้ตามต้องการ
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-16">
        <div className="max-w-5xl mx-auto px-5 py-5 text-center text-xs glass-text-dim">
          <p>ImageShrink — บีบอัดภาพในเบราว์เซอร์ • ปลอดภัย • ไม่มีการอัพโหลด</p>
        </div>
      </footer>
    </div>
  );
}
