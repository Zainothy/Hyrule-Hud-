/**
 * save-slots.js — manual save-slot picker
 *
 * Fixes the class of bug where auto-detection can't find a Master Mode save:
 * lists every slot (0-5 Normal, 6-7 Master Mode) that actually exists on
 * disk, and lets the user pin the viewer to one directly instead of relying
 * on "whichever file has the newest mtime."
 */
(function () {
    'use strict';

    function initSaveSlots() {
        const select = document.getElementById('save-slot-select');
        if (!select) return;

        function labelFor(slot) {
            const modeLabel =
                slot.mode === 'master' ? 'Master Mode' : 'Normal Mode';
            const kind =
                slot.index % 6 === 0 || slot.index === 6 ? 'Manual' : 'Auto';
            return `Slot ${slot.index} — ${modeLabel} (${kind})`;
        }

        async function refresh() {
            let data;
            try {
                const res = await fetch('/api/slots', { cache: 'no-store' });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                data = await res.json();
            } catch {
                if (window.HyruleHudSaveErrors) {
                    window.HyruleHudSaveErrors.show('slots_unavailable');
                }
                return; // server not reachable yet; try again next poll
            }
            if (!data || !data.ok) {
                if (window.HyruleHudSaveErrors) {
                    window.HyruleHudSaveErrors.show('slots_unavailable');
                }
                return;
            }

            if (window.HyruleHudSaveErrors) {
                window.HyruleHudSaveErrors.clearIf('slots_unavailable');
            }

            // Re-tint the whole UI (cyan -> crimson) when the active slot is
            // Master Mode, so the mode is legible at a glance, not just in
            // the dropdown text.
            const active =
                data.pinnedSlot != null
                    ? data.slots.find((s) => s.index === data.pinnedSlot)
                    : data.slots[0];
            document.body.classList.toggle(
                'mode-master',
                !!active && active.mode === 'master'
            );

            const prevValue = select.value;
            select.innerHTML = '';

            const autoOpt = document.createElement('option');
            autoOpt.value = 'auto';
            autoOpt.textContent = 'Auto (most recent)';
            select.appendChild(autoOpt);

            data.slots.forEach((slot) => {
                const opt = document.createElement('option');
                opt.value = String(slot.index);
                opt.textContent = labelFor(slot);
                select.appendChild(opt);
            });

            if (data.slots.length === 0) {
                const emptyOpt = document.createElement('option');
                emptyOpt.value = 'empty';
                emptyOpt.textContent = 'No save slots found';
                emptyOpt.disabled = true;
                select.appendChild(emptyOpt);
            }

            const target =
                data.pinnedSlot != null ? String(data.pinnedSlot) : 'auto';
            select.value = [...select.options].some((o) => o.value === target)
                ? target
                : prevValue || 'auto';
        }

        select.addEventListener('change', async () => {
            const value = select.value;
            if (value === 'empty') return;
            const slot = value === 'auto' ? null : parseInt(value, 10);
            try {
                const res = await fetch('/api/state/pinned-slot', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ slot })
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                if (window.HyruleHudSaveErrors) {
                    window.HyruleHudSaveErrors.clearIf('slots_unavailable');
                }
                await refresh();
            } catch {
                if (window.HyruleHudSaveErrors) {
                    window.HyruleHudSaveErrors.show('slots_unavailable');
                }
            }
        });

        refresh();
        setInterval(refresh, 10000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSaveSlots);
    } else {
        initSaveSlots();
    }
})();
