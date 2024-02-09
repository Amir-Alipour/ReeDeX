import { useStateContext } from "@/context/stateContext";
import { rightToLeftAnimate } from "@/lib/framer-variants";
import { motion } from "framer-motion";
import TokenLogo from "../TokenLogo";
import { useAccount } from "wagmi";
import { LiFi, Token, TokenAmount } from "@lifi/sdk";
import { useEffect, useState } from "react";
import { useViewContext } from "@/context/viewContext";

const lifi = new LiFi({
    integrator: "ReDeX",
});

const ExPay = () => {
    const { state, dispatch } = useStateContext();
    const { fromToken, oldFromToken } = state;
    const { dispatch: viewDispatch } = useViewContext();
    const { address } = useAccount();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (fromToken && oldFromToken?.address !== fromToken?.address) {
            dispatch({ type: "SET_OLD_FROM_TOKEN", payload: fromToken });
            dispatch({ type: "SET_BALANCE", payload: undefined });

            setIsLoading(true);
            lifi.getTokenBalances(address as `0x${string}`, [
                fromToken as Token,
            ]).then((data: TokenAmount[]) => {
                dispatch({ type: "SET_BALANCE", payload: data[0] });
                setIsLoading(false);
            });
        }
    }, [fromToken]);

    useEffect(() => {
        if (parseFloat(state.amount) > parseFloat(state.balance?.amount!)) {
            viewDispatch({ type: "SET_HAVE_WARNING", payload: true });
            viewDispatch({
                type: "SET_WARNING_MESSAGE",
                payload:
                    "You don't have enough funds to complete the transaction.",
            });
        } else {
            viewDispatch({ type: "SET_HAVE_WARNING", payload: false });
            viewDispatch({
                type: "SET_WARNING_MESSAGE",
                payload: "",
            });
        }
    }, [state.amount]);

    const handleChangeAmount = (amount: string) => {
        if (
            !state.fromChain ||
            !state.fromToken ||
            !/^\d*\.?\d*$/.test(amount) ||
            amount.length > 19
        )
            return;

        dispatch({ type: "SET_AMOUNT", payload: amount });
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={rightToLeftAnimate}
            className={`${
                isLoading && "animate-pulse"
            } w-full h-[110px] flex flex-col gap-y-1 items-start p-3 pr-3 shadow-lg shadow-gray-900 rounded-xl border border-gray-400`}
        >
            <h3 className="text-sm">You pay</h3>
            <div className="w-full flex items-center gap-x-4">
                <div className="flex-shrink">
                    <TokenLogo
                        chain={state.fromChain}
                        token={state.fromToken}
                    />
                </div>

                {/* Token Logo */}

                <div className="w-[80%] flex flex-col flex-shrink">
                    <div className="w-full flex items-center justify-between">
                        <input
                            className="w-full text-xl text-bold mt-1 bg-transparent outline-none border-none"
                            placeholder="0"
                            value={state.amount}
                            onChange={(e) => handleChangeAmount(e.target.value)}
                        />
                        {/* Token Amount */}

                        {isLoading ? (
                            <div className="w-10 h-6 rounded-full mt-1 animate-pulse bg-black/40"></div>
                        ) : (
                            state.fromChain &&
                            state.fromToken && (
                                <div
                                    onClick={() =>
                                        handleChangeAmount(
                                            state.balance?.amount as string
                                        )
                                    }
                                    className="w-10 h-6 flex items-center justify-center mt-1.5 rounded-full bg-white/15 hover:bg-white/20 text-sm cursor-pointer"
                                >
                                    max
                                </div>
                            )
                        )}
                        {/* Token Max Button */}
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <p className="text-xs font-light mt-1 text-gray-400">
                            $
                            {state.balance
                                ? (
                                      +state.balance?.priceUSD * +state.amount
                                  ).toFixed(2)
                                : "0.00"}
                        </p>
                        {/* Token Price USD */}

                        {isLoading ? (
                            <div className=" w-10 h-4 mt-1 animate-pulse bg-black/40"></div>
                        ) : (
                            state.fromChain &&
                            state.fromToken && (
                                <p className=" text-sm mt-1 text-gray-300">
                                    /{" "}
                                    {state.balance
                                        ? (+state.balance.amount).toFixed(4)
                                        : "0"}
                                </p>
                            )
                        )}
                        {/* Token Balance */}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ExPay;
