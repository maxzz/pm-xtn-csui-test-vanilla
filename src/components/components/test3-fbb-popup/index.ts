import { FbbEvent, FbbEventType } from "../../types";
import { saveAppState, appState, AppState } from "../../store";
import { TestFBB } from "./test-fbb";
import './index.css';

function initFbbListeners() {
    document.querySelector('#showFbb').addEventListener('click', function onShowHideClick() {
        let fbb = TestFBB.gDpFbb;
        if (fbb) {
            TestFBB.destroyFBB();
        } else {
            TestFBB.createFBB();
        }
        TestFBB.updateButtonText(!fbb);
    });

    function HandleCustomEvent(event: CustomEvent<FbbEvent>) {
        const { detail } = event;
        switch (detail.ev) {
            case FbbEventType.destroy: {
                console.log('fbb-event: Destroy', detail);
                TestFBB.setClass('');

                TestFBB.gDpFbb = null;
                TestFBB.updateButtonText(true);
                break;
            }
            case FbbEventType.command: {
                console.log('fbb-event: Commannd', detail);

                TestFBB.destroyFBB();
                TestFBB.updateButtonText(true);
                break;
            }
            case FbbEventType.show: {
                TestFBB.gDpFbb.reveal(true);
                console.log('fbb-event: Show', detail);
                TestFBB.setClass('shown');
                break;
            }
            case FbbEventType.enough: {
                console.log('fbb-event: Enough', detail);
                TestFBB.setClass('enough');
                break;
            }
            default: {
                console.log('fbb-event: Any', detail);
            }
        }
    }

    (window.addEventListener as any)(FbbEventType.name, HandleCustomEvent);
}

function initTestFbb() {
    initFbbListeners();

    let chkReveal = document.getElementById('revealFbb') as HTMLInputElement;
    chkReveal.checked = true;
    const updateReveal = () => {
        TestFBB.setReveal(chkReveal.checked);
    };
    chkReveal.addEventListener('click', () => { updateReveal(); });
    return { chkReveal, updateReveal };
}

function initTestAutoDestroy() {
    const chkAuto = document.getElementById('showAutoDestroy') as HTMLInputElement;

    function updateAuto() {
        appState.autoDel = chkAuto.checked;
        TestFBB.setAutoDestroy(chkAuto.checked, chkAuto);
    }

    chkAuto.addEventListener('click', () => {
        updateAuto();
        saveAppState();
    });

    return { chkAuto, updateAuto };
}

export const htmlButtonShowFBB = `
<dp-fbb></dp-fbb>
<div id="test-button-show">
    <button id="showFbb" class="test-button">Show</button>
</div>
`;

export function initTest3FbbPopup(appState: AppState) {
    TestFBB.createFBB();

    const { chkAuto, updateAuto } = initTestAutoDestroy();
    chkAuto.checked = appState.autoDel;
    updateAuto();

    const { chkReveal, updateReveal } = initTestFbb();
    chkReveal.checked = appState.fbbRveal;
    updateReveal();
}
