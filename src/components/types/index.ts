import { FbbOut } from 'pm-xtn-csui';

export * from './types-pm-res';
export * from './types-bgdog.controller';

export enum FBIType {
    unini = -2,
    hideicon = -1,
    nlogin = 1,
    tlogin = 3,
    change = 16
}

export enum ILogoState {
    tlogin = "t",
    nlogin = "n",
    clogin = "c",
    ok = "ok",
    no = "no",
    hide = "h",
    show = "s"
}

export enum FbbEventType {
    name = "fbb-event",
    show = "s",
    enough = "e",
    destroy = "d",
    command = "c"
}

export interface FbbEventAny {
    ev: FbbEventType.show | FbbEventType.enough | FbbEventType.destroy;
}

export interface FbbEventCmd {
    ev: FbbEventType.command;
    out: FbbOut;
}

export type FbbEvent = FbbEventAny | FbbEventCmd;
