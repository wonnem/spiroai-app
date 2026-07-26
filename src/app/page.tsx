import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-2xl font-bold text-white shadow-lg">
        S
      </div>
      <h1 className="mt-6 text-3xl font-semibold text-slate-900">SpiroAI</h1>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        Low-cost, AI-corrected spirometry for primary respiratory screening.
        This is a UI-only demo — all data is hardcoded.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/app"
          className="rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
        >
          Open Field App (Mobile)
        </Link>
        <Link
          href="/dashboard"
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Open Institution Dashboard
        </Link>
      </div>
    </div>
  );
}
