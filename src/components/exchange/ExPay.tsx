import { useStateContext } from "@/context/stateContext";
import { rightToLeftAnimate } from "@/lib/framer-variants";
import { motion } from "framer-motion";
import TokenLogo from "../TokenLogo";
import { useAccount } from "wagmi";
import { LiFi, Token, TokenAmount } from "@lifi/sdk";
import { useEffect, useState } from "react";

const ExPay = () => {
    const lifi = new LiFi({
        integrator: "ReDeX",
    });
    const { state } = useStateContext();
    const { address } = useAccount();
    const [balance, setBalance] = useState<TokenAmount[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setBalance(undefined);
        if (state.fromToken) {
            setIsLoading(true);
            lifi.getTokenBalances(address as `0x${string}`, [
                state.fromToken as Token,
            ]).then((data) => {
                setBalance(data);
                setIsLoading(false);
            });
        }
    }, [state.fromToken]);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={rightToLeftAnimate}
            className="w-full h-[110px] flex flex-col gap-y-1 items-start p-3 shadow-lg shadow-gray-900 rounded-xl border border-gray-400"
        >
            <h3 className="text-sm">You pay {isLoading && "| Loading |"}</h3>
            <div className="flex items-center gap-x-4">
                <TokenLogo chain={state.fromChain} token={state.fromToken} />

                <div className="flex flex-col">
                    <p className="text-xl mt-1">
                        {balance ? balance[0].amount : "0"}
                    </p>
                    <p className="text-xs font-light mt-1 text-gray-400">
                        $
                        {balance
                            ? (
                                  +balance[0].priceUSD * +balance[0].amount
                              ).toFixed(2)
                            : "0.00"}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default ExPay;
