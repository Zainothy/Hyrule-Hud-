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

- Reads live BotW Cemu saves without mods or emulator plugins, including Normal Mode and Master Mode slots.
- Runs as a native Electron app with tray behavior; browser access is still available from the tray.
- Shows completion stats, current slot state, player position, and route-relevant map markers in one view.

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

## Local API

Most users can ignore this. The local API exists because the Electron window and optional browser view both talk to the same Express server. It is useful for debugging save detection, checking the active slot, or building a local overlay against Hyrule HUD's live state.

Start the app first. In development, the server uses `http://localhost:3000` unless you set `PORT`. In the installed Electron app, use the port chosen in setup; the tray's `Open in Browser` action opens the exact local URL.

```powershell
$baseUrl = "http://localhost:3000"
```

| Endpoint | Purpose |
|---|---|
| `GET /api` | Current save-derived stats: koroks, locations, shrines, towers, Divine Beasts, hearts, stamina, rupees, playtime, motorcycle state, and player position. |
| `GET /api/slots` | Detected save slots, Normal/Master Mode labels, configured path, resolved profile path, and active pinned slot. |
| `PATCH /api/state/pinned-slot` | Pins a save slot. Send `{ "slot": null }` to return to Auto mode. |
| `GET /api/events` | Server-Sent Events stream used by the UI for live updates. |

Examples:

```powershell
Invoke-RestMethod "$baseUrl/api" | ConvertTo-Json -Depth 5
Invoke-RestMethod "$baseUrl/api/slots" | ConvertTo-Json -Depth 5

Invoke-RestMethod `
  -Method Patch `
  -Uri "$baseUrl/api/state/pinned-slot" `
  -ContentType "application/json" `
  -Body '{ "slot": 6 }'
```

Other state routes cover map view, hidden marker types, forced-visible marker types, dismissed waypoints, tracking, marker visibility, and shrine filtering. See the route definitions in [server/server.js](./server/server.js) when you need the exact request body.

## Map Rendering Status

The marker layer has zoom-aware sizing, but the base map is currently a single `6000x5000` raster PNG at [assets/images/BotW-Map.png](./assets/images/BotW-Map.png). At high zoom, that base image can pixelate because the Chromium renderer is enlarging a raster source.

Phase 2 includes a rendering-quality investigation. The likely near-term path is a high-resolution tiled raster pyramid or hybrid raster base plus vector overlays. A true fully vectorized map depends on sourcing or generating reliable vector/topographic data; automatic raster-to-SVG tracing is unlikely to preserve the visual quality of the BotW map.

## Roadmap

### ~~Phase 2 - Info Density And Map Rendering Quality~~

- [x] ~~Always-on location labels using existing `display_name` metadata.~~
- [x] ~~Zoom-aware icon and label thresholds based on the current region-label and `--map-scale` patterns.~~
- [x] ~~Explicit per-category visibility controls for zoom-suppressed and user-hidden map entities.~~
- [x] ~~Generalized category filters for current save-derived entities.~~
- [x] ~~Map rendering quality: evaluate tiled raster, hybrid vector overlays, and the feasibility of true vector source data.~~

### ~~Phase 2.5 - Native App Window~~

- [x] ~~Default to a native Electron `BrowserWindow` instead of opening the system browser.~~
- [x] ~~Keep the existing local server, API, and Server-Sent Events architecture.~~
- [x] ~~Hide to tray on window close; Quit remains explicit in the tray menu.~~
- [x] ~~Keep "Open in Browser" as an optional tray action.~~
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
