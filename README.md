# Hyrule HUD

A power-user live save monitor and minimap, built for completionists and
speedrunners — not just casual progress-tracking.

It reads your emulator's save files directly (no mods, no plugins, no game
modification) and renders live completion stats, player position, and route
info in the browser, updating automatically whenever you save.

> **Status:** early fork, actively being reshaped. BotW on Cemu (Wii U) works
> today, including Master Mode. Everything else below is roadmap — see
> [Roadmap](#roadmap).

Built on top of [xanderphillips/botw-live-savegame-monitor](https://github.com/xanderphillips/botw-live-savegame-monitor)
and the save-tooling lineage behind it. Full credit in [NOTICE.md](./NOTICE.md).

---

## What changed vs. upstream

The upstream project only scanned Cemu save slots `0`–`5`. BotW's own
on-disk convention is actually **`0`–`7`**: slots `0`–`5` are Normal Mode
(0 manual, 1–5 auto-saves), and slots `6`–`7` are reserved for **Master
Mode**. Because upstream hardcoded the range to 6 slots, any Master Mode
playthrough was structurally invisible to it — not a config problem, a range
bug.

Fixed here:

- Slot scanning now covers all 8 slots, Normal and Master Mode alike.
- A **manual save-slot picker** in the sidebar (`Save Slot` dropdown) lets
  you pin the viewer to a specific slot instead of trusting
  "most recently modified" auto-detection — the thing upstream had no way
  to do at all.
- New `GET /api/slots` and `PATCH /api/state/pinned-slot` endpoints so this
  is scriptable too.

---

## Roadmap

The end goal is a genuine swiss-army-knife minimap: one tool, multiple
games, multiple platforms, built for people who care about routing and
splits, not just "did I find this shrine yet."

- [x] BotW — Cemu (Wii U), Normal + Master Mode
- [ ] BotW — Switch (Yuzu/Ryujinx/real console via extracted save)
- [ ] Tears of the Kingdom support (different save format entirely — separate
      parser, not a copy-paste of the BotW one)
- [ ] Auto-splits / timer integration (LiveSplit-compatible) on shrines,
      towers, Divine Beast defeats
- [ ] Route/pathing helper — nearest unclaimed korok or shrine from current
      position
- [ ] Session stats — koroks/hour, IGT vs RTA drift, run comparison
- [ ] Clean stream-safe overlay layout, separate from the full power-user
      sidebar
- [ ] Restyled UI pass (current UI is still visually upstream's; functional
      but not the "clean" look this project is aiming for yet)

Switch and TotK support are separate, real reverse-engineering efforts
(different save encryption/format, not a config change) — they're tracked as
GitHub issues rather than promised on a timeline. Contributions welcome.

---

## Setup

### Docker (recommended for now)

```
cd server
cp .env.example .env   # set SAVE_PATH to your Cemu save root
docker compose up -d --build
```

`SAVE_PATH` should point at the save-profile root, e.g.:

```
SAVE_PATH=/path/to/Cemu/mlc01/usr/save/00050000/101c9400/user/80000001
```

(Not the `0/` subfolder — the container mounts slots `0`–`7` automatically.)

Open `http://localhost:3000`.

### Windows executable

Same as upstream for now: `npm run build:windows` produces an installer via
electron-builder. Auto-update/publish config points at a placeholder repo —
update `package.json`'s `build.publish` and `author`/`repository` fields to
your own GitHub username before building a release.

---

## API

### Live data feed

```
GET /api
```

Returns current stats (koroks, shrines, towers, Divine Beasts, hearts,
stamina, rupees, player position, etc.) as JSON — same shape as upstream,
useful for stream overlays, Discord bots, or logging.

### Save slots

```
GET /api/slots
```

```json
{
  "ok": true,
  "pinnedSlot": null,
  "slots": [
    { "index": 0, "mode": "normal", "mtime": 1234567890 },
    { "index": 6, "mode": "master", "mtime": 1234567999 }
  ]
}
```

```
PATCH /api/state/pinned-slot
Body: { "slot": 6 }   // or { "slot": null } to go back to auto-detect
```

### Everything else

State API (map view, tracking, hidden types, dismissed waypoints) and the
SSE event stream (`/api/events`) are unchanged from upstream — see inline
comments in `server/server.js` for details while docs here catch up.

---

## License

MIT — see [LICENSE](./LICENSE) and [NOTICE.md](./NOTICE.md) for upstream
attribution.
