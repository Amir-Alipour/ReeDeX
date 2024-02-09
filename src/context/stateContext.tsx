import { StateActionType, StateType } from "@/types/state";
import { createContext, useContext, useReducer } from "react";

export const initialState: StateType = {
    oldFromToken: null,
    fromToken: null,
    toToken: null,
    fromChain: null,
    toChain: null,
    fromAddress: "",
    toAddress: "",
    amount: "",
    chains: undefined,
    walletChain: undefined,
    balance: undefined,
};

export const reducer = (
    state: StateType,
    action: StateActionType
): StateType => {
    switch (action.type) {
        case "SET_OLD_FROM_TOKEN":
            return { ...state, oldFromToken: action.payload };
        case "SET_FROM_TOKEN":
            return { ...state, fromToken: action.payload };
        case "SET_TO_TOKEN":
            return { ...state, toToken: action.payload };
        case "SET_FROM_CHAIN":
            return { ...state, fromChain: action.payload };
        case "SET_TO_CHAIN":
            return { ...state, toChain: action.payload };
        case "SET_FROM_ADDRESS":
            return { ...state, fromAddress: action.payload };
        case "SET_TO_ADDRESS":
            return { ...state, toAddress: action.payload };
        case "SET_AMOUNT":
            return { ...state, amount: action.payload };
        case "SET_CHAINS":
            return { ...state, chains: action.payload };
        case "SET_WALLET_CHAIN":
            return { ...state, walletChain: action.payload };
        case "SET_BALANCE":
            return { ...state, balance: action.payload };
        default:
            return state;
    }
};

const StateContext = createContext<{
    state: StateType;
    dispatch: React.Dispatch<StateActionType>;
}>(null!);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
