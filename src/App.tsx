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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-2 shadow-lg shadow-indigo-200">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">ImageShrink</h1>
              <p className="text-xs text-gray-500">บีบอัดภาพให้เล็กลง คุณภาพเท่าเดิม</p>
            </div>
          </div>
          {doneCount > 0 && (
            <button
              onClick={downloadAll}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors flex items-center gap-2 shadow-md"
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
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        {images.length === 0 && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              บีบอัดภาพของคุณ
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              ลดขนาดไฟล์ภาพให้เล็กลงโดยไม่สูญเสียคุณภาพ ประหยัดพื้นที่จัดเก็บ
              และโหลดเร็วขึ้น • ประมวลผลในเบราว์เซอร์ของคุณ ไม่อัพโหลดไปที่เซิร์ฟเวอร์
            </p>
            <div className="flex justify-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500">✓</span> ไม่มีการอัพโหลด
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500">✓</span> ประมวลผลในเครื่อง
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500">✓</span> ไม่จำกัดขนาด
              </div>
            </div>
          </div>
        )}

        {/* Drop Zone */}
        <div className="mb-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Controls */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
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
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 text-center">
              <div className="rounded-full bg-indigo-100 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">ปลอดภัย 100%</h3>
              <p className="text-sm text-gray-500">
                ภาพของคุณไม่ถูกอัพโหลดไปที่ไหน ประมวลผลทั้งหมดในเบราว์เซอร์ของคุณ
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 text-center">
              <div className="rounded-full bg-purple-100 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">รวดเร็ว</h3>
              <p className="text-sm text-gray-500">
                บีบอัดภาพได้ทันที ไม่ต้องรออัพโหลดหรือดาวน์โหลดจากเซิร์ฟเวอร์
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 text-center">
              <div className="rounded-full bg-green-100 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">คุณภาพสูง</h3>
              <p className="text-sm text-gray-500">
                รองรับ WebP, JPEG, PNG ปรับคุณภาพได้ตามต้องการ
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          <p>ImageShrink — บีบอัดภาพในเบราว์เซอร์ • ไม่มีการอัพโหลด • ปลอดภัย</p>
        </div>
      </footer>
    </div>
  );
}
