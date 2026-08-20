# Hyrule HUD

Hyrule HUD is a live save monitor and minimap for Zelda: Breath of the Wild players who care about completion, routing, and speedrun map state.

It reads Cemu save files directly, without mods or emulator plugins, and shows completion stats, player position, route markers, and save-slot state in a native Electron window.

> Current source: **v0.3.0**. BotW on Cemu (Wii U) is supported, including Normal Mode and Master Mode saves. The app opens in its own Electron window by default. The tray still has an optional browser action.

Built on top of [xanderphillips/botw-live-savegame-monitor](https://github.com/xanderphillips/botw-live-savegame-monitor) and the save-tooling lineage behind it. Full credit is kept in [NOTICE.md](./NOTICE.md).

## Current Support

| Game | Platform | Status |
|---|---|---|
| Breath of the Wild | Cemu / Wii U save format | Supported in v0.3.0 source |
| Breath of the Wild | Switch save format | Roadmap |
| Tears of the Kingdom | Switch save format | Roadmap |

## Highlights

- Eight-slot Cemu save detection: slots `0`-`5` for Normal Mode and slots `6`-`7` for Master Mode.
- Save Slot picker with Auto mode and manual slot pinning.
- Cemu title-root resolution: the app accepts a direct profile folder or a title root containing `user/<profile>/0..7`.
- Live player stats, completion counters, player position, and Master Mode tint.
- Stable minimap icon sizing while zooming.
- Shrine state dropdown: `All States`, `Unactivated`, `Activated`, `Completed`.
- Shrine state colors: unactivated orange, activated blue/orange, completed blue.
- Per-beast Divine Beast iconography and a dedicated Shrine of Resurrection icon.
- Collapsed Map Stats groups for Locations, Divine Beasts, and Mini-Bosses.
- Clean tracking controls for Auto-follow, Marker visibility, and Follow zoom.
- Always-on location labels for current map waypoints.
- Zoom-density tiers: towers at low zoom, then shrines and Divine Beasts, then bosses and POIs, then Koroks.
- Map Stats rows can force-show zoom-hidden categories or hide visible categories without changing the compact sidebar.
- Separate undefeated and defeated rows for Hinox, Talus, and Molduga.
- Native Electron app window by default, with close-to-tray behavior.
- Optional tray action to open the same local app in the system browser for second-device or LAN workflows.

## Release Notes - v0.3.0

### Native App Shell

Hyrule HUD opens in its own Electron `BrowserWindow` instead of handing the UI to the system browser. Closing the window hides it to tray; Quit stays in the tray menu.

The tray now uses `Open Window` as the main action and keeps `Open in Browser` for LAN, second-device, or debugging workflows. The main window follows the same Electron security pattern as setup: `contextIsolation: true`, `nodeIntegration: false`, and a preload bridge.

### Map Density And Labels

Map icon density now follows a Zelda Dungeon-style zoom ladder. Minimum zoom shows overview anchors such as towers and player context. The next tier adds shrines and Divine Beasts. Mid zoom adds mini-bosses and most non-Korok POIs. Koroks come later because they are dense, but not so late that they feel buried.

Labels trail their matching icons. Boss icons can appear early without dumping every boss label onto the map. Sidebar toggles also stopped resetting zoom-hidden icons and labels; user-hidden state and zoom-density state are composed separately.

### Explicit Map Visibility Controls

Map Stats rows now behave more like Zelda Dungeon filters. Click a zoom-hidden row to force-show that category at the current zoom. Click a visible row to hide it. Click a hidden row to show it again.

The click targets sit over the existing icon rail, so the sidebar keeps the original compact stat-dot layout. Hidden state still wins over force-visible state, and the server prevents `hiddenTypes` and `forcedVisibleTypes` from storing contradictory values. Labels still obey their own density thresholds when icons are force-shown.

### Mini-Boss Filters

Mini-Bosses now split undefeated and defeated rows:

- `Hinox`
- `Hinox Defeated`
- `Talus`
- `Talus Defeated`
- `Molduga`
- `Molduga Defeated`

You can hide defeated bosses while keeping undefeated bosses visible, or force-show one boss family at low zoom.

### Fixes And Polish

- Fixed the map-density reset bug where toggling sidebar categories made hidden labels and icons reappear until the next zoom change.
- Fixed mini-boss label thresholds so boss icons can appear early while their labels render later.
- Kept the existing Shrine summary glyph and Map Stats rail alignment while adding visibility controls.
- Removed the visible sidebar-control styling that moved icons, selected text, drew slash marks, or covered counts.

### Verification

- Verified live Cemu save-root behavior against the local development server.
- Verified Molduga force-show/hide at minimum zoom through the running app.
- Verified `npm run test:server`.
- Verified `npm run lint` passes with only the existing unused-variable warnings.
- Verified Windows packaging with `npm run build:windows -- --config.directories.output=dist-v0.3.0`.

## Install

### Windows App

1. Download the latest `Hyrule-HUD-Setup-*.exe` from [Releases](https://github.com/Zainothy/Hyrule-Hud-/releases).
2. Run the installer.
3. In setup, choose your BotW Cemu save folder.
4. Hyrule HUD opens in its own app window. Closing the window hides it to the system tray; use the tray menu to reopen, quit, reconfigure, or open the app in your browser.

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

Open `http://localhost:3000`, or run the Electron app so it loads the local server in a native window.

For real-save development checks through the server entry point, pass the save root through the launcher or `startServer(port, savePath)`. The packaged Electron app passes the configured save path after setup.

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

The marker layer has zoom-aware sizing, but the base map is currently a single `6000x5000` raster PNG at [assets/images/BotW-Map.png](./assets/images/BotW-Map.png). At high zoom, that base image can pixelate because the Chromium renderer is enlarging a raster source.

Phase 2 includes a rendering-quality investigation. The likely near-term path is a high-resolution tiled raster pyramid or hybrid raster base plus vector overlays. A true fully vectorized map depends on sourcing or generating reliable vector/topographic data; automatic raster-to-SVG tracing is unlikely to preserve the visual quality of the BotW map.

## Roadmap

### Phase 2 - Info Density And Map Rendering Quality

- Always-on location labels using existing `display_name` metadata.
- Zoom-aware icon and label thresholds based on the current region-label and `--map-scale` patterns.
- Explicit per-category visibility controls for zoom-suppressed and user-hidden map entities.
- Generalized category filters for current save-derived entities.
- Map rendering quality: evaluate tiled raster, hybrid vector overlays, and the feasibility of true vector source data.

### Phase 2.5 - Native App Window

- Default to a native Electron `BrowserWindow` instead of opening the system browser.
- Keep the existing local server, API, and Server-Sent Events architecture.
- Hide to tray on window close; Quit remains explicit in the tray menu.
- Keep "Open in Browser" as an optional tray action.

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
