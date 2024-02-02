import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export const getChains = () => {
    return axios.get('https://li.quest/v1/chains?chainTypes=evm')
    .then(res => res.data.chains);
}

export const useChains = () => {
    return useQuery<Chain[]>({
        queryKey: ["chains"],
        queryFn: getChains,
        refetchOnWindowFocus: false,
        refetchInterval: false,
    })
}