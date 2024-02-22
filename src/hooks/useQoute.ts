import { useState } from "react";
import { useStateContext } from "./useStateContext";
import { useSwapContext } from "./useSwapContext";
import { useViewContext } from "./useViewContext";
import { useAccount } from "wagmi";
import { getQoute } from "@/utils";
import { AxiosError } from "axios";
import { decimalsFixer } from "@/utils/decimalsFixer";

export const useQoute = () => {
    const { state } = useStateContext();
    const { state: viewState, dispatch: viewDispatch } = useViewContext();
    const { dispatch: swapDispatch } = useSwapContext();
    const { address } = useAccount();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loadQoute = () => {
        setIsLoading(true);
        getQoute({
            fromChain: state.fromChain!,
            toChain: state.toChain!,
            fromToken: state.fromToken?.address!,
            toToken: state.toToken?.address!,
            fromAddress: address!,
            ...(viewState.useDiffwallet && {
                toAddress: viewState.diffWallet,
            }),
            fromAmount: decimalsFixer(+state.amount, state.fromToken?.decimals!, "*"),
        })
            .then((res) => {
                if (res.status === 200) {
                    setIsLoading(false);
                    swapDispatch({
                        type: "SET_ACTION",
                        payload: res.data.action,
                    });
                    swapDispatch({
                        type: "SET_INCLUDED_STEPS",
                        payload: res.data.includedSteps,
                    });
                    swapDispatch({
                        type: "SET_TRANSACTION_REQUEST",
                        payload: res.data.transactionRequest,
                    });
                    viewDispatch({
                        type: "SET_CURRENT_VIEW",
                        payload: "swap",
                    });
                }
            })
            .catch((err: AxiosError<{ message: string }>) => {
                if (err.response) {
                    setIsLoading(false);
                    viewDispatch({
                        type: "SET_HAVE_WARNING",
                        payload: true,
                    });
                    viewDispatch({
                        type: "SET_WARNING_MESSAGE",
                        payload: err.response.data.message ?? "There is Error.",
                    });
                }
            });
    };
    // Load Qoute function

    return { isLoading, loadQoute };
}