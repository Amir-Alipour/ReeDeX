import { useStateContext, useSwapContext, useViewContext } from "@/hooks";
import STxHash from "./STxHash";
import { decimalsFixer } from "@/utils/decimalsFixer";

const SSuccess = () => {
    const {
        state: { chains },
        dispatch,
    } = useStateContext();
    const { dispatch: viewDispatch } = useViewContext();
    const {
        state: { includedSteps, action, txHash },
    } = useSwapContext();

    const swap = includedSteps[includedSteps.length - 1];

    return (
        <>
            <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-green-500/20 text-green-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
            </div>

            <p className="text-xl font-semibold">Swap successful</p>

            <p className="text-gray-200">
                There are now{" "}
                {parseFloat(
                    decimalsFixer(
                        +swap.estimate.toAmount,
                        swap.action.toToken.decimals,
                        "/"
                    )
                        .toFixed(4)
                        .toString()
                )}{" "}
                {swap.action.toToken.symbol} in {action?.toAddress.slice(0, 5)}
                ...
                {action?.toAddress
                    .split("")
                    .reverse()
                    .slice(0, 4)
                    .reverse()}{" "}
                wallet on{" "}
                {chains?.find((c) => c.id === swap.action.toChainId)?.name}{" "}
                chain.
            </p>

            <div className="w-full flex items-center justify-center gap-x-3 mb-2">
                <p className="w-[90%] truncate">{txHash}</p>

                <STxHash txHash={txHash} chainId={action?.fromChainId!} />
            </div>

            <div className="w-full flex gap-x-3">
                <button
                    onClick={() => {
                        dispatch({ type: "SET_FROM_TOKEN", payload: null });
                        dispatch({ type: "SET_OLD_FROM_TOKEN", payload: null });
                        dispatch({ type: "SET_AMOUNT", payload: "" });
                        dispatch({ type: "SET_BALANCE", payload: undefined });

                        viewDispatch({
                            type: "SET_BOTTOM_DRAWER_OPEN",
                            payload: false,
                        });
                        viewDispatch({
                            type: "SET_CURRENT_VIEW",
                            payload: "exchange",
                        });
                    }}
                    className="w-full h-[50px] rounded-full bg-white text-black"
                >
                    Done
                </button>
            </div>
        </>
    );
};

export default SSuccess;
