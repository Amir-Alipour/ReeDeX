export type ViewOptions = "exchange" | "tokens" | "chains" | "swap";

export interface ViewType {
    currentView: ViewOptions;
    onSelecting: "from" | "to";
    haveWarning: boolean;
    warningMessage: string;
    useDiffwallet: boolean;
    diffWallet: string;
    isBottomDrawerOpen: boolean;
}

export type ViewActionType =
    | { type: 'SET_CURRENT_VIEW'; payload: ViewOptions }
    | { type: 'SET_ON_SELECTING'; payload: "from" | "to" }
    | { type: 'SET_HAVE_WARNING'; payload: boolean }
    | { type: 'SET_WARNING_MESSAGE'; payload: string }
    | { type: "SET_USE_DIFF_WALLET"; payload: boolean }
    | { type: 'SET_DIFF_WALLET'; payload: string }
    | { type: 'SET_BOTTOM_DRAWER_OPEN'; payload: boolean };
