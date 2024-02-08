import { ViewType, ViewActionType } from "@/types/view";
import { createContext, useContext, useReducer } from "react";

export const initialState: ViewType = {
    currentView: "exchange",
    onSelecting: "from",
    haveWarning: false,
    warningMessage: "",
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
        default:
            return state;
    }
};

const ViewContext = createContext<{
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

export const useViewContext = () => useContext(ViewContext);
