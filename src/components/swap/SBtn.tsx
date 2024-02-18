import { useSwapContext, useViewContext } from "@/hooks";
import { useEffect } from "react";
import { useSendTransaction } from "wagmi";

const SBtn = () => {
    const { data: hash, sendTransaction } = useSendTransaction();
    // Transaction Hook

    const {
        state: {
            gasFeeError,
            highValueLoss,
            continue: isContinue,
            transactionRequest,
        },
        dispatch: swapDispatch,
    } = useSwapContext();
    // Swap States

    const { dispatch: viewDispatch } = useViewContext();
    // View States

    const handleSwap = () => {
        if (highValueLoss && !isContinue) {
            viewDispatch({ type: "SET_BOTTOM_DRAWER_OPEN", payload: true });
        } else if (
            (!highValueLoss && !isContinue) ||
            (highValueLoss && isContinue)
        ) {
            viewDispatch({ type: "SET_BOTTOM_DRAWER_OPEN", payload: false });
            sendTransaction({
                account: transactionRequest?.from,
                to: transactionRequest?.to!,
                data: transactionRequest?.data,
                gas: transactionRequest?.gasLimit,
                gasPrice: transactionRequest?.gasPrice,
                value: transactionRequest?.value,
                chainId: transactionRequest?.chainId,
            });
        }
    };
    // Handle Swap Functionality

    useEffect(() => {
        if (hash) {
            swapDispatch({ type: "SET_TXHASH", payload: hash });
        }
    }, [hash]);
    // Transaction global states

    useEffect(() => {
        if (highValueLoss && isContinue && !hash) {
            handleSwap();
        }
    }, [isContinue]);
    // Continue trigger

    return (
        <>
            {hash ? (
                <div className="h-0"></div>
            ) : (
                <button
                    onClick={() => {
                        handleSwap();
                    }}
                    disabled={gasFeeError}
                    className={`${
                        gasFeeError && "cursor-not-allowed opacity-50"
                    } w-full mt-5 h-[50px] rounded-full flex items-center justify-center bg-white text-black text-lg tracking-wide hover:shadow-xl hover:shadow-gray-900`}
                >
                    Start swapping
                </button>
            )}
        </>
    );
};

export default SBtn;
