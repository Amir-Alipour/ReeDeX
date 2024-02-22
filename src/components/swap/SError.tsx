import { useStateContext, useSwapContext, useViewContext } from "@/hooks";
import STxHash from "./STxHash";

const SError = () => {
    const { dispatch } = useStateContext();
    const { dispatch: viewDispatch } = useViewContext();
    const {
        state: { action, txHash },
    } = useSwapContext();

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

            <p className="w-full text-gray-200">
                There is something wrong <br />
                Transaction failed.
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

export default SError;
