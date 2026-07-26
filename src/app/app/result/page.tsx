"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { mockResult, normalRange, formatDate } from "@/lib/mockData";
import { RiskBadge } from "@/components/RiskBadge";
import { RangeBar } from "@/components/RangeBar";

export default function ResultPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const ratio = mockResult.fev1 / mockResult.fvc;

  return (
    <div className="flex h-full min-h-[720px] flex-col justify-between px-6 py-8">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Test Result</p>
            <p className="text-sm text-slate-500">{formatDate(mockResult.timestamp)}</p>
          </div>
          <RiskBadge tier={mockResult.tier} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">FEV1</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{mockResult.fev1.toFixed(1)}</p>
            <p className="text-xs text-slate-400">liters</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">FVC</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{mockResult.fvc.toFixed(1)}</p>
            <p className="text-xs text-slate-400">liters</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">FEV1 / FVC ratio</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{(ratio * 100).toFixed(0)}%</p>
        </div>

        <div className="mt-4 space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <RangeBar label="FEV1" value={mockResult.fev1} unit="L" min={normalRange.fev1.min} max={normalRange.fev1.max} />
          <RangeBar label="FVC" value={mockResult.fvc} unit="L" min={normalRange.fvc.min} max={normalRange.fvc.max} />
        </div>

        <div
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700"
          title="Raw sensor waveform corrected by an on-device 1D-CNN model before this result was computed."
        >
          ✨ AI-corrected (1D-CNN)
        </div>
      </div>

      <div className="w-full space-y-2">
        <button
          onClick={() => setSaved(true)}
          disabled={saved}
          className="w-full rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white shadow-sm transition disabled:opacity-60"
        >
          {saved ? "Saved ✓" : "Save Result"}
        </button>
        <button
          onClick={() => router.push("/app/history")}
          className="w-full rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          View History
        </button>
      </div>
    </div>
  );
}
