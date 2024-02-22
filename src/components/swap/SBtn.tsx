import { useSwapContext, useViewContext, useAllowance } from "@/hooks";
import { decimalsFixer } from "@/utils/decimalsFixer";
import { useEffect } from "react";
import { BaseError, useSendTransaction } from "wagmi";

const SBtn = () => {
    const {
        data: hash,
        sendTransaction,
        isError,
        error,
    } = useSendTransaction();
    // Transaction Hook

    const {
        state: {
            gasFeeError,
            highValueLoss,
            continue: isContinue,
            transactionRequest,
            action,
            isAllowanceApproved,
        },
        dispatch: swapDispatch,
    } = useSwapContext();
    // Swap States

    const { dispatch: viewDispatch } = useViewContext();
    // View States

    const { approveAllowance } = useAllowance({
        tokenDecimals: action?.fromToken.decimals!,
        tokenAddress: action?.fromToken.address as `0x${string}`,
        amount: decimalsFixer(
            +action?.fromAmount!,
            action?.fromToken.decimals!,
            "/"
        ),
        setHash: (txHash) => {
            swapDispatch({ type: "SET_ALLOWANCE_TXHASH", payload: txHash });
        },
    });
    // Approve Alloance

    const handleSwap = async () => {
        if (highValueLoss && !isContinue) {
            viewDispatch({ type: "SET_BOTTOM_DRAWER_OPEN", payload: true });
        } else if (
            (!highValueLoss && !isContinue) ||
            (highValueLoss && isContinue)
        ) {
            viewDispatch({ type: "SET_BOTTOM_DRAWER_OPEN", payload: false });
            viewDispatch({ type: "SET_IS_SWAPPING", payload: true });
            viewDispatch({
                type: "SET_IS_SWAP_REJECTED",
                payload: false,
            });

            if (!isAllowanceApproved) {
                try {
                    const isApproved = await approveAllowance();
                    if (isApproved) {
                        swapDispatch({
                            type: "SET_IS_ALLOWANCE_APPROVED",
                            payload: true,
                        });

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
                } catch (error) {
                    console.log("err", error);
                    viewDispatch({ type: "SET_IS_SWAPPING", payload: false });
                    viewDispatch({
                        type: "SET_IS_SWAP_REJECTED",
                        payload: true,
                    });
                }
            }
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

    useEffect(() => {
        if (
            isError &&
            ((error as BaseError).shortMessage ===
                "User rejected the request." ||
                (error as BaseError).shortMessage ===
                    "An internal error was received.")
        ) {
            viewDispatch({ type: "SET_IS_SWAP_REJECTED", payload: true });
            swapDispatch({ type: "RELOAD_SWAP" });
            viewDispatch({ type: "SET_IS_SWAPPING", payload: false });
        }

        if (!isError) {
            viewDispatch({ type: "SET_IS_SWAP_REJECTED", payload: false });
        }
    }, [isError, error]);
    // Transaction Reject Handling

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
