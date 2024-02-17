import axios from "axios"

export type getQouteParams = {
    fromChain: number,
    toChain: number,
    fromToken: string,
    toToken: string,
    fromAddress: string,
    toAddress?: string
    fromAmount: number;
}

export const getQoute = (params: getQouteParams) => {
    return axios
        .get(`https://li.quest/v1/quote`, {
            params: {
                integrator: "reedex.vercel.app",
                ...params
            },
        })
}