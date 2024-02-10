import { useStateContext } from "@/hooks";
import { rightToLeftAnimate } from "@/lib/framer-variants";
import { motion } from "framer-motion";

const ReverseBtn = () => {
    const { state, dispatch } = useStateContext();

    return (
        <motion.div
            onClick={() => {
                const tokenCopy = state.fromToken;
                const chainCopy = state.fromChain;

                dispatch({
                    type: "SET_FROM_CHAIN",
                    payload: state.toChain,
                });
                dispatch({
                    type: "SET_FROM_TOKEN",
                    payload: state.toToken,
                });
                dispatch({ type: "SET_TO_CHAIN", payload: chainCopy });
                dispatch({ type: "SET_TO_TOKEN", payload: tokenCopy });
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={rightToLeftAnimate}
            className="cursor-pointer z-10 absolute top-[40%] w-[35px] h-[35px] flex items-center justify-center rounded-full border bg-stone-800 shadow-lg"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                />
            </svg>
        </motion.div>
    );
};

export default ReverseBtn;
