import { AppState, appState, saveAppState } from "../../store";
import { unbrandWCR_Unpacked } from "../../test-resources";
import { csResVars } from "../../vars";
import { TestIco } from "../test6-icons";
import { TestFBI } from "../test1-inputs-w-fbi";
import { TestFBB } from "../test3-fbb-popup/test-fbb";

export namespace BrandsTest {
    export function setBrand(name: 'hp' | 'dp') {
        console.log(`brand ${name}`);

        // 1. FBB

        csResVars.domCss4 = unbrandWCR_Unpacked(name);

        TestFBB.destroyFBB();
        TestFBB.createFBB();
        TestFBB.updateButtonText();

        // 2. FBIs
        TestFBI.reCreateFBIs();
        // 3. Logos
        TestIco.reCreatelogos();
    }
}

function initTestBrand() {
    const chkBrd = document.getElementById('showTestsHp') as HTMLInputElement;

    function updateBra() {
        appState.showHp = chkBrd.checked;
        BrandsTest.setBrand(appState.showHp ? 'hp' : 'dp');
    }

    chkBrd.addEventListener('click', () => {
        updateBra();
        saveAppState();
    });

    return { chkBrd, updateBra };
}

export function initTest4DpOrHp(appState: AppState) {
    const { chkBrd, updateBra } = initTestBrand();

    chkBrd.checked = appState.showHp;
    updateBra();
}
