import { useSwapContext, useViewContext } from "@/hooks";

const SHighValueLoss = () => {
    const { dispatch: viewDispatch } = useViewContext();
    const { dispatch: swapDispatch } = useSwapContext();

    return (
        <>
            <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-orange-500/20 text-orange-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                </svg>
            </div>

            <p className="text-xl font-semibold">High value loss</p>

            <p className="text-gray-200">
                The value of the recived tokens is significantly lower than the
                exchanged tokens and transaction cost.
            </p>

            <div className="w-full flex gap-x-3">
                <button
                    onClick={() =>
                        viewDispatch({
                            type: "SET_BOTTOM_DRAWER_OPEN",
                            payload: false,
                        })
                    }
                    className="w-full h-[50px] rounded-full border border-white opacity-80"
                >
                    Cancel
                </button>
                <button
                    onClick={() =>
                        swapDispatch({
                            type: "SET_CONTINUE",
                            payload: true,
                        })
                    }
                    className="w-full h-[50px] rounded-full bg-white text-black"
                >
                    Continue
                </button>
            </div>
        </>
    );
};

export default SHighValueLoss;
