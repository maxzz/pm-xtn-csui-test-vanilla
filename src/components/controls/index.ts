import { AppState } from '../store';
import './index.css';
import { initGapAfterControls } from './test7-gap-under-controls';

function checkbox(id: string, label: string, more: string = '') {
    return `
        <label class="test-checkbox">
            <input type="checkbox" id="${id}">
            <span>${label}</span>
            ${more}
        </label>
`;
}

const htmlButtons = `
<!-- 0. controls -->
<div class="test-btns-layout">
    ${checkbox("showTestsFBI", "Show test: input controls with FBI")}
    ${checkbox("showTestsLogo", "Show test: Logo state tests")}
    ${checkbox("showHighlight", "Show test: Highlight")}
    <br/>
    ${checkbox("showTestsHp", "Show HP or DP")}
    ${checkbox("showPlaceholders", "Show gap under controls panel")}
    <br/>
    ${checkbox("showAutoDestroy", "FBB auto destroy by timer", '<span id="destroyTimer"></span>')}
    ${checkbox("revealFbb", "FBB reveal")}
</div>
`;

const htmlPlaceholders = `
<div class="test-big-place"></div>
<div class="test-big-place"></div>
<div class="test-big-place"></div>
<div class="test-big-place"></div>
<!-- 0. controls done -->
`;

export const htmlTestButtons = `
${htmlButtons}
${htmlPlaceholders}
`;


export function initControls(appState: AppState) {
    const { chkPla, updatePla } = initGapAfterControls();

    chkPla.checked = appState.showPla;
    updatePla();
}