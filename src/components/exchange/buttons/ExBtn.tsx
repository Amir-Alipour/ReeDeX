import { useStateContext, useViewContext } from "@/hooks";

const ExBtn = () => {
    const { state } = useStateContext();
    const { state: viewState } = useViewContext();

    const exchange = () => {};
    // Exchange functionality

    return (
        <button
            disabled={viewState.haveWarning}
            className={`${
                viewState.haveWarning && "cursor-not-allowed"
            } flex-1 h-[50px] rounded-full flex items-center justify-center bg-white text-black text-lg tracking-wide hover:shadow-xl hover:shadow-gray-900`}
        >
            Exchange
        </button>
    );
};

export default ExBtn;
