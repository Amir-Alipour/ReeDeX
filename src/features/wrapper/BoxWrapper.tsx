import Exchange from "../exchange/Exchange";
import { AnimatePresence } from "framer-motion";
import Tokens from "../tokens/Tokens";
import { useViewContext } from "@/context/viewContext";
import { ViewOptions } from "@/types/view";

const BoxWrapper = () => {
    const { state: viewState } = useViewContext();

    const Views: Record<ViewOptions, React.ReactNode> = {
        exchange: <Exchange key={"exchangeView"} />,
        tokens: <Tokens key={"tokensView"} />,
        chains: <></>,
    };

    return (
        <div className="exchange-wrapper overflow-x-hidden w-[370px] min-h-[470px] flex flex-col gap-y-5 px-5 py-4 pb-6 mb-10 text-white rounded-xl border border-gray-600">
            <AnimatePresence initial={false} mode="wait">
                {Views[viewState.currentView]}
            </AnimatePresence>
        </div>
    );
};

export default BoxWrapper;
