import { LiFi, Token, TokenAmount } from "@lifi/sdk";
import { useStateContext } from "./useStateContext";
import { useViewContext } from "./useViewContext";

const lifi = new LiFi({
    integrator: "ReeDeX",
});

type useBalanceProps = {
    wallet: `0x${string}`;
    token: Token;
}

export const useBalance = ({ wallet, token }: useBalanceProps) => {
    const { dispatch } = useStateContext();
    const { state: { isLoadingBalance }, dispatch: viewDispatch } = useViewContext();


    const loadBalance = () => {
        viewDispatch({ type: "SET_IS_LOADING_BALANCE", payload: true })
        lifi.getTokenBalances(wallet, [token]).then((data: TokenAmount[]) => {
            dispatch({ type: "SET_BALANCE", payload: data[0] });
            viewDispatch({ type: "SET_IS_LOADING_BALANCE", payload: false })
        });
    }

    return { isLoading: isLoadingBalance, loadBalance };
}