import { LiFi, Token, TokenAmount } from "@lifi/sdk";
import { useState } from "react";

const lifi = new LiFi({
    integrator: "ReeDeX",
});

type useBalanceProps = {
    wallet: `0x${string}`;
    tokens: Token[];
    setLoading?: (isLoading: boolean) => void;
}

export const useBalance = ({ wallet, tokens, setLoading }: useBalanceProps) => {
    const [balances, setBalances] = useState<TokenAmount[]>([]);

    const loadBalance = () => {
        setLoading?.(true);
        lifi.getTokenBalances(wallet, [...tokens]).then((data: TokenAmount[]) => {
            setBalances([...data]);
            setLoading?.(false);
        });
    }

    return { loadBalance, balances };
}