import { DomCss4, DpIco, DpFbi, DpFbm, DpLit } from "pm-xtn-csui";

export const csResVars: { domCss4: DomCss4; } = {
    domCss4: {}
};

type WCInstances = {
    ico: DpIco[];
    fbi: DpFbi[];
    fbm: DpFbm | null;
    lit: DpLit | null;
};

export const wcInstances: WCInstances = {
    ico: [], // [...document.querySelectorAll('dp-ico')] as DpIco[];
    fbi: [],
    fbm: null,
    lit: null
};

export function getFBM(): DpFbm {
    // this.menu = document.querySelector('dp-fbm');
    // if (!this.menu) {
    //     this.menu = document.createElement('dp-fbm') as DpFbm;
    //     this.menu.setAttribute('id', 'dpmaxz_fbm_gui');
    //     document.body.appendChild(this.menu);
    // }
    if (!wcInstances.fbm) {
        wcInstances.fbm = new DpFbm(csResVars.domCss4.fbm);
        wcInstances.fbm.onCommand = (cmd: string, fieldDid: number) => {
            console.log(`FBI did ${fieldDid} command ${cmd}`);
        };
        wcInstances.fbm.appendMeToDoc();
    }
    return wcInstances.fbm;
}
