"use client";

import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { StatCard } from "@/components/StatCard";
import { RiskBadge } from "@/components/RiskBadge";
import { mockPatients, mockDashboardStats, RiskTier, formatDate } from "@/lib/mockData";

type SortKey = "name" | "lastTestDate" | "fev1" | "tier";

const tierFilters: (RiskTier | "All")[] = ["All", "Normal", "Monitor", "Refer"];

export default function DashboardPage() {
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<RiskTier | "All">("All");
  const [sortKey, setSortKey] = useState<SortKey>("lastTestDate");

  const rows = useMemo(() => {
    let list = mockPatients.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()),
    );
    if (tierFilter !== "All") {
      list = list.filter((p) => p.tier === tierFilter);
    }
    return [...list].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "fev1") return b.fev1 - a.fev1;
      if (sortKey === "tier") return a.tier.localeCompare(b.tier);
      return b.lastTestDate.localeCompare(a.lastTestDate);
    });
  }, [query, tierFilter, sortKey]);

  return (
    <DashboardShell title="Overview">
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Tests this month" value={String(mockDashboardStats.totalTests)} />
        <StatCard label="Normal" value={`${mockDashboardStats.normalPct}%`} accent="text-emerald-600" />
        <StatCard label="Monitor" value={`${mockDashboardStats.monitorPct}%`} accent="text-amber-600" />
        <StatCard label="Refer" value={`${mockDashboardStats.referPct}%`} accent="text-rose-600" />
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
        <span>Device sync status</span>
        <span className="font-medium text-slate-700">Last synced {mockDashboardStats.lastSync}</span>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 p-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients…"
            className="w-56 rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-teal-500"
          />
          <div className="flex gap-1">
            {tierFilters.map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  tierFilter === t
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="ml-auto rounded-lg border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-teal-500"
          >
            <option value="lastTestDate">Sort by date</option>
            <option value="name">Sort by name</option>
            <option value="fev1">Sort by FEV1</option>
            <option value="tier">Sort by tier</option>
          </select>
        </div>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Last Test</th>
              <th className="px-4 py-3 font-medium">FEV1</th>
              <th className="px-4 py-3 font-medium">FVC</th>
              <th className="px-4 py-3 font-medium">Risk Tier</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-800">{p.name}</td>
                <td className="px-4 py-3 text-slate-500">{formatDate(p.lastTestDate)}</td>
                <td className="px-4 py-3 text-slate-500">{p.fev1.toFixed(1)} L</td>
                <td className="px-4 py-3 text-slate-500">{p.fvc.toFixed(1)} L</td>
                <td className="px-4 py-3">
                  <RiskBadge tier={p.tier} size="sm" />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  No patients match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
