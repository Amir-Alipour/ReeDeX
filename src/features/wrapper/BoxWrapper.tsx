import { useState } from "react";
import Exchange from "../exchange/Exchange";
import { AnimatePresence } from "framer-motion";
import Tokens from "../tokens/Tokens";
import { useChainId } from "wagmi";

type BoxWrapperProps = {
    chains: Chain[] | undefined;
};

export type ViewsState = "exchange" | "tokens" | "chains";

const BoxWrapper = ({ chains }: BoxWrapperProps) => {
    const chainId = useChainId();

    // const [fromToken, setFromToken] = useState<string>("");
    // const [toToken, setToToken] = useState<string>("");
    const [fromChain, setFromChain] = useState<number>(chainId);
    const [toChain, setToChain] = useState<number | null>(null);
    // const [fromAddress, setFromAdress] = useState<string>("");
    // const [toAdress, setToAdress] = useState<string>(fromAddress);
    // const [amount, setAmount] = useState<number>(0);
    // Exchange States

    const [onSelecting, setOnSelecting] = useState<"from" | "to">("from");
    const [page, setPage] = useState<ViewsState>("exchange");

    const Views: Record<ViewsState, React.ReactNode> = {
        exchange: (
            <Exchange
                key={"exchangeView"}
                handlers={{
                    viewHandler: setPage,
                    onSelectingHandler: setOnSelecting,
                }}
            />
        ),
        tokens: (
            <Tokens
                key={"tokensView"}
                chains={chains}
                viewHandler={setPage}
                onSelecting={onSelecting}
                selectedChain={{
                    fromChain,
                    setFromChain,
                    toChain,
                    setToChain
                }}
            />
        ),
        chains: <></>,
    };

    return (
        <div className="exchange-wrapper overflow-x-hidden w-[370px] min-h-[470px] flex flex-col gap-y-5 px-5 py-4 pb-6 mb-10 text-white rounded-xl border border-gray-600">
            <AnimatePresence
                initial={false}
                mode="wait"
                // onExitComplete={() => console.log("test")}
            >
                {Views[page]}
            </AnimatePresence>
        </div>
    );
};

export default BoxWrapper;
