/* Hinox / Talus / Molduga spawn locations — hash + coordinates.
 *
 * Hashes and their defeated-state offsets come from
 * marcrobledo/savegame-editors (github.com/marcrobledo/savegame-editors),
 * the root ancestor of this project's own lineage (see NOTICE.md) — same
 * license family, not a new third-party dependency.
 *
 * Coordinates are marcrobledo's [x, elevation, z] with the elevation value
 * dropped and z remapped to Hyrule HUD's y, matching this project's existing
 * 2D map-plane convention (verified against 1087 hashes shared with
 * map-locations.js — exact match to available precision).
 *
 * Display names are generic ("Hinox #N") — no curated per-spawn names were
 * available in the source dataset. Numbering has no in-game significance,
 * it's just iteration order over the source hash list.
 */

var hinoxLocations = {
    0x3aefa053: {"internal_name":"Enemy_Hinox_001", "display_name":"Hinox #1", "x":256.5, "y":-913.5},
    0x805cf1f2: {"internal_name":"Enemy_Hinox_002", "display_name":"Hinox #2", "x":1940.5, "y":2396.5},
    0xd815d3e0: {"internal_name":"Enemy_Hinox_003", "display_name":"Hinox #3", "x":-2217.0, "y":584.0},
    0x1fb33ad5: {"internal_name":"Enemy_Hinox_004", "display_name":"Hinox #4", "x":4146.69, "y":-2225.24},
    0x04a74790: {"internal_name":"Enemy_Hinox_005", "display_name":"Hinox #5", "x":-1062.0, "y":3771.5},
    0xee812327: {"internal_name":"Enemy_Hinox_006", "display_name":"Hinox #6", "x":100.5, "y":3371.0},
    0x03415ecc: {"internal_name":"Enemy_Hinox_007", "display_name":"Hinox #7", "x":-1273.5, "y":-2113.5},
    0xb2d689b6: {"internal_name":"Enemy_Hinox_008", "display_name":"Hinox #8", "x":2078.62, "y":3450.66},
    0x7259e3c5: {"internal_name":"Enemy_Hinox_009", "display_name":"Hinox #9", "x":-4260.15, "y":-3777.49},
    0x051ed62c: {"internal_name":"Enemy_Hinox_010", "display_name":"Hinox #10", "x":-491.34, "y":-1009.82},
    0xd7223944: {"internal_name":"Enemy_Hinox_011", "display_name":"Hinox #11", "x":1969.04, "y":97.4},
    0x8d865b78: {"internal_name":"Enemy_Hinox_012", "display_name":"Hinox #12", "x":2414.72, "y":1177.84},
    0xa4589fc1: {"internal_name":"Enemy_Hinox_013", "display_name":"Hinox #13", "x":1330.55, "y":2623.94},
    0x2524aa37: {"internal_name":"Enemy_Hinox_014", "display_name":"Hinox #14", "x":2768.06, "y":2711.58},
    0x3e847dde: {"internal_name":"Enemy_Hinox_015", "display_name":"Hinox #15", "x":3250.94, "y":1331.62},
    0x67d1ae47: {"internal_name":"Enemy_Hinox_016", "display_name":"Hinox #16", "x":3210.17, "y":2996.33},
    0x97ceb661: {"internal_name":"Enemy_Hinox_017", "display_name":"Hinox #17", "x":1493.39, "y":3092.14},
    0x59dd8037: {"internal_name":"Enemy_Hinox_018", "display_name":"Hinox #18", "x":626.49, "y":-305.54},
    0x43756237: {"internal_name":"Enemy_Hinox_019", "display_name":"Hinox #19", "x":3288.75, "y":-1256.24},
    0xcde51b3f: {"internal_name":"Enemy_Hinox_020", "display_name":"Hinox #20", "x":4537.11, "y":3701.95},
    0x382acf32: {"internal_name":"Enemy_Hinox_021", "display_name":"Hinox #21", "x":-1704.3, "y":1776.78},
    0x48e5f7a0: {"internal_name":"Enemy_Hinox_022", "display_name":"Hinox #22", "x":2930.51, "y":-298.4},
    0x4f42ed0c: {"internal_name":"Enemy_Hinox_023", "display_name":"Hinox #23", "x":-1534.88, "y":-171.59},
    0xbbb6a93d: {"internal_name":"Enemy_Hinox_024", "display_name":"Hinox #24", "x":341.82, "y":-3116.14},
    0x036d6e47: {"internal_name":"Enemy_Hinox_025", "display_name":"Hinox #25", "x":1031.43, "y":3496.26},
    0xef37a9be: {"internal_name":"Enemy_Hinox_026", "display_name":"Hinox #26", "x":2990.9, "y":787.92},
    0xacd67339: {"internal_name":"Enemy_Hinox_027", "display_name":"Hinox #27", "x":-2370.05, "y":-419.59},
    0xa27c9e39: {"internal_name":"Enemy_Hinox_028", "display_name":"Hinox #28", "x":-480.55, "y":-2039.64},
    0x43b9424b: {"internal_name":"Enemy_Hinox_029", "display_name":"Hinox #29", "x":4442.0, "y":350.94},
    0x2880a2b8: {"internal_name":"Enemy_Hinox_030", "display_name":"Hinox #30", "x":421.0, "y":329.5},
    0xb9f89458: {"internal_name":"Enemy_Hinox_031", "display_name":"Hinox #31", "x":3526.26, "y":364.97},
    0x0862ac9c: {"internal_name":"Enemy_Hinox_032", "display_name":"Hinox #32", "x":-752.49, "y":-1268.12},
    0x4b9dc25a: {"internal_name":"Enemy_Hinox_033", "display_name":"Hinox #33", "x":2693.7, "y":2967.57},
    0xe8d22126: {"internal_name":"Enemy_Hinox_034", "display_name":"Hinox #34", "x":3489.38, "y":-3335.78},
    0x7096ce54: {"internal_name":"Enemy_Hinox_035", "display_name":"Hinox #35", "x":-4531.0, "y":-2679.27},
    0x1d753114: {"internal_name":"Enemy_Hinox_036", "display_name":"Hinox #36", "x":-3793.68, "y":-1557.1},
    0x6c0b0cd8: {"internal_name":"Enemy_Hinox_037", "display_name":"Hinox #37", "x":2917.42, "y":-3561.4},
    0xe9600685: {"internal_name":"Enemy_Hinox_038", "display_name":"Hinox #38", "x":2485.1, "y":-133.56},
    0xd31c00e1: {"internal_name":"Enemy_Hinox_039", "display_name":"Hinox #39", "x":2420.75, "y":2782.59},
    0x3e012222: {"internal_name":"Enemy_Hinox_040", "display_name":"Hinox #40", "x":-1177.05, "y":118.51},
};

