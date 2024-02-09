import "./Exchange.css";
import { motion } from "framer-motion";
import { useStateContext } from "@/context/stateContext";
import { rightToLeftAnimate } from "@/lib/framer-variants";
import ExToken from "@/components/exchange/ExToken";
import ReverseBtn from "@/components/exchange/ReverseBtn";
import ExPay from "@/components/exchange/ExPay";
import ExWarning from "@/components/exchange/ExWarning";
import ExDiffWallet from "@/components/exchange/ExDiffWallet";
import { useViewContext } from "@/context/viewContext";

const Exchange = () => {
    const { state } = useStateContext();
    const { state: viewState, dispatch: viewDispatch } = useViewContext();

    return (
        <motion.div
            variants={rightToLeftAnimate}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-y-5"
        >
            <motion.h1
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={rightToLeftAnimate}
                className="text-2xl font-mono"
            >
                Exchange
            </motion.h1>
            {/* Title */}

            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={rightToLeftAnimate}
                className="relative flex flex-col items-center gap-y-4"
            >
                <ExToken
                    title="From"
                    chain={state.fromChain}
                    token={state.fromToken}
                />

                <ReverseBtn />

                <ExToken
                    title="To"
                    chain={state.toChain}
                    token={state.toToken}
                />
            </motion.div>
            {/* Token Section */}

            <ExPay />
            {/* Pay Section */}

            <ExDiffWallet isDiffWallet={viewState.useDiffwallet} />
            {/* Different Wallet Section */}

            <ExWarning />
            {/* Warning Section */}

            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={rightToLeftAnimate}
                className="flex gap-x-3"
            >
                <button
                    disabled={viewState.haveWarning}
                    className={`${
                        viewState.haveWarning && "cursor-not-allowed"
                    } flex-1 h-[50px] rounded-full flex items-center justify-center bg-white text-black text-lg tracking-wide hover:shadow-xl hover:shadow-gray-900`}
                >
                    Exchange
                </button>
                <div
                    onClick={() =>
                        viewDispatch({
                            type: "SET_USE_DIFF_WALLET",
                            payload: !viewState.useDiffwallet,
                        })
                    }
                    className="w-[50px] h-[50px] rounded-full border flex items-center justify-center cursor-pointer"
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
                            d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                        />
                    </svg>
                </div>
            </motion.div>
            {/* Footer Section */}
        </motion.div>
    );
};

export default Exchange;
