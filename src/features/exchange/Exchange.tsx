import "./Exchange.css";
import { motion } from "framer-motion";
import { rightToLeftAnimate } from "@/lib/framer-variants";
import ExToken from "@/components/exchange/ExToken";
import ReverseBtn from "@/components/exchange/buttons/ReverseBtn";
import ExPay from "@/components/exchange/ExPay";
import ExWarning from "@/components/exchange/ExWarning";
import ExDiffWallet from "@/components/exchange/ExDiffWallet";
import ExFooter from "@/components/exchange/ExFooter";
import { useStateContext, useSwapContext, useViewContext } from "@/hooks";
import { useEffect } from "react";

const Exchange = () => {
    const { state } = useStateContext();
    const { dispatch: swapDispatch } = useSwapContext();
    const { dispatch: viewDispatch } = useViewContext();

    useEffect(() => {
        swapDispatch({ type: "CLEAR_ALL" });
        viewDispatch({ type: "SET_IS_SWAPPING", payload: false });
        viewDispatch({ type: "SET_IS_SWAP_REJECTED", payload: false });
    }, []);

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

            <ExDiffWallet />
            {/* Different Wallet Section */}

            <ExWarning />
            {/* Warning Section */}

            <ExFooter />
            {/* Footer Section */}
        </motion.div>
    );
};

export default Exchange;
