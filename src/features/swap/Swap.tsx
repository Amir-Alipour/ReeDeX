import BottomDrawer from "@/components/BottomDrawer";
import BoxHeader from "@/components/BoxHeader";
import SBtn from "@/components/swap/SBtn";
import SError from "@/components/swap/SError";
import SGasFee from "@/components/swap/SGasFee";
import SHighValueLoss from "@/components/swap/SHighValueLoss";
import SPending from "@/components/swap/SPending";
import SSuccess from "@/components/swap/SSuccess";
import STitle from "@/components/swap/STitle";
import SToken from "@/components/swap/SToken";
import STool from "@/components/swap/STool";
import STxHash from "@/components/swap/STxHash";
import SWarning from "@/components/swap/SWarning";
import { useQoute, useSwapContext, useViewContext } from "@/hooks";
import { leftToRightAnimate } from "@/lib/framer-variants";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTransactionReceipt } from "wagmi";

const Swap = () => {
    const {
        state: {
            action,
            includedSteps,
            highValueLoss,
            txHash,
            allowanceTxHash,
            continue: isContinue,
            isAllowanceApproved,
        },
        dispatch: swapDispatch,
    } = useSwapContext();

    const {
        state: { isSwapping, isSwapRejected },
        dispatch: viewDispatch,
    } = useViewContext();

    const { isLoading, loadQoute } = useQoute();
    const { isError, data } = useTransactionReceipt({
        hash: txHash,
    });

    useEffect(() => {
        if (data?.status === "success" || data?.status === "reverted") {
            viewDispatch({ type: "SET_BOTTOM_DRAWER_OPEN", payload: true });
            viewDispatch({ type: "SET_IS_SWAPPING", payload: false });
        }
    }, [data]);

    return (
        <motion.div
            variants={leftToRightAnimate}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative"
        >
            <BoxHeader
                currentTitle={`Swap`}
                animate={leftToRightAnimate}
                iconTitle="Load new one"
                icon={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-6 h-6 ${
                            isLoading &&
                            "cursor-not-allowed pointer-events-none animate-spin"
                        }`}
                        onClick={() => {
                            if (!txHash) {
                                swapDispatch({ type: "RELOAD_SWAP" });
                                loadQoute();
                                viewDispatch({
                                    type: "SET_IS_SWAPPING",
                                    payload: false,
                                });
                                viewDispatch({
                                    type: "SET_IS_SWAP_REJECTED",
                                    payload: false,
                                });
                            }
                        }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                    </svg>
                }
            />
            {/* Title */}

            <div
                className={`${
                    isLoading && "animate-pulse"
                } w-full flex flex-col p-4 mt-5 gap-y-4 rounded-xl bg-black/20 border ${
                    isSwapRejected ? "border-red-500" : "border-white/10"
                }`}
            >
                <STitle />
                {/* Title Section */}

                <SToken swap={includedSteps[0]} side="from" />
                {/* From Section */}

                <STool />
                {/* Tool Section */}

                {isSwapping && (
                    <div className="flex gap-x-4">
                        <SPending
                            isDone={isAllowanceApproved}
                            text={{
                                pending: "Setting token allowance",
                                done: "Token allowance approved",
                            }}
                        />
                        {allowanceTxHash && (
                            <STxHash
                                txHash={allowanceTxHash}
                                chainId={action?.fromChainId!}
                            />
                        )}
                    </div>
                )}

                {/* Approve Allowance Section */}

                {txHash && (
                    <SPending
                        isDone={data?.status === "success" && !isError}
                        text={{
                            pending: "Pending swap transaction",
                            done: "Transaction successfuly.",
                        }}
                    />
                )}
                {/* Confirming Section */}

                <SGasFee />
                {/* Gas Fee Section */}

                <SToken
                    swap={includedSteps[includedSteps.length - 1]}
                    side="to"
                />
                {/* To Section */}
            </div>
            {/* Swap Section */}

            <SWarning />
            {/* GasFee Error Section */}

            <SBtn />
            {/* Button Section */}

            <BottomDrawer>
                {highValueLoss && !isContinue && <SHighValueLoss />}
                {data?.status === "success" && !isError && <SSuccess />}
                {data?.status === "reverted" && <SError />}
            </BottomDrawer>
            {/* Drwer Section */}
        </motion.div>
    );
};

export default Swap;
