# Attribution

Hyrule HUD started as a fork of [xanderphillips/botw-live-savegame-monitor](https://github.com/xanderphillips/botw-live-savegame-monitor),
itself built on a lineage of open-source Zelda save-file tooling. The save
parsing approach (hash-keyed field lookup within `game_data.sav`), the map
renderer, and the original Docker/Electron packaging all originate there.

Credit, per the upstream README:

- **Marc Robledo** — [savegame-editors](https://github.com/marcrobledo/savegame-editors), the original save-parsing logic this is all descended from (MIT).
- **Eric Defore / d4mation** — [botw-unexplored-viewer](https://github.com/d4mation/botw-unexplored-viewer), the map overlay foundation.
- **MrCheeze** — [botw-waypoint-map](https://github.com/MrCheeze/botw-waypoint-map) and [botw-tools](https://github.com/MrCheeze/botw-tools) datamining research.
- **xanderphillips** — the live-monitor / state-API / Electron packaging fork this project builds on directly.
- **zeldamods** — [objmap](https://github.com/zeldamods/objmap) and [radar](https://github.com/zeldamods/radar) for map icon and label data.

This project is licensed MIT, same as upstream. See `LICENSE`.
