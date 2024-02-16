
export interface SwapType {
    includedSteps: IncludedStep[];
    transactionRequest: TransactionRequest | undefined;
}

export type SwapActionType =
    | { type: 'SET_INCLUDED_STEPS'; payload: IncludedSteps }
    | { type: 'SET_TRANSACTION_REQUEST'; payload: TransactionRequest | undefined };


export type TransactionRequest = {
    data: string
    to: string
    value: string
    gasPrice: string
    gasLimit: string
    from: string
    chainId: number
}

export type IncludedStep = {
    id: string
    type: string
    action: {
        fromChainId: number
        fromAmount: string
        fromToken: {
            address: string
            chainId: number
            symbol: string
            decimals: number
            name: string
            coinKey: string
            logoURI: string
            priceUSD: string
        }
        toChainId: number
        toToken: {
            address: string
            chainId: number
            symbol: string
            decimals: number
            name: string
            coinKey: string
            logoURI: string
            priceUSD: string
        }
        slippage: number
        fromAddress: string
        toAddress: string
    }
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
