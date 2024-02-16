import { useSwapContext } from "@/hooks";

const SWarning = () => {
    const {
        state: { gasFeeError },
    } = useSwapContext();

    return (
        <>
            {gasFeeError && (
                <div className="w-full h-[70px] flex gap-x-3 mt-3 -mb-1 items-start justify-start p-3 rounded-xl bg-orange-500/20">
                    <div className="text-orange-300">
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
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                            />
                        </svg>
                    </div>
                    <p className="text-sm text-gray-300">
                        You don't have enough funds to pay the gas fee to
                        complete the transaction.
                    </p>
                </div>
            )}
        </>
    );
};

export default SWarning;
