export interface StateType {
    fromToken: Token | null;
    toToken: Token | null;
    fromChain: number | null;
    toChain: number | null;
    fromAddress: string;
    toAddress: string;
    amount: number;
    chains: Chain[] | undefined;
    walletChain: Chain | undefined;
}

export type StateActionType =
    | { type: 'SET_FROM_TOKEN'; payload: Token | null }
    | { type: 'SET_TO_TOKEN'; payload: Token | null }
    | { type: 'SET_FROM_CHAIN'; payload: number | null }
    | { type: 'SET_TO_CHAIN'; payload: number | null }
    | { type: 'SET_FROM_ADDRESS'; payload: string }
    | { type: 'SET_TO_ADDRESS'; payload: string }
    | { type: 'SET_AMOUNT'; payload: number }
    | { type: 'SET_CHAINS'; payload: Chain[] | undefined }
    | { type: 'SET_WALLET_CHAIN'; payload: Chain | undefined };
