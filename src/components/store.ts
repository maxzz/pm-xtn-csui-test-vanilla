export type AppState = {
    showPla: boolean;
    showFbi: boolean;
    showLog: boolean;
    showHp: boolean;
    autoDel: boolean;
    fbbRveal: boolean;
};

export let appState: AppState = {
    showPla: true,
    showFbi: false,
    showLog: false,
    showHp: false,
    autoDel: false,
    fbbRveal: false,
};

const STORE_KEY = 'web-components-store';

let ls = localStorage.getItem(STORE_KEY);
ls && (appState = JSON.parse(ls));

export const saveAppState = () => localStorage.setItem(STORE_KEY, JSON.stringify(appState));
