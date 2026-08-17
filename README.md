# Hyrule HUD

Hyrule HUD is a live save monitor and minimap power tool for Zelda: Breath of the Wild players who care about completion, routing, and speedrun-friendly map state.

It reads Cemu save files directly, without mods or emulator plugins, then renders live completion stats, player position, route-relevant markers, and save-slot state in a local browser/Electron UI.

> Current release: **v0.2.1 / Phase 1 complete**. BotW on Cemu (Wii U) is supported today, including Normal Mode and Master Mode saves. Download the Windows installer from [the v0.2.1 release](https://github.com/Zainothy/Hyrule-Hud-/releases/tag/v0.2.1).

Built on top of [xanderphillips/botw-live-savegame-monitor](https://github.com/xanderphillips/botw-live-savegame-monitor) and the save-tooling lineage behind it. Full credit is kept in [NOTICE.md](./NOTICE.md).

## Current Support

| Game | Platform | Status |
|---|---|---|
| Breath of the Wild | Cemu / Wii U save format | Supported in v0.2.1 |
| Breath of the Wild | Switch save format | Roadmap |
| Tears of the Kingdom | Switch save format | Roadmap |

## Phase 1 Highlights

- Eight-slot Cemu save detection: slots `0`-`5` for Normal Mode and slots `6`-`7` for Master Mode.
- Save Slot picker with Auto mode and manual slot pinning.
- Cemu title-root resolution: the app accepts a direct profile folder or a title root containing `user/<profile>/0..7`.
- Live player stats, completion counters, player position, and Master Mode tint.
- Stable on-screen minimap icon sizing through zoom-aware counter-scaling.
- Shrine state dropdown: `All States`, `Unactivated`, `Activated`, `Completed`.
- Shrine state colors: unactivated orange, activated blue/orange, completed blue.
- Per-beast Divine Beast iconography and a dedicated Shrine of Resurrection icon.
- Collapsed Map Stats groups for Locations, Divine Beasts, and Mini-Bosses.
- Clean tracking controls for Auto-follow, Marker visibility, and Follow zoom.

## Install

### Windows App

1. Download `Hyrule-HUD-Setup-0.2.1.exe` from [the latest Phase 1 release](https://github.com/Zainothy/Hyrule-Hud-/releases/tag/v0.2.1).
2. Run the installer.
3. In setup, choose your BotW Cemu save folder.

Valid save-folder shapes include:

```text
C:\Emulators\Cemu\mlc01\usr\save\00050000\101c9500
C:\Emulators\Cemu\mlc01\usr\save\00050000\101c9500\user\80000001
```

The first form is the BotW title root. The second form is the resolved Cemu profile root. Hyrule HUD can resolve either shape.

### Local Development

```powershell
npm install
$env:STATIC_ROOT = (Get-Location).Path
node server/server.js
```

Open `http://localhost:3000`.

For real-save development checks through the server entry point, pass the save root through the launcher or `startServer(port, savePath)`. The packaged Electron app writes this as `SAVE_PATH_BASE` after setup.

### Build

```powershell
npm run test:server
npm run lint
npm run build:windows
```

`npm run build:windows` produces an NSIS installer in `dist/` with the artifact name `Hyrule-HUD-Setup-${version}.exe`.

## API

### Live Data Feed

```http
GET /api
```

Returns current save-derived stats such as koroks, locations, shrines, towers, Divine Beasts, hearts, stamina, rupees, playtime, motorcycle ownership, and player position.

### Save Slots

```http
GET /api/slots
```

Returns detected save slots, Normal/Master Mode labels, the configured path, the resolved path, and the active pinned slot.

```json
{
  "ok": true,
  "configuredPath": "C:\\Emulators\\Cemu\\mlc01\\usr\\save\\00050000\\101c9500",
  "resolvedPath": "C:\\Emulators\\Cemu\\mlc01\\usr\\save\\00050000\\101c9500\\user\\80000001",
  "pinnedSlot": null,
  "slots": [
    { "index": 0, "mode": "normal", "mtimeMs": 1786900000000 },
    { "index": 6, "mode": "master", "mtimeMs": 1786920000000 }
  ]
}
```

```http
PATCH /api/state/pinned-slot
Content-Type: application/json

{ "slot": 6 }
```

Use `{ "slot": null }` to return to Auto mode.

### State And Events

The server also exposes state endpoints for map view, hidden marker types, dismissed waypoints, tracking, marker visibility, shrine filtering, and Server-Sent Events at `/api/events`. See route definitions and inline OpenAPI metadata in [server/server.js](./server/server.js).

## Map Rendering Status

The marker layer has zoom-aware sizing, but the base map is currently a single `6000x5000` raster PNG at [assets/images/BotW-Map.png](./assets/images/BotW-Map.png). At high zoom, that base image can pixelate because the browser is enlarging a raster source.

Phase 2 includes a rendering-quality investigation. The likely near-term path is a high-resolution tiled raster pyramid or hybrid raster base plus vector overlays. A true fully vectorized map depends on sourcing or generating reliable vector/topographic data; automatic raster-to-SVG tracing is unlikely to preserve the visual quality of the BotW map.

## Roadmap

### Phase 2 - Info Density And Map Rendering Quality

- Always-on location labels using existing `display_name` metadata.
- Zoom-aware label thresholds based on the current region-label and `--map-scale` patterns.
- Generalized category filters for current save-derived entities.
- Map rendering quality: evaluate tiled raster, hybrid vector overlays, and the feasibility of true vector source data.

### Phase 3 - Search

- Search by display name, internal id, and category.
- Pan/zoom to results while preserving player-marker context.
- Keep save-derived entities distinct from future static-reference entities.

### Phase 4 - Session And Speedrun Tooling

- LiveSplit-compatible route milestones.
- Session stats such as koroks/hour and IGT/RTA drift.
- Stream-safe overlay layout separate from the full power-user sidebar.
- Route helper features such as nearest unclaimed korok or shrine.

### Phase 5 - Platform Expansion

- BotW Switch support.
- Tears of the Kingdom support.
- Parser/data research informed by upstream save-editor projects, with project-owned integration.

### Phase 6 - Static Reference Data

- Optional Zelda Dungeon-style static layers such as enemies, materials, armor, memories, shops, recipes, and broader reference data.
- Clear UI and data boundaries between live save-derived state and static reference layers.

## License

MIT. See [LICENSE](./LICENSE) and [NOTICE.md](./NOTICE.md) for upstream attribution.
