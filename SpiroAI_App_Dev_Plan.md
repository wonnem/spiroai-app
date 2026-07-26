# SpiroAI App Development Plan (UI-only, No Backend)

> Based on: SpiroAI PRD (Low-Cost AI Spirometer & Primary Respiratory Screening Solution)
> Scope: Frontend/UI demo only. All data is hardcoded (mock JSON / local state). No real backend, no real device connection, no real AI inference.
> Purpose: Demonstrate realistic, functioning app/web flow (not a pitch-deck showcase — that's handled separately in the presentation).
> Language: English only.

---

## 1. Overview

Two layout contexts in one project:

| Context | Screens | Layout |
|---|---|---|
| **Patient/Field App** | Splash & Device Connect, Measurement Guide, Result, History & Trend | Mobile app frame (fixed width, e.g. 390px, phone-frame chrome) |
| **Institution Dashboard** | Institution Dashboard | PC / desktop wide layout |

Both can live in the same project (e.g. a route like `/app` for mobile-frame screens and `/dashboard` for the desktop view), sharing the same design system and mock data source.

---

## 2. Screens

### 2.1 Splash / Device Connect (Mobile)
- App logo / loading splash
- "Connect Device" button → BLE pairing simulation
  - States: Searching... → Device Found (SpiroAI-XXXX) → Connecting... → Connected
- Device status indicators (mock): battery %, signal strength
- CTA: "Start Test" → navigates to Measurement Guide

### 2.2 Measurement Guide (Mobile)
- Step-by-step coaching text (hardcoded sequence):
  1. "Take a deep breath in"
  2. "Blow out as hard and fast as you can"
  3. "Keep blowing until told to stop"
- Real-time flow animation:
  - Animated breathing/lung graphic and/or live-updating flow curve (fake data driven by a timer, not real sensor input)
- Progress indicator (e.g. countdown or step progress bar)
- On completion → auto-navigate to Result screen

### 2.3 Result (Mobile)
- FEV1 and FVC values (hardcoded numbers)
- 3-tier classification badge: **Normal / Monitor / Refer to Specialist**
  - Color-coded (green / yellow / red)
- Comparison bar/chart: user's value vs. normal reference range
- Small badge: "AI-corrected (1D-CNN)" to signal the correction step conceptually (no real model, just a UI label/tooltip)
- CTA buttons: "Save Result" / "View History"

### 2.4 History & Trend (Mobile)
- List of past measurements (hardcoded array, e.g. 5-8 entries with dates)
- Trend line chart of FEV1 (or FEV1/FVC ratio) over time
- Tapping an entry shows a mini detail view (same 3-tier badge as Result screen)

### 2.5 Institution Dashboard (Desktop/PC)
- Wide layout, sidebar + main content (standard admin dashboard pattern)
- Patient/user list table: name (mock), last test date, FEV1/FVC, risk tier
- Summary stats cards: total tests this month, % Normal / Monitor / Refer, device sync status
- Simple filter/sort on the table (client-side only, on hardcoded data)
- EHR sync status indicator (mock: "Last synced 2 hours ago" style, no real integration)

---

## 3. Design System (Phase 0 deliverable)

- Color palette: clinical-but-approachable (blues/teals as primary, green/amber/red reserved strictly for the 3-tier risk system so it stays meaningful)
- Typography: clear, legible, works at small mobile sizes and wide desktop sizes
- Mobile app frame component: reusable wrapper (phone bezel/status bar mock) used across screens 2.1–2.4
- Desktop dashboard shell: reusable sidebar + topbar layout used for screen 2.5
- Shared components: risk badge, stat card, chart wrapper, button styles

---

## 4. Data Model (Hardcoded)

All mock data lives in a single local data file/object (no API calls):

```
mockDevice = { id, batteryPercent, signalStrength, connectionState }
mockMeasurementSteps = [ ...coaching text sequence... ]
mockResult = { fev1, fvc, tier, timestamp }
mockHistory = [ mockResult, mockResult, ... ]
mockPatients = [ { name, lastTestDate, fev1, fvc, tier }, ... ]
mockDashboardStats = { totalTests, normalPct, monitorPct, referPct, lastSync }
```

State transitions (e.g. device connecting, measurement progress) are simulated with `setTimeout`/`useState`, not real async calls.

---

## 5. Development Phases

| Phase | Goal | Output |
|---|---|---|
| 0 | Design system + shared components (mobile frame, dashboard shell, risk badge, chart wrapper) | Reusable component set |
| 1 | Splash / Device Connect screen | Working mobile screen 1 |
| 2 | Measurement Guide screen (core animation) | Working mobile screen 2 |
| 3 | Result screen | Working mobile screen 3 |
| 4 | History & Trend screen | Working mobile screen 4 |
| 5 | Institution Dashboard (desktop) | Working desktop screen |
| 6 | Navigation wiring + full mock data flow + polish | End-to-end clickable demo (mobile flow + separate desktop dashboard) |

---

## 6. Out of Scope (explicitly excluded per current direction)

- Real backend / API / database
- Real BLE device communication
- Real AI/ML inference (1D-CNN correction is a UI label only)
- Multi-language support (English only)
- Pitch-deck style intro/GTM/SWOT screens (handled in the separate presentation)
