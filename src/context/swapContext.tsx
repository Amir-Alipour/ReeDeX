import { SwapActionType, SwapType } from "@/types/swap";
import { createContext, useReducer } from "react";

export const initialState: SwapType = {
    includedSteps: [],
    transactionRequest: undefined,
};

export const reducer = (state: SwapType, action: SwapActionType): SwapType => {
    switch (action.type) {
        case "SET_INCLUDED_STEPS":
            return { ...state, includedSteps: action.payload };
        case "SET_TRANSACTION_REQUEST":
            return { ...state, transactionRequest: action.payload };

        default:
            return state;
    }
};

export const SwapContext = createContext<{
    state: SwapType;
    dispatch: React.Dispatch<SwapActionType>;
}>(null!);

export const SwapProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <SwapContext.Provider value={{ state, dispatch }}>
            {children}
        </SwapContext.Provider>
    );
};
