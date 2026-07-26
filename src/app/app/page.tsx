"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mockDevice } from "@/lib/mockData";

type ConnectionState = "idle" | "searching" | "found" | "connecting" | "connected";

const STEP_DELAYS: Record<Exclude<ConnectionState, "idle">, number> = {
  searching: 1200,
  found: 800,
  connecting: 1000,
  connected: 0,
};

export default function ConnectPage() {
  const router = useRouter();
  const [state, setState] = useState<ConnectionState>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleConnect() {
    setState("searching");
    timeoutRef.current = setTimeout(() => {
      setState("found");
      timeoutRef.current = setTimeout(() => {
        setState("connecting");
        timeoutRef.current = setTimeout(() => {
          setState("connected");
        }, STEP_DELAYS.connecting);
      }, STEP_DELAYS.found);
    }, STEP_DELAYS.searching);
  }

  const statusText: Record<ConnectionState, string> = {
    idle: "No device connected",
    searching: "Searching for nearby devices…",
    found: `Device found: ${mockDevice.id}`,
    connecting: `Connecting to ${mockDevice.id}…`,
    connected: `Connected to ${mockDevice.id}`,
  };

  return (
    <div className="flex h-full min-h-[720px] flex-col items-center justify-between px-6 py-10 text-center">
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-600 text-3xl font-bold text-white shadow-lg">
          S
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">SpiroAI</h1>
          <p className="mt-1 text-sm text-slate-500">Field Screening App</p>
        </div>

        <div className="mt-4 w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-center gap-2">
            {state !== "idle" && state !== "connected" && (
              <span className="h-2 w-2 animate-pulse rounded-full bg-teal-500" />
            )}
            {state === "connected" && <span className="h-2 w-2 rounded-full bg-emerald-500" />}
            <p className="text-sm font-medium text-slate-700">{statusText[state]}</p>
          </div>

          {state === "connected" && (
            <div className="mt-4 flex justify-center gap-6 text-sm text-slate-500">
              <span>🔋 {mockDevice.batteryPercent}%</span>
              <span>{"📶".repeat(1)} {mockDevice.signalStrength}/4</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full">
        {state !== "connected" ? (
          <button
            onClick={handleConnect}
            disabled={state !== "idle"}
            className="w-full rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white shadow-sm transition disabled:opacity-60"
          >
            {state === "idle" ? "Connect Device" : "Connecting…"}
          </button>
        ) : (
          <button
            onClick={() => router.push("/app/guide")}
            className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Start Test
          </button>
        )}
      </div>
    </div>
  );
}
