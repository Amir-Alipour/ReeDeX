import BoxHeader from "@/components/BoxHeader";
import TokenLogo from "@/components/TokenLogo";
import { useQoute, useStateContext, useSwapContext } from "@/hooks";
import { leftToRightAnimate } from "@/lib/framer-variants";

import { motion } from "framer-motion";

const Swap = () => {
    const {
        state: { chains },
    } = useStateContext();
    const {
        state: { includedSteps },
    } = useSwapContext();
    const { isLoading, loadQoute } = useQoute();

    const swapFrom = includedSteps[0];
    const swapTo = includedSteps[includedSteps.length - 1];

    const gasFee = includedSteps
        .map((s) => {
            const fees = s.estimate.feeCosts
                .map((f) => parseFloat(f.amountUSD))
                .reduce((a, b) => a + b, 0);

            const gases = s.estimate.gasCosts
                .map((g) => parseFloat(g.amountUSD))
                .reduce((a, b) => a + b, 0);

            return { fee: fees, gas: gases };
        })
        .reduce(
            (a, b) => {
                return {
                    gas: a.gas + b.gas,
                    fee: a.fee + b.fee,
                };
            },
            { gas: 0, fee: 0 }
        );

    console.log(includedSteps);

    return (
        <motion.div
            variants={leftToRightAnimate}
            initial="hidden"
            animate="visible"
            exit="exit"
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
                        onClick={() => loadQoute()}
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

            <div className="w-full flex flex-col p-4 mt-5 gap-y-4 rounded-xl bg-black/20 border border-white/10">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-white">
                        {includedSteps.map((s, i) => {
                            if (s.type === "cross") s.type = "bridge";
                            return i > 0 ? ` and ${s.type}` : s.type;
                        })}
                    </p>
                    <p className="text-sm text-gray-200">
                        {Math.ceil(
                            includedSteps
                                .map((step) => step.estimate.executionDuration)
                                .reduce((duration, x) => duration + x, 0) / 60
                        )}
                        m
                    </p>
                </div>

                <div className="flex items-center gap-x-4">
                    <TokenLogo
                        chain={swapFrom.action.fromChainId}
                        token={swapFrom.action.fromToken}
                    />
                    {/* Logo */}

                    <div>
                        <div className="flex flex-col gap-y-1">
                            <p className="text-2xl">
                                {parseFloat(
                                    (
                                        +swapFrom.estimate.fromAmount /
                                        +["1"]
                                            .concat(
                                                Array(
                                                    swapFrom.action.fromToken
                                                        .decimals
                                                ).fill("0")
                                            )
                                            .join("")
                                    )
                                        .toFixed(4)
                                        .toString()
                                )}
                            </p>
                            <p className="text-xs text-gray-300">
                                $
                                {(
                                    +swapFrom.estimate.fromAmount /
                                    +["1"]
                                        .concat(
                                            Array(
                                                swapFrom.action.fromToken
                                                    .decimals
                                            ).fill("0")
                                        )
                                        .join("")
                                ).toFixed(2)}{" "}
                                · {swapFrom.action.fromToken.symbol} on{" "}
                                {
                                    chains?.find(
                                        (c) =>
                                            c.id ===
                                            swapFrom.action.fromToken.chainId
                                    )?.name
                                }
                            </p>
                        </div>
                    </div>
                </div>
                {/* From Section */}

                <div className="flex items-start gap-x-4 mt-3">
                    <div className="relative w-[40px] h-[40px]">
                        <img
                            src={swapFrom.toolDetails.logoURI}
                            className="rounded-full w-[40px] h-[40px] bg-stone-700"
                        />
                    </div>

                    <div className="flex flex-col justify-start gap-y-1">
                        <p className="text-lg">{swapFrom.tool} via ReeDeX</p>

                        {includedSteps.map((step) => (
                            <div key={step.id} className="flex gap-x-2">
                                <div className="w-4 h-4">
                                    <img
                                        className="rounded-full"
                                        src={step.toolDetails.logoURI}
                                        alt={step.toolDetails.name}
                                    />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">
                                        {step.type === "cross"
                                            ? "bridge"
                                            : step.type}{" "}
                                        on{" "}
                                        {
                                            chains?.find(
                                                (c) =>
                                                    c.id ===
                                                    step.action.toToken.chainId
                                            )?.name
                                        }{" "}
                                        via {step.toolDetails.name}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {parseFloat(
                                            (
                                                +step.estimate.fromAmount /
                                                +["1"]
                                                    .concat(
                                                        Array(
                                                            step.action
                                                                .fromToken
                                                                .decimals
                                                        ).fill("0")
                                                    )
                                                    .join("")
                                            )
                                                .toFixed(4)
                                                .toString()
                                        )}{" "}
                                        {step.action.fromToken.symbol} →{" "}
                                        {parseFloat(
                                            (
                                                +step.estimate.toAmount /
                                                +["1"]
                                                    .concat(
                                                        Array(
                                                            step.action.toToken
                                                                .decimals
                                                        ).fill("0")
                                                    )
                                                    .join("")
                                            )
                                                .toFixed(4)
                                                .toString()
                                        )}{" "}
                                        {step.action.toToken.symbol}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Tool Section */}

                <div className="flex items-start gap-x-4">
                    <div className="w-[40px] h-[40px] flex items-start justify-center text-gray-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 mt-1"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                            />
                        </svg>
                    </div>

                    <div className="flex flex-col ">
                        <p className="text-sm text-gray-300">
                            ${(gasFee.gas + gasFee.fee).toFixed(2)} estimated
                            gas fee
                        </p>
                        <p className="text-xs text-gray-500">
                            ${gasFee.gas.toFixed(2)} gas · $
                            {gasFee.fee.toFixed(2)} fee
                        </p>
                    </div>
                </div>
                {/* Gas Fee Section */}

                <div className="flex items-center gap-x-4">
                    <TokenLogo
                        chain={swapTo.action.toChainId}
                        token={swapTo.action.toToken}
                    />
                    {/* Logo */}

                    <div>
                        <div className="flex flex-col gap-y-1">
                            <p className="text-2xl">
                                {parseFloat(
                                    (
                                        +swapTo.estimate.toAmount /
                                        +["1"]
                                            .concat(
                                                Array(
                                                    swapTo.action.toToken
                                                        .decimals
                                                ).fill("0")
                                            )
                                            .join("")
                                    )
                                        .toFixed(4)
                                        .toString()
                                )}
                            </p>
                            <p className="text-xs text-gray-300">
                                $
                                {(
                                    +swapTo.estimate.fromAmount /
                                    +["1"]
                                        .concat(
                                            Array(
                                                swapTo.action.fromToken.decimals
                                            ).fill("0")
                                        )
                                        .join("")
                                ).toFixed(2)}{" "}
                                · {swapTo.action.toToken.symbol} on{" "}
                                {
                                    chains?.find(
                                        (c) =>
                                            c.id ===
                                            swapTo.action.toToken.chainId
                                    )?.name
                                }
                            </p>
                        </div>
                    </div>
                </div>
                {/* To Section */}
            </div>
            {/* Swap Section */}

            <button
                // onClick={handleExchange}

                className={` w-full mt-5 h-[50px] rounded-full flex items-center justify-center bg-white text-black text-lg tracking-wide hover:shadow-xl hover:shadow-gray-900`}
            >
                Start swapping
            </button>
            {/* Button Section */}
        </motion.div>
    );
};

export default Swap;
