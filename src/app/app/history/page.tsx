"use client";

import { useState } from "react";
import { mockHistory, formatDate } from "@/lib/mockData";
import { RiskBadge } from "@/components/RiskBadge";
import { ChartWrapper } from "@/components/ChartWrapper";

export default function HistoryPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const points = mockHistory.map((h) => h.fev1);

  return (
    <div className="flex h-full min-h-[720px] flex-col px-6 py-8">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">History &amp; Trend</p>
      <h1 className="mt-1 text-xl font-semibold text-slate-900">FEV1 over time</h1>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <ChartWrapper points={points} />
        <div className="mt-1 flex justify-between text-[10px] text-slate-400">
          <span>{formatDate(mockHistory[0].timestamp)}</span>
          <span>{formatDate(mockHistory[mockHistory.length - 1].timestamp)}</span>
        </div>
      </div>

      <div className="mt-5 flex-1 space-y-2 overflow-y-auto">
        {[...mockHistory].reverse().map((entry) => {
          const isOpen = expandedId === entry.id;
          return (
            <button
              key={entry.id}
              onClick={() => setExpandedId(isOpen ? null : entry.id)}
              className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-teal-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">{formatDate(entry.timestamp)}</p>
                  <p className="text-xs text-slate-500">FEV1 {entry.fev1.toFixed(1)} L · FVC {entry.fvc.toFixed(1)} L</p>
                </div>
                <RiskBadge tier={entry.tier} size="sm" />
              </div>
              {isOpen && (
                <div className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
                  <p>FEV1/FVC ratio: {((entry.fev1 / entry.fvc) * 100).toFixed(0)}%</p>
                  <p className="mt-1">Recorded via {entry.id} · AI-corrected (1D-CNN)</p>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
