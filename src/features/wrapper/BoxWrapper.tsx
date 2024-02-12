import { AnimatePresence } from "framer-motion";
import { ViewOptions } from "@/types/view";
import { useViewContext } from "@/hooks";

import Exchange from "../exchange/Exchange";
import Tokens from "../tokens/Tokens";
import Chains from "../chains/Chains";
import Swap from "../swap/Swap";

const BoxWrapper = () => {
    const { state: viewState } = useViewContext();

    const Views: Record<ViewOptions, React.ReactNode> = {
        exchange: <Exchange key={"exchangeView"} />,
        tokens: <Tokens key={"tokensView"} />,
        chains: <Chains key={"chainsView"} />,
        swap: <Swap key={"swapView"} />,
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
