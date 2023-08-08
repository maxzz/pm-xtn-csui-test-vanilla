import { DpIco } from "pm-xtn-csui";
import { ILogoState } from "../../types";
import { wcInstances } from "../../vars";
import { AppState, appState, saveAppState } from "../../store";
import './index.css';

function initLogoStateListeners() {
    // 1. States
    const btns = ['stateNew', 'stateTra', 'stateCha', 'stateOk', 'stateNo'].map(id => document.getElementById(id));

    btns.forEach((btnEl) => {
        btnEl.addEventListener('click', (event: MouseEvent) => {
            wcInstances.ico.forEach((ico: DpIco) => {
                setIconState(ico, event.target as HTMLElement);
            });
        });
    });

    function setIconState(ico: DpIco, el: HTMLElement) {
        let newState = el.dataset.state as ILogoState;
        let currentState = ico.piggy.dataset.mystate as ILogoState;

        if (newState === ILogoState.clogin && newState === currentState) { // flip clogin to tlogin and back to check animation
            newState = ILogoState.tlogin;
        }

        ico.piggy.dataset.mystate = newState;
        ico.state = newState as any;
        ico.applyAttrs();
    }

    // 2. Visibility
    const stateVis = document.getElementById('stateVis');
    stateVis.dataset.vis = 's';
    stateVis.addEventListener('click', () => {
        const isHidden = stateVis.dataset.vis === 'h';

        wcInstances.ico.forEach((ico: DpIco) => {
            stateVis.dataset.vis = isHidden ? 's' : 'h';
            ico.state = (isHidden ? ILogoState.show : ILogoState.hide) as any;
        });
    });

}

function initTestLogo() {
    initLogoStateListeners();

    const chkLog = document.getElementById('showTestsLogo') as HTMLInputElement;

    function updateLog() {
        appState.showLog = chkLog.checked;
        for (let child of [...document.querySelectorAll('.test-logo-wrap')] as HTMLElement[]) {
            child.style.display = appState.showLog ? 'block' : 'none';
        }
    }

    chkLog.addEventListener('click', () => {
        updateLog();
        saveAppState();
    });

    return { chkLog, updateLog };
}

export const htmlLogoStates = `
<div class="test-logo-wrap">

    <div class="test-title">
        Test: &lt;dp-ico&gt; states
    </div>

    <div class="test-logo-single">
    
        <div class="state-icons-wrap">
            <dp-ico></dp-ico>
            <dp-ico></dp-ico>
        </div>

        <div class="state-icons-btns">
            <button class="test-button" id="stateTra" data-state="t">Trained</button>
            <button class="test-button" id="stateNew" data-state="n">New</button>
            <button class="test-button" id="stateCha" data-state="c">Change</button>

            <button class="test-button" id="stateOk"  data-state="ok">FB: OK</button>
            <button class="test-button" id="stateNo"  data-state="no">FB: NO</button>

            <button class="test-button" id="stateVis">
                Hide
            </button>
        </div>

    </div>
</div>
`;

export function initTest2LogoStates(appState: AppState) {
    const { chkLog, updateLog } = initTestLogo();
    
    chkLog.checked = appState.showLog;
    updateLog();
}
