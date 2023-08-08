import { wcInstances, csResVars } from "../../vars";
import { ILogoState } from "../../types";
import { AppState } from "../../store";
import { DpIco } from "pm-xtn-csui";

export namespace TestIco {
    
    export function initLogos() {
        wcInstances.ico.forEach((logo) => {
            logo.fitted = true;
            logo.state = ILogoState.tlogin as any;
            logo.dim = { w: 120, h: 120 };
        });
    }

    function createIco(el: HTMLElement) {
        const newIco = new DpIco(csResVars.domCss4.ico);
        el.replaceWith(newIco.piggy);
        return newIco;
    }

    export function createLogos() {
        const iconsInDocAlready = [...document.querySelectorAll('dp-ico')] as HTMLElement[];

        wcInstances.ico = iconsInDocAlready.map((el: HTMLElement) => createIco(el));
    }

    export function reCreatelogos() {
        const iconsInDocAlready = [...document.querySelectorAll('dp-ico')] as HTMLElement[];

        wcInstances.ico = wcInstances.ico.map((iconInDoc: DpIco) => {
            let el = iconsInDocAlready.find(el => el === iconInDoc.piggy);
            if (!el) {
                throw new Error('No document dp-ico');
            }
            return createIco(el);
        });

        initLogos();
    }

} //namespace TestIco

export const htmlLogo = `
<!-- 
<div class="test-big-place"></div>
<div> 
    <div class="test-place">Text before LOGO</div>

    <dp-ico></dp-ico>

    <div class="test-place">Text after</div>
</div>

<div class="test-big-place"></div>
-->
`;

export function initTest6Icons(appState: AppState) {
    TestIco.createLogos();
    TestIco.initLogos();
}
