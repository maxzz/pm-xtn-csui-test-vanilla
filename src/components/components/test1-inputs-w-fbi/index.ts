import { DpFbi, HTMLElementMax } from "pm-xtn-csui";
import { csResVars, getFBM, wcInstances } from "../../vars";
import { FBIType } from "../../types";
import { AppState, appState, saveAppState } from "../../store";
import './index.css';

export namespace TestFBI {
    let absID = 1000;

    export function createFBIs() {
        let idxDID = 10;
        let inputs = [...document.querySelectorAll<HTMLInputElement>('.test-input')];

        inputs.forEach(inputEl => {
            {
                let newFbi = new DpFbi();
                newFbi.init(csResVars.domCss4.ico, inputEl, idxDID++, getFBM());
                newFbi.initIconType(FBIType.tlogin as any, 't_1574821576');

                newFbi.piggy.id = `${absID++}`;

                wcInstances.fbi.push(newFbi);
            }
            inputEl.id = `${idxDID}`;
        });
    }

    export function reCreateFBIs() {
        // let fbis = [...document.querySelectorAll('dp-fbi')] as DpFbi[];
        // fbis.forEach(_ => _.parentElement.removeChild(_));

        /* 1. Old way when we kept FBI refs globally.
        GLB.fbi.forEach((_: DpFbi) => _.piggy.parentElement.removeChild(_.piggy));
        GLB.fbi = [];
        */

        // 2.
        const fbis = [...document.querySelectorAll('dp-fbi')] as HTMLElementMax<DpFbi>[];

        fbis.forEach(fbi => {
            if (!fbi.maxz) {
                console.log(`%celement without 'maxz' reference`, 'color: red');
            } else {
                fbi.maxz.destroy();
            }
        });

        createFBIs();
    }

}

function initTestFbi() {
    const chkFbi = document.getElementById('showTestsFBI') as HTMLInputElement;

    function updateFbi() {
        appState.showFbi = chkFbi.checked;

        for (let child of [...document.querySelectorAll('.test-fbi-wrap')] as HTMLElement[]) {
            child.style.display = appState.showFbi ? 'block' : 'none';
        }
    }

    chkFbi.addEventListener('click', () => {
        updateFbi();
        saveAppState();
    });

    return { chkFbi, updateFbi };
}

export const htmlFBI = `
<div class="test-fbi-wrap">
    <div class="test-title">
        Test: &lt;dp-fbi&gt; with input controls
    </div>

    <div class="test-fbi-input-group">
        <span class="test-place">
            span before
        </span>

        <input type="text" class="test-input" value="123">

        <span class="test-place">
            span after
        </span>
    </div>

    <hr/>

    <div class="test-fbi-input-group">
        <span class="test-place">
            span before
        </span>

        <input type="text" class="test-input" value="456">

        <span class="test-place">
            span after
        </span>
    </div>

</div>
`;

export function initTest1InputsWFbi(appState: AppState) {
    TestFBI.createFBIs();
    
    const { chkFbi, updateFbi } = initTestFbi();
    chkFbi.checked = appState.showFbi;
    updateFbi();
}
