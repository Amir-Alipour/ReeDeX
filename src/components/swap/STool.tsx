import { useStateContext, useSwapContext } from "@/hooks";

const STool = () => {
    const {
        state: { chains },
    } = useStateContext();
    const {
        state: { includedSteps },
    } = useSwapContext();

    return (
        <div className="flex items-start gap-x-4 mt-3">
            <div className="relative w-[40px] h-[40px]">
                <img
                    src={includedSteps[0].toolDetails.logoURI}
                    className="rounded-full w-[40px] h-[40px] bg-stone-700"
                />
            </div>

            <div className="flex flex-col justify-start gap-y-1">
                <p className="text-lg">{includedSteps[0].toolDetails.name} via ReeDeX</p>

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
                                {step.type === "cross" ? "bridge" : step.type}{" "}
                                on{" "}
                                {
                                    chains?.find(
                                        (c) =>
                                            c.id === step.action.toToken.chainId
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
                                                    step.action.fromToken
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
                                                    step.action.toToken.decimals
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
    );
};

export default STool;
