import { DpLit } from "pm-xtn-csui";
import { wcInstances, csResVars } from "../../vars";
import { AppState } from "../../store";

namespace TestHighlight {

    export function setState(onOff: boolean) {
        let lit: DpLit = wcInstances.lit;
        if (!lit) {
            let hili = document.querySelector('dp-lit') as HTMLElement;

            wcInstances.lit = lit = new DpLit(csResVars.domCss4.lit, hili);
            if (!hili) {
                lit.appendMeToDoc();
            }
        }

        let test = document.querySelector('.test-btns-layout') as HTMLElement;
        if (test) {
            if (onOff) {
                let pmat = false;
                lit.highlight(test, pmat);
            } else {
                lit.hide();
            }
        }
    }
}

function initTestHighlight() {
    const chkHili = document.getElementById('showHighlight') as HTMLInputElement;

    function updateHili() {
        TestHighlight.setState(chkHili.checked);
    }

    chkHili.addEventListener('click', () => { updateHili(); });
}

export const htmlHighlight = `
<br>
<div class="test-hili-wrap"></div>
<dp-lit></dp-lit>
`;

export function initTest5Highlighter(appState: AppState) {
    initTestHighlight()
}
