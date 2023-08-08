import { FbbIn, FbbRes, DpFbb, } from "pm-xtn-csui";
import { csResVars } from "../../vars";
import { localizeFbbDomi } from "./utils";

export namespace TestFBB {
    export function createFbbIn(): FbbIn {
        let isNew = true;
        let website = 'www.google.com'; //let website = 'www.google.com/update/user/login/verylongname';

        const fbbRes: FbbRes = {
            css: csResVars.domCss4.fbb.css,
            dom: localizeFbbDomi(csResVars.domCss4.fbb.dom, isNew, website)
        };

        const fbbIn: FbbIn = {
            lines: [{ value: 'max', values: ['max', 'maxzz', 'maxzz', 'google.com'] }],
            grbId: 'any123',
            res: fbbRes
        };

        return fbbIn;
    }

    export let gDpFbb: DpFbb;

    export function updateButtonText(showHide?: boolean) {
        setTimeout(() => {
            if (showHide === undefined) {
                showHide = !gDpFbb;
            }
            (document.querySelector('#showFbb') as HTMLElement).innerText = showHide ? 'Show' : 'Hide';
        }, 0);
    }

    export function destroyFBB() {
        let fbb = gDpFbb;
        if (fbb) {
            fbb.destroy();
            gDpFbb = null;
        }
    }

    export function createFBB() {
        let fbb = gDpFbb;
        if (!fbb) {
            let fbbIn = createFbbIn();
            fbb = new DpFbb(csResVars.domCss4.ico, fbbIn);
            fbb.reveal(false);
            document.body.appendChild(fbb.piggy);
            gDpFbb = fbb;
            setInDoc();
        }
    }

    let gAutoDestroy: boolean = false;
    let gEnableElement: HTMLInputElement;
    export const setClass = (name: string) => document.getElementById('destroyTimer').className = name;

    function setInDoc() {
        gDpFbb.indoc(800, 3000, gAutoDestroy ? 1000 : undefined);
        if (gAutoDestroy) {
            gEnableElement && (gEnableElement.disabled = gAutoDestroy);
            setClass('');

            let text = document.getElementById('destroyTimer');
            let left: number = 800 + 3000 + 1000 - 100;
            let interval = setInterval(() => {
                left -= 100;
                text.innerText = `${left}`;
                if (left <= 0 || !gDpFbb) { // clear interval if done or FBB closed.
                    clearInterval(interval);
                    text.innerText = '';
                    gEnableElement && (gEnableElement.disabled = false);
                    console.log('interval done');
                }
            }, 100);
        }
    }

    export function setAutoDestroy(auto: boolean, enableElement: HTMLInputElement) {
        gAutoDestroy = auto;
        gEnableElement = enableElement;

        if (gDpFbb) {
            setInDoc();
        } else {
            createFBB();
        }
    }

    export function setReveal(onOff: boolean) {
        if (gDpFbb) {
            gDpFbb.reveal(onOff);
        }
    }

} //namespace TestFBB
