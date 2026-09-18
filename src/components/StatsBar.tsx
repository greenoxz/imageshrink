interface StatsBarProps {
  totalOriginal: number;
  totalCompressed: number;
  imageCount: number;
  doneCount: number;
}

function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default function StatsBar({
  totalOriginal,
  totalCompressed,
  imageCount,
  doneCount,
}: StatsBarProps) {
  if (doneCount === 0) return null;

  const saved = totalOriginal - totalCompressed;
  const percent = Math.round((1 - totalCompressed / totalOriginal) * 100);

  const isSaved = saved > 0;

  return (
    <div className={`rounded-lg p-5 text-white ${isSaved ? 'bg-[#2e7d32]' : 'bg-[#e95f3d]'}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-white/20 p-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm opacity-90">บีบอัดเสร็จแล้ว {doneCount}/{imageCount} ไฟล์</p>
            <p className="text-lg font-bold">
              ลดขนาดได้ {formatSize(saved)} ({percent}%)
            </p>
          </div>
        </div>
        <div className="flex gap-6 text-sm">
          <div className="text-center">
            <div className="opacity-80 text-xs">ขนาดเดิม</div>
            <div className="font-bold">{formatSize(totalOriginal)}</div>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div className="text-center">
            <div className="opacity-80 text-xs">หลังบีบอัด</div>
            <div className="font-bold">{formatSize(totalCompressed)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
