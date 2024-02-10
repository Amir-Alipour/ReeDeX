import { ViewType, ViewActionType } from "@/types/view";
import { createContext, useReducer } from "react";

export const initialState: ViewType = {
    currentView: "exchange",
    onSelecting: "from",
    haveWarning: false,
    warningMessage: "",
    useDiffwallet: false,
    diffWallet: "",
};

export const reducer = (state: ViewType, action: ViewActionType): ViewType => {
    switch (action.type) {
        case "SET_CURRENT_VIEW":
            return { ...state, currentView: action.payload };
        case "SET_ON_SELECTING":
            return { ...state, onSelecting: action.payload };
        case "SET_HAVE_WARNING":
            return { ...state, haveWarning: action.payload };
        case "SET_WARNING_MESSAGE":
            return { ...state, warningMessage: action.payload };
        case "SET_USE_DIFF_WALLET":
            return { ...state, useDiffwallet: action.payload };
        case "SET_DIFF_WALLET":
            return { ...state, diffWallet: action.payload };
        default:
            return state;
    }
};

export const ViewContext = createContext<{
    state: ViewType;
    dispatch: React.Dispatch<ViewActionType>;
}>(null!);

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ViewContext.Provider value={{ state, dispatch }}>
            {children}
        </ViewContext.Provider>
    );
};
