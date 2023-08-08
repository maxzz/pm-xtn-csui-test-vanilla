import { formatWith } from "pm-xtn-dom/es6";
import { IBgResShield } from "../../types";

export namespace TestFBBLocals {
    export function quoPck(src: string) {
        // If has single quotas return as it is, otherwise replace " to ' and add {~} as prefix
        return /'/.test(src) ? src : `{~}${src.replace(/"/g, '\'')}`;
    }

    export function quoUnp(src: string) {
        // Remove {~} prefix and return back double quotas
        return /^{~}/.test(src) ? src.slice(3).replace(/'/g, '"') : src;
    }

    export namespace TestLocalization {
        export class testResShieldCh implements IBgResShield {
            private testRes = {
                'dpmaxs_txt_title': 'Save password?', //'dpmaxs_txt_title_update': 'Update password?',
                'dpmaxs_txt_ok': 'Save',
                'dpmaxs_txt_no': 'Close',
                'dpmaxs_txt_ne': 'Never',
                'dpmaxs_txt_bodyupd': 'Would you like DigitalPersona Password Manager to save password for www.google.com?',
                'dpmaxs_txt_bodyadd': 'Would you like DigitalPersona Password Manager to save password for www.google.com?',
                'dpmaxz_safeacc': 'dpmaxz_safeacc',
                'dpmaxz_safeurl': 'dpmaxz_safeurl',
                //'': '',
                'fbb_title_new': 'Save password?',
                'fbb_title_upd': 'Update password?',
                'fbb_hint': 'DigitalPersona Password Manager can save password for {website}.',
                'fbb_btn_never_tip': 'Never ask to save password for this website. You can change this option from the DigitalPersona Password Manager User Dashboard.',
                'fbb_field_user': 'Username',
                'fbb_field_pass': 'Password',
                'fbb_btn_save_new': 'Save',
                'fbb_btn_save_upd': 'Update password',
                'fbb_btn_never': 'Never',
            };

            str(id: keyof typeof this.testRes): string { return this.testRes[id]; } //chrome.i18n.getMessage(id);
            url(res: string): string { return ''; } //chrome.extension.getURL(res); //get url
            res(id: keyof typeof this.testRes): string { return this.testRes[id]; } //chrome.i18n.getMessage(id);
        }
    } //namespace TestLocalization

    export let i18n = new TestLocalization.testResShieldCh();

    export function formatRes(s: string): string {
        // 0. The same as formatWith but getting format strings from locale strings.
        return s.replace(/{([\w\$_-]+)}/gm, (match, name) => i18n.str(name) || match);
    }

} //namespace TestFBBLocals

export function localizeFbbDomi(domiStr: string, isNew: boolean, website: string): string {
    // 1. select resource strings for 'save' or 'update'.
    let s = domiStr.replace(/_xyz/g, isNew ? '_new' : '_upd');

    // 2. localize all strings.
    s = TestFBBLocals.formatRes(s);

    // 3. replace website name with a separate span.
    const parts = TestFBBLocals.i18n.str('fbb_hint').replace('{website}', '{1}{_}{1}').split('{1}'); // that will give us always 3 parts.
    const indexWebsite = parts.indexOf('{_}');

    let spans = [0, 1, 2].reduce((acc, cur) => {
        acc[`hint-cls-${cur}`] = `hint-${cur !== indexWebsite ? 'text' : 'site'}`; // make classname 'hint-text' or 'hint-site'
        acc[`hint_txt_${cur}`] = cur !== indexWebsite ? parts[cur] : website; // replace '{_}' wiht the real site name
        return acc;
    }, {} as Record<string, string>);

    return formatWith(s, spans);
}
