import { useQoute, useStateContext, useViewContext } from "@/hooks";
import { isAddress } from "viem";

const ExBtn = () => {
    const { state } = useStateContext();
    const { state: viewState } = useViewContext();
    const { isLoading, loadQoute } = useQoute();

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
            loadQoute();
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
