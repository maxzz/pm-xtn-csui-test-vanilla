import { appState, saveAppState } from "../store";

export function initGapAfterControls() {
    const chkPla = document.getElementById('showPlaceholders') as HTMLInputElement;

    function updatePla() {
        appState.showPla = chkPla.checked;
        for (let child of [...document.querySelectorAll('.test-big-place')].slice(1) as HTMLElement[]) {
            child.style.display = appState.showPla ? 'block' : 'none';
        }
    }

    chkPla.addEventListener('click', () => {
        updatePla();
        saveAppState();
    });

    return { chkPla, updatePla };
}
