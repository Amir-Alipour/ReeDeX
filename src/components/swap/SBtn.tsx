import { useSwapContext, useViewContext } from "@/hooks";

const SBtn = () => {
    const {
        state: { gasFeeError, highValueLoss },
    } = useSwapContext();

    const { dispatch: viewDispatch } = useViewContext();

    const handleSwap = () => {
        if (highValueLoss) {
            viewDispatch({ type: "SET_BOTTOM_DRAWER_OPEN", payload: true });
        } else {
            viewDispatch({ type: "SET_BOTTOM_DRAWER_OPEN", payload: false });
        }
    };

    return (
        <button
            onClick={handleSwap}
            disabled={gasFeeError}
            className={`${
                gasFeeError && "cursor-not-allowed opacity-50"
            } w-full mt-5 h-[50px] rounded-full flex items-center justify-center bg-white text-black text-lg tracking-wide hover:shadow-xl hover:shadow-gray-900`}
        >
            Start swapping
        </button>
    );
};

export default SBtn;
