import { csResVars } from "./vars";
import { htmlFBI, initTest1InputsWFbi } from "./components/test1-inputs-w-fbi";
import { htmlLogoStates, initTest2LogoStates } from "./components/test2-logo-states";
import { htmlButtonShowFBB, initTest3FbbPopup } from "./components/test3-fbb-popup";
import { initTest4DpOrHp } from "./components/test4-dp-or-hp";
import { htmlHighlight, initTest5Highlighter } from "./components/test5-highlighter";
import { htmlLogo, initTest6Icons } from "./components/test6-icons";
import { htmlFBM } from "./components/test7-fbm";
import { htmlTestButtons, initControls } from "./controls";
import { unbrandWCR_Unpacked } from "./test-resources";
import { appState } from "./store";

const html = `
    ${htmlTestButtons}
    ${htmlButtonShowFBB}
    ${htmlFBI}
    ${htmlLogoStates}
    ${htmlLogo}
    ${htmlFBM}
    ${htmlHighlight}
`;

export function main() {
    csResVars.domCss4 = unbrandWCR_Unpacked('dp');

    const appEl = document.getElementById('app');
    appEl.innerHTML = html;

    initTest6Icons(appState);
    initTest4DpOrHp(appState); // This should be done ahead of the rest to load proper brand resources.

    initControls(appState);
    initTest1InputsWFbi(appState);
    initTest2LogoStates(appState);
    initTest5Highlighter(appState);
    initTest3FbbPopup(appState);
}
