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
    <div className={`rounded-2xl p-5 ${isSaved ? 'bg-[#1b5e20]/30 border border-[#2e7d32]/40' : 'bg-[#1a1a1a] border border-[#222]'}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`rounded-full p-2.5 ${isSaved ? 'bg-[#2e7d32]/40' : 'bg-[#222]'}`}>
            <svg className={`w-5 h-5 ${isSaved ? 'text-[#81c784]' : 'text-[#888]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-[#aaa]">บีบอัดเสร็จแล้ว {doneCount}/{imageCount} ไฟล์</p>
            <p className={`text-lg font-bold ${isSaved ? 'text-[#81c784]' : 'text-[#e5e5e5]'}`}>
              {isSaved ? `ลดขนาดได้ ${formatSize(saved)}` : 'ขนาดไม่ลดลง'} {isSaved && `(${percent}%)`}
            </p>
          </div>
        </div>
        <div className="flex gap-6 text-sm">
          <div className="text-center">
            <div className="text-[#666] text-xs">ขนาดเดิม</div>
            <div className="font-bold text-[#e5e5e5]">{formatSize(totalOriginal)}</div>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-[#555]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div className="text-center">
            <div className="text-[#666] text-xs">หลังบีบอัด</div>
            <div className={`font-bold ${isSaved ? 'text-[#81c784]' : 'text-[#e5e5e5]'}`}>{formatSize(totalCompressed)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
