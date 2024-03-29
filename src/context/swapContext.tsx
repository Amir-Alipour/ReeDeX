import { SwapActionType, SwapType } from "@/types/swap";
import { createContext, useReducer } from "react";

export const initialState: SwapType = {
    action: undefined,
    includedSteps: [],
    transactionRequest: undefined,
    gasFeeError: false,
    highValueLoss: false,
    continue: false,
    isAllowanceApproved: false,
    allowanceTxHash: undefined,
    txHash: undefined,
};

export const reducer = (state: SwapType, action: SwapActionType): SwapType => {
    switch (action.type) {
        case "SET_ACTION":
            return { ...state, action: action.payload };
        case "SET_INCLUDED_STEPS":
            return { ...state, includedSteps: action.payload };
        case "SET_TRANSACTION_REQUEST":
            return { ...state, transactionRequest: action.payload };
        case "SET_GASFEE_ERROR":
            return { ...state, gasFeeError: action.payload };
        case "SET_HIGH_VALUE_LOSS":
            return { ...state, highValueLoss: action.payload };
        case "SET_CONTINUE":
            return { ...state, continue: action.payload };
        case "SET_IS_ALLOWANCE_APPROVED":
            return { ...state, isAllowanceApproved: action.payload };
        case "SET_ALLOWANCE_TXHASH":
            return { ...state, allowanceTxHash: action.payload };
        case "SET_TXHASH":
            return { ...state, txHash: action.payload };
        case "RELOAD_SWAP":
            return {
                ...state,
                gasFeeError: false,
                highValueLoss: false,
                continue: false,
                isAllowanceApproved: false,
                allowanceTxHash: undefined,
                txHash: undefined,
            };
        case "CLEAR_ALL":
            return { ...initialState };

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
