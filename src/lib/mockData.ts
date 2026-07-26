export type ConnectionState =
  | "idle"
  | "searching"
  | "found"
  | "connecting"
  | "connected";

export type RiskTier = "Normal" | "Monitor" | "Refer";

export interface MockDevice {
  id: string;
  batteryPercent: number;
  signalStrength: number; // 0-4 bars
}

export interface MeasurementStep {
  instruction: string;
  detail: string;
  durationMs: number;
}

export interface MockResult {
  id: string;
  fev1: number; // liters
  fvc: number; // liters
  timestamp: string; // ISO date
  tier: RiskTier;
}

export interface MockPatient {
  id: string;
  name: string;
  lastTestDate: string;
  fev1: number;
  fvc: number;
  tier: RiskTier;
}

export interface DashboardStats {
  totalTests: number;
  normalPct: number;
  monitorPct: number;
  referPct: number;
  lastSync: string;
}

export const mockDevice: MockDevice = {
  id: "SpiroAI-4821",
  batteryPercent: 76,
  signalStrength: 3,
};

export const mockMeasurementSteps: MeasurementStep[] = [
  {
    instruction: "Take a deep breath in",
    detail: "Fill your lungs completely through the mouthpiece.",
    durationMs: 3000,
  },
  {
    instruction: "Blow out as hard and fast as you can",
    detail: "Push all the air out in one strong burst.",
    durationMs: 3500,
  },
  {
    instruction: "Keep blowing until told to stop",
    detail: "Continue exhaling steadily until the timer ends.",
    durationMs: 4000,
  },
];

export const normalRange = {
  fev1: { min: 3.0, max: 4.5 },
  fvc: { min: 3.5, max: 5.0 },
};

export const mockResult: MockResult = {
  id: "r-2026-07-26",
  fev1: 2.4,
  fvc: 3.6,
  timestamp: "2026-07-26T09:12:00",
  tier: "Monitor",
};

export const mockHistory: MockResult[] = [
  { id: "r-1", fev1: 2.1, fvc: 3.3, timestamp: "2026-04-02T08:40:00", tier: "Refer" },
  { id: "r-2", fev1: 2.2, fvc: 3.4, timestamp: "2026-04-30T09:05:00", tier: "Monitor" },
  { id: "r-3", fev1: 2.3, fvc: 3.5, timestamp: "2026-05-28T08:55:00", tier: "Monitor" },
  { id: "r-4", fev1: 2.5, fvc: 3.7, timestamp: "2026-06-25T09:20:00", tier: "Monitor" },
  { id: "r-5", fev1: 2.6, fvc: 3.8, timestamp: "2026-07-12T09:00:00", tier: "Normal" },
  { id: "r-6", fev1: 2.4, fvc: 3.6, timestamp: "2026-07-26T09:12:00", tier: "Monitor" },
];

export const mockPatients: MockPatient[] = [
  { id: "p-1", name: "Aigerim Bekova", lastTestDate: "2026-07-25", fev1: 2.6, fvc: 3.8, tier: "Normal" },
  { id: "p-2", name: "Talant Osmonov", lastTestDate: "2026-07-24", fev1: 2.1, fvc: 3.2, tier: "Refer" },
  { id: "p-3", name: "Nurgul Sadykova", lastTestDate: "2026-07-24", fev1: 2.3, fvc: 3.5, tier: "Monitor" },
  { id: "p-4", name: "Bakyt Toktosunov", lastTestDate: "2026-07-23", fev1: 2.7, fvc: 3.9, tier: "Normal" },
  { id: "p-5", name: "Cholpon Ismailova", lastTestDate: "2026-07-22", fev1: 2.0, fvc: 3.1, tier: "Refer" },
  { id: "p-6", name: "Ruslan Abdyldaev", lastTestDate: "2026-07-21", fev1: 2.4, fvc: 3.6, tier: "Monitor" },
  { id: "p-7", name: "Aichurok Nazarova", lastTestDate: "2026-07-20", fev1: 2.8, fvc: 4.0, tier: "Normal" },
  { id: "p-8", name: "Marat Dzhumaliev", lastTestDate: "2026-07-19", fev1: 2.2, fvc: 3.3, tier: "Monitor" },
];

export const mockDashboardStats: DashboardStats = {
  totalTests: 214,
  normalPct: 58,
  monitorPct: 31,
  referPct: 11,
  lastSync: "2 hours ago",
};

export const tierStyle: Record<
  RiskTier,
  { bg: string; text: string; dot: string; label: string }
> = {
  Normal: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", label: "Normal" },
  Monitor: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", label: "Monitor" },
  Refer: { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500", label: "Refer to Specialist" },
};

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
