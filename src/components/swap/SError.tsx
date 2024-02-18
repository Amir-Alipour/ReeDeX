import { useStateContext, useSwapContext, useViewContext } from "@/hooks";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

const SError = () => {
    const {
        state: { chains, walletChain },
        dispatch,
    } = useStateContext();
    const { dispatch: viewDispatch } = useViewContext();
    const {
        state: { includedSteps, txHash },
    } = useSwapContext();

    const swap = includedSteps[includedSteps.length - 1];

    return (
        <>
            <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-red-500/20 text-red-400">
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
                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                </svg>
            </div>

            <p className="text-xl font-semibold">Swap failed</p>

            <p className="text-gray-200">
                There is something wrong, Transaction failed.
            </p>

            <div className="w-full flex items-center justify-center gap-x-3 mb-2">
                <p className="w-[90%] truncate">{txHash}</p>

                <TooltipProvider>
                    <Tooltip delayDuration={150}>
                        <TooltipTrigger>
                            <div
                                onClick={() =>
                                    window
                                        .open(
                                            `${walletChain?.metamask.blockExplorerUrls[0]}tx/${txHash}`,
                                            "_blank"
                                        )
                                        ?.focus()
                                }
                                className="w-[30px] flex items-center justify-center cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                                    />
                                </svg>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-black/70 text-white border-none">
                            {
                                chains?.find(
                                    (c) => c.id === swap.action.toChainId
                                )?.name
                            }{" "}
                            Scan
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
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

export default SError;
