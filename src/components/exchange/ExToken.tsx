import { useStateContext } from "@/context/stateContext";
import { useViewContext } from "@/context/viewContext";
import { rightToLeftAnimate } from "@/lib/framer-variants";
import { motion } from "framer-motion";
import TokenLogo from "../TokenLogo";

type ExTokenProps = {
    title: string;
    chain: number | null;
    token: Token | null;
};

const ExToken = ({ title, chain, token }: ExTokenProps) => {
    const { dispatch: viewDispatch } = useViewContext();
    const {
        state: { chains },
    } = useStateContext();

    const goToTokens = (selecting: "from" | "to") => {
        viewDispatch({
            type: "SET_ON_SELECTING",
            payload: selecting,
        });
        viewDispatch({
            type: "SET_CURRENT_VIEW",
            payload: "tokens",
        });
    };

    return (
        <motion.div
            onClick={() => goToTokens(title.toLowerCase() as "from" | "to")}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={rightToLeftAnimate}
            className="cursor-pointer w-full h-[95px] flex flex-col items-start gap-y-2 p-3 shadow-lg shadow-gray-900 rounded-xl border border-gray-400"
        >
            <h3 className="text-sm">{title}</h3>
            <div className="flex items-center gap-x-4">
                <TokenLogo chain={chain} token={token} />
                {/* Logo */}

                <div>
                    {chain && token ? (
                        <div>
                            <p>{token.symbol}</p>
                            <p className="text-xs text-gray-400">
                                on {chains?.find((c) => c.id === chain)?.name}
                            </p>
                        </div>
                    ) : (
                        <p className="text-xl font-light mt-1 text-gray-400">
                            Select chain and token
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ExToken;
