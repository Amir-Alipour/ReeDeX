export type ViewOptions = "exchange" | "tokens" | "chains"

export interface ViewType {
    currentView: ViewOptions;
    onSelecting: "from" | "to";
}

export type ViewActionType =
    | { type: 'SET_CURRENT_VIEW'; payload: "exchange" | "tokens" | "chains" }
    | { type: 'SET_ON_SELECTING'; payload: "from" | "to" }
