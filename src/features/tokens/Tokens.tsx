import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { leftToRightAnimate } from "@/lib/framer-variants";
import BackToBtn from "@/components/BackToBtn";
import TChain, { TMoreChainsBtn } from "@/components/tokens/TChain";
import TSearch from "@/components/tokens/TSearch";
import TokensList from "@/components/tokens/TokensList";
import { useStateContext, useViewContext } from "@/hooks";
import { isFrom } from "@/utils";

const Tokens = () => {
    const { state } = useStateContext();
    const { state: viewState } = useViewContext();

    const getChain = () =>
        isFrom(viewState.onSelecting) ? state.fromChain : state.toChain;

    const [tokens, setTokens] = useState<Token[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        if (getChain()) {
            setIsLoading(true);
            axios
                .get(`https://li.quest/v1/tokens?chains=${getChain()}`)
                .then((res) => res.data.tokens)
                .then((data) => {
                    setTokens([...data[getChain()!]]);
                    setIsLoading(false);
                });
        }

        return () => {
            setTokens([]);
        };
    }, [getChain()]);

    return (
        <>
            <BackToBtn
                currentTitle={`Exchange ${viewState.onSelecting}`}
                animate={leftToRightAnimate}
            />
            {/* Title */}

            <motion.div
                variants={leftToRightAnimate}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-5 grid-rows-2 gap-4"
            >
                {state.chains?.map(
                    (chain, index) =>
                        index < 9 && <TChain key={chain.id} chain={chain} />
                )}
                {/* Chains section */}

                <TMoreChainsBtn />
                {/* More chains buttons */}
            </motion.div>
            {/* Chains Section */}

            <TSearch searchHandler={setSearchTerm} />
            {/* Search Section */}

            <motion.div
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                    exit: { opacity: 0 },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full h-[330px] -mb-6 -mt-2"
            >
                {isLoading ? (
                    <div className="w-full h-[50px] flex items-center justify-center text-xl">
                        Loading Tokens ...
                    </div>
                ) : (
                    <TokensList searchTerm={searchTerm} tokens={tokens} />
                )}
            </motion.div>
            {/* Tokens Section */}
        </>
    );
};

export default Tokens;
