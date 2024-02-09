export { };

declare global {
    export type Token = {
        address: string
        chainId: number
        symbol: string
        decimals: number
        name: string
        coinKey?: string
        logoURI?: string
        priceUSD: string
    }

    export type Chain = {
        key: string
        chainType: string
        name: string
        coin: string
        id: number
        mainnet: boolean
        logoURI: string
        tokenlistUrl: string
        multicallAddress: string
        metamask: {
            chainId: string
            blockExplorerUrls: Array<string>
            chainName: string
            nativeCurrency: {
                name: string
                symbol: string
                decimals: number
            }
            rpcUrls: Array<string>
        }
        nativeToken: {
            address: string
            chainId: number
            symbol: string
            decimals: number
            name: string
            coinKey: string
            logoURI: string
            priceUSD: string
        }
    }
}