import { useStateContext, useSwapContext, useViewContext } from "@/hooks";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { isAddress } from "viem";
import { useAccount } from "wagmi";

const ExBtn = () => {
    const { state } = useStateContext();
    const { state: viewState, dispatch: viewDispatch } = useViewContext();
    const { dispatch: swapDispatch } = useSwapContext();
    const { address } = useAccount();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validate = (): boolean => {
        if (
            state.fromChain &&
            state.fromToken &&
            state.toChain &&
            state.toToken &&
            +state.amount > 0 &&
            (viewState.diffWallet ? isAddress(viewState.diffWallet) : true) &&
            !viewState.haveWarning
        )
            return true;
        else return false;
    };
    // Validate states

    const handleExchange = () => {
        if (validate()) {
            setIsLoading(true);
            axios
                .get(`https://li.quest/v1/quote`, {
                    params: {
                        integrator: "redex",
                        fromChain: state.fromChain,
                        toChain: state.toChain,
                        fromToken: state.fromToken?.address,
                        toToken: state.toToken?.address,
                        fromAddress: address,
                        ...(viewState.useDiffwallet && {
                            toAddress: viewState.diffWallet,
                        }),
                        fromAmount: +state.amount * 1000000,
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        setIsLoading(false);
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
                            payload:
                                err.response.data.message ?? "There is Error.",
                        });
                    }
                });
        }
    };
    // Exchange functionality

    return (
        <button
            onClick={handleExchange}
            disabled={viewState.haveWarning || isLoading}
            className={`${
                (viewState.haveWarning || isLoading) && "cursor-not-allowed"
            } ${
                isLoading && "animate-pulse"
            } flex-1 h-[50px] rounded-full flex items-center justify-center bg-white text-black text-lg tracking-wide hover:shadow-xl hover:shadow-gray-900`}
        >
            Exchange
        </button>
    );
};

export default ExBtn;
