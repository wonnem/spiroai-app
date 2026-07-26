import { MobileFrame } from "@/components/MobileFrame";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200 py-10">
      <MobileFrame>{children}</MobileFrame>
    </div>
  );
}
