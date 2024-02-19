import { LiFi, Token, TokenAmount } from "@lifi/sdk";

const lifi = new LiFi({
    integrator: "ReeDeX",
});

type useBalanceProps = {
    wallet: `0x${string}`;
    tokens: Token[];
    setState: (amounts: TokenAmount[]) => void;
    setLoading?: (isLoading: boolean) => void;
}

export const useBalance = ({ wallet, tokens, setState, setLoading }: useBalanceProps) => {

    const loadBalance = () => {
        setLoading?.(true);
        lifi.getTokenBalances(wallet, [...tokens]).then((data: TokenAmount[]) => {
            setState([...data]);
            setLoading?.(false);
        });
    }

    return { loadBalance };
}