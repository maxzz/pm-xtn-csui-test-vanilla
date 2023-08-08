export namespace NR { //New resources

    // Resources

    export type IBrandCode = 'dp' | 'hp' | 'de';

    export interface IBrandResource {
        dp?: string;
        hp?: string;
        de?: string;
    }

    export type IChromeResource = string | IBrandResource;

    export interface IChromeResources {
        [id: string]: IChromeResource;
    }

    export interface IMemResources {
        [id: string]: string;
    }

    // Menus

    export interface IResMenuItem {
        cmd: string;    // menu command to send
        t: string;      // message ID of text to show into menu
    }

    export type IResMenu = IResMenuItem[];

    export interface IResMenus {
        [id: string]: IResMenu;
    }

} //namespace NR

export interface IBgIconAccount {
    disp: string;                   // Display text as account name
    tsid: string;                   // ID of this account to send back when item clicked.
}
