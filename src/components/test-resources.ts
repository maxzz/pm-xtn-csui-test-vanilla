import { APIMSG_I2Cs_IMenuUID, DomCss4, csResMenus } from "pm-xtn-csui";
import { IDomiArray, quoUnp } from "pm-xtn-dom/es6";
import { unbrandWCR } from 'pm-xtn-csui-res/es6';
import { NR, IBgIconAccount } from "./types/types-pm-res";

const menuRes = {
    "dpmaxz_MID_n": "[{\"cmd\":\"addlogin\",\"t\":\"cmd_addlogin\"},{\"cmd\":\"openpm\",\"t\":\"cmd_openpm\"},{\"cmd\":\"help\",\"t\":\"cmd_help\"}]",
    "dpmaxz_MID_c": "[{\"cmd\":\"chgpsw\",\"t\":\"cmd_chgpsw\"},{\"cmd\":\"openpm\",\"t\":\"cmd_openpm\"},{\"cmd\":\"help\",\"t\":\"cmd_help\"}]",
    "dpmaxz_MID_t": "[{\"cmd\":\"fillin\",\"t\":\"cmd_fillin\"},{\"cmd\":\"editprofile\",\"t\":\"cmd_editprofile\"},{\"cmd\":\"addprofile\",\"t\":\"cmd_addprofile\"},{\"cmd\":\"openpm\",\"t\":\"cmd_openpm\"},{\"cmd\":\"help\",\"t\":\"cmd_help\"}]",
    "ui_fbmenus": "dpmaxz_MID_n@dpmaxz_MID_c@dpmaxz_MID_t",
};

export function unbrandWCR_Unpacked(brand: 'dp' | 'hp'): DomCss4 {
    let res: DomCss4 = unbrandWCR(brand);

    [res.ico, res.fbb, res.lit]
        .forEach(domcss => {
            if (!domcss) {
                return;
            }

            Object.keys(domcss)
                .forEach(key => {
                    if (key === 'dom') {
                        domcss[key] = quoUnp(domcss[key] || '');
                    }
                });
        });

    return res;
}

// namespace csRes2 {
//     export let menuDomis: { [key: string /*I2Cs.IMenuUniqueID*/]: IDomiString; } = {};
//     // not used: export let fbiDomi: string;
// }
// var csRes: CsResMenus = {
//     menuDomis: {},
//     fbiDomi: ''
// };

csResMenus.menuDomis['t_1574821576'] = JSON.stringify(
    [
        "ul", { "id": "t_1574821576" }, [
            "li", { "class": "menu-row", "data-cmd": "fillin" }, ["span", { "class": "row-txt" }, "Fill in logon data"]
        ], [
            "li", { "class": "menu-row", "data-cmd": "editprofile" }, ["span", { "class": "row-txt" }, "Edit logon"]
        ], [
            "li", { "class": "menu-row", "data-cmd": "addprofile" }, ["span", { "class": "row-txt" }, "Add logon"]
        ], [
            "li", { "class": "menu-row", "data-cmd": "openpm" }, ["span", { "class": "row-txt" }, "Open Password Manager"]
        ], [
            "li", { "class": "menu-row", "data-cmd": "help" }, ["span", { "class": "row-txt" }, "Help"]
        ]
    ]
);

/* TODO: copy with replaced class names */
class GenFbiMenu_Not_Used_Yet {
    static makePopupMenu(muid: APIMSG_I2Cs_IMenuUID, constMenuItems: NR.IResMenu, accs?: IBgIconAccount[]): IDomiArray {

        let ul = ['ul', { id: `${muid}` }]; //TODO: I'm not sure that we are using this ID at all.

        if (accs && accs.length > 1) {
            // Multiple accounts
            constMenuItems.forEach((item_: NR.IResMenuItem, index_: number) => {
                if (index_ === 0) {
                    // Replace '0' item with list of fill-in + account name.
                    accs.forEach((account: IBgIconAccount) => ul.push(menuRowPattern(`${item_.cmd}:${account.tsid}`, `${item_.t} (${account.disp})`)));
                } else if (index_ !== 1) {
                    // Ignore/Skip '1'st item: it is the 'edit account', but we have multiple accounts.
                    ul.push(menuRowPattern(item_.cmd, item_.t));
                }
            });
        }
        else {
            // Single is if there are no accounts (i.e undefined) or just one account.
            constMenuItems.forEach((row: NR.IResMenuItem) => ul.push(menuRowPattern(row.cmd, row.t)));
        }

        return ul;

        function menuRowPattern(id: string, text: string): IDomiArray {
            // 0. Pattern for menu row.
            //    <li class="menu-row" id="dpmaxz_addlogin">
            //        <span class="row-icn"> </span>
            //        <span class="row-txt">Add to Password Manager</span>
            //    </li>
            return [
                'li', { 'class': 'menu-row', 'data-dpmaxz-cmd': id }, //['span', { 'class': 'row-icn' }],
                ['span', { 'class': 'row-txt' }, text]
            ];
        }
    }

} //class genFbiMenu

//window.customElements.define('dp-ico', DpIco);
//window.customElements.define('dp-lit', DpLit);
//window.customElements.define('dp-fbm', DpFbm);
//window.customElements.define('dp-fbi', DpFbi);
//window.customElements.define('dp-fbb', DpFbb);
