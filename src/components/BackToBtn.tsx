import { useViewContext } from "@/hooks";
import { Variants, motion } from "framer-motion";

type BackToExBtnProps = {
    currentTitle: string;
    animate: Variants;
    backTo?: "exchange" | "tokens" | "chains";
};

const BackToBtn = ({
    animate,
    currentTitle,
    backTo = "exchange",
}: BackToExBtnProps) => {
    const { dispatch } = useViewContext();

    const goToExchange = () =>
        dispatch({
            type: "SET_CURRENT_VIEW",
            payload: backTo,
        });

    return (
        <motion.div
            variants={animate}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex items-center justify-between"
        >
            <svg
                onClick={() => goToExchange()}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
            </svg>

            <h1 className="text-xl mr-5">{currentTitle}</h1>

            <div></div>
        </motion.div>
    );
};

export default BackToBtn;