var talusLocations = {
    0x740a06af: {"internal_name":"Enemy_Talus_001", "display_name":"Talus #1", "x":2372.52, "y":-1998.62},
    0xe7898ded: {"internal_name":"Enemy_Talus_002", "display_name":"Talus #2", "x":1336.1, "y":-3043.21},
    0xce9d58d6: {"internal_name":"Enemy_Talus_003", "display_name":"Talus #3", "x":1795.54, "y":-1746.73},
    0xce449f1c: {"internal_name":"Enemy_Talus_004", "display_name":"Talus #4", "x":2141.56, "y":-2178.47},
    0x2ac739b3: {"internal_name":"Enemy_Talus_005", "display_name":"Talus #5", "x":2146.5, "y":-3011.5},
    0x4fe566ae: {"internal_name":"Enemy_Talus_006", "display_name":"Talus #6", "x":-3073.5, "y":-2918.5},
    0x1eff6ae3: {"internal_name":"Enemy_Talus_007", "display_name":"Talus #7", "x":-3709.5, "y":-2347.0},
    0x2bda4f24: {"internal_name":"Enemy_Talus_008", "display_name":"Talus #8", "x":-3558.72, "y":1560.07},
    0x827917a9: {"internal_name":"Enemy_Talus_009", "display_name":"Talus #9", "x":-2144.88, "y":-3082.59},
    0xd4144bdf: {"internal_name":"Enemy_Talus_010", "display_name":"Talus #10", "x":-2919.99, "y":1294.27},
    0x0e72d42d: {"internal_name":"Enemy_Talus_011", "display_name":"Talus #11", "x":3199.41, "y":1904.36},
    0x977c89d8: {"internal_name":"Enemy_Talus_012", "display_name":"Talus #12", "x":1186.62, "y":1642.77},
    0x47633bd7: {"internal_name":"Enemy_Talus_013", "display_name":"Talus #13", "x":1465.91, "y":1328.91},
    0x7e7cba50: {"internal_name":"Enemy_Talus_014", "display_name":"Talus #14", "x":-1087.75, "y":1663.18},
    0xf9921240: {"internal_name":"Enemy_Talus_015", "display_name":"Talus #15", "x":2527.5, "y":1904.5},
    0x0d0ba40c: {"internal_name":"Enemy_Talus_016", "display_name":"Talus #16", "x":3272.52, "y":3409.85},
    0xa35cfe58: {"internal_name":"Enemy_Talus_017", "display_name":"Talus #17", "x":1392.02, "y":3727.59},
    0x45920271: {"internal_name":"Enemy_Talus_018", "display_name":"Talus #18", "x":1257.12, "y":2176.52},
    0x602fdbce: {"internal_name":"Enemy_Talus_019", "display_name":"Talus #19", "x":1690.73, "y":3335.62},
    0xc785de56: {"internal_name":"Enemy_Talus_020", "display_name":"Talus #20", "x":705.34, "y":1471.88},
    0x593975d6: {"internal_name":"Enemy_Talus_021", "display_name":"Talus #21", "x":359.34, "y":1904.02},
    0x8c05c385: {"internal_name":"Enemy_Talus_022", "display_name":"Talus #22", "x":3992.27, "y":-158.82},
    0x18fa31b0: {"internal_name":"Enemy_Talus_023", "display_name":"Talus #23", "x":-176.93, "y":1771.62},
    0xc2e87e02: {"internal_name":"Enemy_Talus_024", "display_name":"Talus #24", "x":-2277.5, "y":1979.0},
    0x0164fe15: {"internal_name":"Enemy_Talus_025", "display_name":"Talus #25", "x":-1896.0, "y":2044.68},
    0x9efc3339: {"internal_name":"Enemy_Talus_026", "display_name":"Talus #26", "x":4558.5, "y":2465.0},
    0x162d11f4: {"internal_name":"Enemy_Talus_027", "display_name":"Talus #27", "x":-2177.47, "y":-1585.39},
    0xec80ecfa: {"internal_name":"Enemy_Talus_028", "display_name":"Talus #28", "x":-2898.47, "y":2210.99},
    0xa4ae04d3: {"internal_name":"Enemy_Talus_029", "display_name":"Talus #29", "x":-514.75, "y":1181.74},
    0xf897773d: {"internal_name":"Enemy_Talus_030", "display_name":"Talus #30", "x":-4312.06, "y":1446.89},
    0xe3677e8a: {"internal_name":"Enemy_Talus_031", "display_name":"Talus #31", "x":-971.13, "y":3236.14},
    0xe43a5cec: {"internal_name":"Enemy_Talus_032", "display_name":"Talus #32", "x":771.5, "y":-1014.0},
    0xccc79db5: {"internal_name":"Enemy_Talus_033", "display_name":"Talus #33", "x":-2096.46, "y":3037.91},
    0x5c4ff2a8: {"internal_name":"Enemy_Talus_034", "display_name":"Talus #34", "x":-136.65, "y":-956.26},
    0x187ccce5: {"internal_name":"Enemy_Talus_035", "display_name":"Talus #35", "x":-3804.76, "y":1204.77},
    0x5d6ad526: {"internal_name":"Enemy_Talus_036", "display_name":"Talus #36", "x":-3248.41, "y":-1078.12},
    0xf05443e4: {"internal_name":"Enemy_Talus_037", "display_name":"Talus #37", "x":-3137.5, "y":72.9},
    0xcc9ba064: {"internal_name":"Enemy_Talus_038", "display_name":"Talus #38", "x":-2864.5, "y":-1825.91},
    0xfa12fcda: {"internal_name":"Enemy_Talus_039", "display_name":"Talus #39", "x":-768.74, "y":-804.49},
    0x0b7267c0: {"internal_name":"Enemy_Talus_040", "display_name":"Talus #40", "x":-3929.3, "y":-1083.48},
};

var moldugaLocations = {
    0x878420a2: {"internal_name":"Enemy_Molduga_001", "display_name":"Molduga #1", "x":-4832.61, "y":2800.42},
    0xb5c0ad83: {"internal_name":"Enemy_Molduga_002", "display_name":"Molduga #2", "x":-4191.12, "y":3797.45},
    0x6070b591: {"internal_name":"Enemy_Molduga_003", "display_name":"Molduga #3", "x":-4555.62, "y":3256.35},
    0xec88c5a2: {"internal_name":"Enemy_Molduga_004", "display_name":"Molduga #4", "x":-3799.06, "y":3653.43},
};
