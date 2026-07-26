export function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[390px] overflow-hidden rounded-[2.5rem] border-8 border-slate-900 bg-slate-950 shadow-2xl">
      <div className="flex items-center justify-between bg-slate-950 px-6 pb-1 pt-2 text-[11px] font-medium text-white">
        <span>9:41</span>
        <span className="h-4 w-24 rounded-full bg-slate-900" />
        <span>🔋 100%</span>
      </div>
      <div className="h-[720px] overflow-y-auto bg-slate-50">{children}</div>
      <div className="flex justify-center bg-slate-950 py-2">
        <span className="h-1 w-28 rounded-full bg-slate-600" />
      </div>
    </div>
  );
}
