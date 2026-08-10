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

    const select = document.getElementById('save-slot-select');
    if (!select) return;

    function labelFor(slot) {
        const modeLabel = slot.mode === 'master' ? 'Master Mode' : 'Normal Mode';
        const kind = slot.index % 6 === 0 || slot.index === 6 ? 'Manual' : 'Auto';
        return `Slot ${slot.index} — ${modeLabel} (${kind})`;
    }

    async function refresh() {
        let data;
        try {
            const res = await fetch('/api/slots', { cache: 'no-store' });
            data = await res.json();
        } catch {
            return; // server not reachable yet; try again next poll
        }
        if (!data || !data.ok) return;

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

        const target = data.pinnedSlot != null ? String(data.pinnedSlot) : 'auto';
        select.value = [...select.options].some((o) => o.value === target)
            ? target
            : prevValue || 'auto';
    }

    select.addEventListener('change', async () => {
        const value = select.value;
        const slot = value === 'auto' ? null : parseInt(value, 10);
        await fetch('/api/state/pinned-slot', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slot })
        });
    });

    refresh();
    setInterval(refresh, 10000);
})();
