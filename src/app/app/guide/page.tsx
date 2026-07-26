"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mockMeasurementSteps } from "@/lib/mockData";

const totalDuration = mockMeasurementSteps.reduce((sum, s) => sum + s.durationMs, 0);

export default function GuidePage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [elapsedInStep, setElapsedInStep] = useState(0);

  useEffect(() => {
    const step = mockMeasurementSteps[stepIndex];
    const tickMs = 100;
    const interval = setInterval(() => {
      setElapsedInStep((prev) => {
        const next = prev + tickMs;
        if (next >= step.durationMs) {
          clearInterval(interval);
          if (stepIndex < mockMeasurementSteps.length - 1) {
            setStepIndex((i) => i + 1);
            setElapsedInStep(0);
          } else {
            router.push("/app/result");
          }
        }
        return next;
      });
    }, tickMs);
    return () => clearInterval(interval);
  }, [stepIndex, router]);

  const step = mockMeasurementSteps[stepIndex];
  const stepProgress = Math.min(100, (elapsedInStep / step.durationMs) * 100);
  const elapsedBefore = mockMeasurementSteps
    .slice(0, stepIndex)
    .reduce((sum, s) => sum + s.durationMs, 0);
  const overallProgress = Math.min(
    100,
    ((elapsedBefore + elapsedInStep) / totalDuration) * 100,
  );

  return (
    <div className="flex h-full min-h-[720px] flex-col justify-between px-6 py-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Step {stepIndex + 1} of {mockMeasurementSteps.length}
        </p>
        <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200">
          <div
            className="h-1.5 rounded-full bg-teal-600 transition-all"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full bg-teal-500/20"
            style={{ transform: `scale(${0.7 + (stepProgress / 100) * 0.3})` }}
          />
          <div className="absolute inset-4 rounded-full bg-teal-500/30" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-teal-600 text-3xl">
            🫁
          </div>
        </div>

        <div>
          <h1 className="text-xl font-semibold text-slate-900">{step.instruction}</h1>
          <p className="mt-2 text-sm text-slate-500">{step.detail}</p>
        </div>

        <svg viewBox="0 0 300 60" className="w-full max-w-[260px]" style={{ height: 60 }}>
          <path
            d={buildFlowPath(stepProgress)}
            fill="none"
            stroke="#0d9488"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </svg>
      </div>

      <p className="pb-2 text-center text-xs text-slate-400">Keep the mouthpiece sealed with your lips</p>
    </div>
  );
}

function buildFlowPath(progress: number): string {
  const points = 24;
  const visible = Math.max(1, Math.round((progress / 100) * points));
  let d = "M0,30";
  for (let i = 1; i <= visible; i++) {
    const x = (i / points) * 300;
    const y = 30 + Math.sin(i * 0.9) * 18 * Math.min(1, i / 4);
    d += ` L${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d;
}
