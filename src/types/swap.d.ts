export interface SwapType {
    action: SwapAction | undefined;
    includedSteps: IncludedStep[];
    transactionRequest: TransactionRequest | undefined;
    gasFeeError: boolean;
    highValueLoss: boolean;
    continue: boolean;
    isAllowanceApproved: boolean;
    allowanceTxHash: `0x${string}` | undefined;
    txHash: `0x${string}` | undefined;
}

export type SwapActionType =
    | { type: 'SET_ACTION'; payload: SwapAction }
    | { type: 'SET_INCLUDED_STEPS'; payload: IncludedSteps }
    | { type: 'SET_TRANSACTION_REQUEST'; payload: TransactionRequest | undefined }
    | { type: 'SET_GASFEE_ERROR'; payload: boolean }
    | { type: 'SET_HIGH_VALUE_LOSS'; payload: boolean }
    | { type: 'SET_CONTINUE'; payload: boolean }
    | { type: 'SET_IS_ALLOWANCE_APPROVED'; payload: boolean }
    | { type: 'SET_ALLOWANCE_TXHASH'; payload: `0x${string}` | undefined }
    | { type: 'SET_TXHASH'; payload: `0x${string}` | undefined }
    | { type: 'RELOAD_SWAP' }
    | { type: 'CLEAR_ALL' };


export type TransactionRequest = {
    data: `0x${string}`
    to: `0x${string}`
    value: bigint
    gasPrice: bigint
    gasLimit: bigint
    from: `0x${string}`
    chainId: number
}

export type SwapAction = {
    fromChainId: number
    fromAmount: string
    fromToken: Token
    toChainId: number
    toToken: Token
    slippage: number
    fromAddress: string
    toAddress: string
}

export type IncludedStep = {
    id: string
    type: string
    action: SwapAction
    estimate: {
        tool: string
        fromAmount: string
        toAmount: string
        toAmountMin: string
        approvalAddress: string
        executionDuration: number
        feeCosts: Array<{
            name: string
            description: string
            token: {
                address: string
                chainId: number
                symbol: string
                decimals: number
                name: string
                coinKey: string
                logoURI: string
                priceUSD: string
            }
            amount: string
            amountUSD: string
            percentage: string
            included: boolean
        }>
        gasCosts: Array<{
            type: string
            price: string
            estimate: string
            limit: string
            amount: string
            amountUSD: string
            token: {
                address: string
                chainId: number
                symbol: string
                decimals: number
                name: string
                coinKey: string
                logoURI: string
                priceUSD: string
            }
        }>
        toolData: {
            path: Array<string>
            routerAddress: string
        }
    }
    tool: string
    toolDetails: {
        key: string
        name: string
        logoURI: string
    }
}
