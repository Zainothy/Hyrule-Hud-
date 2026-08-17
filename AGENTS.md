# Hyrule HUD Agent Instructions

This repo uses an Obsidian PKM folder as the project context engine.

## Read First

Before planning or changing code, read the PKM in this order:

1. `C:\Obsidian Vaults\Main Personal\05. Programming and CS\Hyrule-Hud\INDEX.md`
2. `C:\Obsidian Vaults\Main Personal\05. Programming and CS\Hyrule-Hud\Project.md`
3. `C:\Obsidian Vaults\Main Personal\05. Programming and CS\Hyrule-Hud\Planning.md`
4. `C:\Obsidian Vaults\Main Personal\05. Programming and CS\Hyrule-Hud\Findings.md`
5. `C:\Obsidian Vaults\Main Personal\05. Programming and CS\Hyrule-Hud\Roadmap.md`
6. `C:\Obsidian Vaults\Main Personal\05. Programming and CS\Hyrule-Hud\handoff.md`

Keep those notes current with implementation reality. Do not create a separate `.planning` tree unless the user explicitly changes the workflow.

## Current Project State

Hyrule HUD is an all-in-one speedrun/general-use minimap power tool for Zelda: Breath of the Wild, currently focused on live Cemu save monitoring.

Phase 1 is complete. It delivered real Cemu save-slot detection, Master Mode support, player-data verification, readable minimap iconography, shrine state controls, player marker/Auto-follow controls, and aligned grouped Map Stats.

Phase 2 should start from the PKM handoff and focus on information density: always-on location labels and generalized map category filters.

## Local Verification

Real Cemu save root:

```text
C:\Emulators\Cemu\mlc01\usr\save\00050000\101c9500
```

Server from repo root:

```powershell
$env:STATIC_ROOT = (Get-Location).Path
node server/server.js
```

Useful checks:

```powershell
Invoke-RestMethod -Uri http://localhost:3000/api/slots | ConvertTo-Json -Depth 5
Invoke-RestMethod -Uri http://localhost:3000/api/mtime | ConvertTo-Json -Depth 5
Invoke-RestMethod -Uri http://localhost:3000/api | ConvertTo-Json -Depth 5
npm run test:server
npm run lint
```

## Execution Style

Use GSD when phase planning/execution is requested, but adapt it to this repo's PKM-first workflow. The user prefers decisive execution: make conservative, codebase-consistent choices and ask only when a decision would materially change scope or intent.

If a decisive-execution skill is available in the active skill list, use it. If not, proceed with the closest GSD discuss/plan/execute flow and keep the PKM updated.

## Guardrails

- Preserve Phase 1 behavior unless the user explicitly changes it.
- Use `rg` for code search.
- Keep changes scoped to the requested phase.
- Do not hardcode user-specific save paths into committed app defaults.
- Preserve upstream license/provenance when importing or transforming external data, especially from `marcrobledo/savegame-editors`.
