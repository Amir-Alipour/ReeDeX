export type ViewOptions = "exchange" | "tokens" | "chains"

export interface ViewType {
    currentView: ViewOptions;
    onSelecting: "from" | "to";
    haveWarning: boolean;
    warningMessage: string;
    useDiffwallet: boolean;
    diffWallet: string
}

export type ViewActionType =
    | { type: 'SET_CURRENT_VIEW'; payload: "exchange" | "tokens" | "chains" }
    | { type: 'SET_ON_SELECTING'; payload: "from" | "to" }
    | { type: 'SET_HAVE_WARNING'; payload: boolean }
    | { type: 'SET_WARNING_MESSAGE'; payload: string }
    | { type: "SET_USE_DIFF_WALLET"; payload: boolean }
    | { type: 'SET_DIFF_WALLET'; payload: string };
