import Link from "next/link";

const navItems = [
  { label: "Overview", active: true },
  { label: "Patients", active: false },
  { label: "Devices", active: false },
  { label: "Settings", active: false },
];

export function DashboardShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="flex items-center gap-2 border-b border-slate-200 px-6 py-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
            S
          </span>
          <span className="text-lg font-semibold text-slate-900">SpiroAI</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <span
              key={item.label}
              className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                item.active
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-500"
              }`}
            >
              {item.label}
            </span>
          ))}
        </nav>
        <div className="border-t border-slate-200 px-6 py-4 text-xs text-slate-400">
          <Link href="/app" className="text-teal-600 hover:underline">
            ← Open field app
          </Link>
        </div>
      </aside>
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
