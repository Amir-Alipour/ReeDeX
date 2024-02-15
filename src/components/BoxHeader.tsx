import { useViewContext } from "@/hooks";
import { Variants, motion } from "framer-motion";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

type BoxHeaderProps = {
    currentTitle: string;
    animate: Variants;
    backTo?: "exchange" | "tokens" | "chains";
    icon?: React.ReactNode;
    iconTitle?: string;
};

const BoxHeader = ({
    animate,
    currentTitle,
    backTo = "exchange",
    icon = null,
    iconTitle,
}: BoxHeaderProps) => {
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

            <h1 className=" text-xl">{currentTitle}</h1>

            <div className="w-5">
                {icon && (
                    <TooltipProvider>
                        <Tooltip delayDuration={150}>
                            <TooltipTrigger>{icon}</TooltipTrigger>
                            <TooltipContent className="bg-black/70 text-white border-none">
                                {iconTitle}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
        </motion.div>
    );
};

export default BoxHeader;
