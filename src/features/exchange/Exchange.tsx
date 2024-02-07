import "./Exchange.css";
import { ViewsState } from "../wrapper/BoxWrapper";
import { motion } from "framer-motion";
import { useState } from "react";
import { useStateContext } from "@/context/state";

type ExchangeProps = {
    handlers: {
        viewHandler: React.Dispatch<React.SetStateAction<ViewsState>>;
        onSelectingHandler: React.Dispatch<React.SetStateAction<"from" | "to">>;
    };
};

const Exchange = ({ handlers }: ExchangeProps) => {
    const [useDifferentWallet, setUseDifferentWallet] = useState(false);
    const { state } = useStateContext();

    return (
        <>
            <motion.h1
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={animate}
                className="text-2xl font-mono"
            >
                Exchange
            </motion.h1>
            {/* Title */}

            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={animate}
                className="relative flex flex-col items-center gap-y-4"
            >
                <motion.div
                    onClick={() => {
                        handlers.onSelectingHandler("from");
                        handlers.viewHandler("tokens");
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={animate}
                    className="cursor-pointer w-full h-[95px] flex flex-col items-start gap-y-2 p-3 shadow-lg shadow-gray-900 rounded-xl border border-gray-400"
                >
                    <h3 className="text-sm">From</h3>
                    <div className="flex items-center gap-x-4">
                        <div className="relative">
                            {state.fromChain && state.fromToken ? (
                                <>
                                    <img
                                        src={state.fromToken.logoURI}
                                        className="rounded-full w-[40px] h-[40px] bg-stone-700"
                                    />
                                    <img
                                        src={
                                            state.chains?.find(
                                                (c) => c.id === state.fromChain
                                            )?.logoURI
                                        }
                                        className="absolute -bottom-0.5 -right-0.5 border-2 border-stone-800 rounded-full w-[17px] h-[17px] bg-stone-700"
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="rounded-full w-[40px] h-[40px] bg-stone-700"></div>
                                    <div className="absolute -bottom-0.5 -right-0.5 border-2 border-stone-800 rounded-full w-[17px] h-[17px] bg-stone-700"></div>
                                </>
                            )}
                        </div>
                        <div>
                            {state.fromChain && state.fromToken ? (
                                <div>
                                    <p>{state.fromToken.symbol}</p>
                                    <p className="text-xs text-gray-400">
                                        on{" "}
                                        {
                                            state.chains?.find(
                                                (c) => c.id === state.fromChain
                                            )?.name
                                        }
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

                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={animate}
                    className="cursor-pointer absolute top-[40%] w-[35px] h-[35px] flex items-center justify-center rounded-full border bg-stone-800 shadow-lg"
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

                <motion.div
                    onClick={() => {
                        handlers.onSelectingHandler("to");
                        handlers.viewHandler("tokens");
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="cursor-pointer w-full h-[95px] flex flex-col items-start gap-y-2 p-3 shadow-lg shadow-gray-900 rounded-xl border border-gray-400"
                >
                    <h3 className="text-sm">To</h3>
                    <div className="flex items-center gap-x-4">
                        <div className="relative">
                            {state.toChain && state.toToken ? (
                                <>
                                    <img
                                        src={state.toToken.logoURI}
                                        className="rounded-full w-[40px] h-[40px] bg-stone-700"
                                    />
                                    <img
                                        src={
                                            state.chains?.find(
                                                (c) => c.id === state.toChain
                                            )?.logoURI
                                        }
                                        className="absolute -bottom-0.5 -right-0.5 border-2 border-stone-800 rounded-full w-[17px] h-[17px] bg-stone-700"
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="rounded-full w-[40px] h-[40px] bg-stone-700"></div>
                                    <div className="absolute -bottom-0.5 -right-0.5 border-2 border-stone-800 rounded-full w-[17px] h-[17px] bg-stone-700"></div>
                                </>
                            )}
                        </div>
                        <div>
                            {state.toChain && state.toToken ? (
                                <div>
                                    <p>{state.toToken.symbol}</p>
                                    <p className="text-xs text-gray-400">
                                        on{" "}
                                        {
                                            state.chains?.find(
                                                (c) => c.id === state.toChain
                                            )?.name
                                        }
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
            </motion.div>
            {/* Token Section */}

            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={animate}
                className="w-full h-[110px] flex flex-col gap-y-1 items-start p-3 shadow-lg shadow-gray-900 rounded-xl border border-gray-400"
            >
                <h3 className="text-sm">You pay</h3>
                <div className="flex items-center gap-x-4">
                    <div className="relative">
                        <div className="rounded-full w-[40px] h-[40px] bg-stone-700"></div>
                        <div className="absolute -bottom-0.5 -right-0.5 border-2 border-stone-800 rounded-full w-[17px] h-[17px] bg-stone-700"></div>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-2xl mt-1 text-gray-400">0</p>
                        <p className="text-xs font-light mt-1 text-gray-400">
                            $0.00
                        </p>
                    </div>
                </div>
            </motion.div>
            {/* Pay Section */}

            <motion.div
                variants={{
                    hidden: { visibility: "hidden", height: 0 },
                    visible: { visibility: "visible", height: "80px" },
                }}
                animate={useDifferentWallet ? "visible" : "hidden"}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                <motion.div
                    variants={{
                        hidden: { x: 100, opacity: 0 },
                        visible: { x: 0, opacity: 1 },
                    }}
                    animate={useDifferentWallet ? "visible" : "hidden"}
                    transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                        delay: 0.1,
                    }}
                    className="w-full h-[80px] flex flex-col gap-y-1 items-start p-3 rounded-xl border border-gray-400"
                >
                    <h3 className="text-sm">Send to a different wallet</h3>
                    <p className="text-md mt-1 text-gray-400">Wallet address</p>
                </motion.div>
            </motion.div>
            {/* Different Wallet Section */}

            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={animate}
                className="flex gap-x-3"
            >
                <button className="flex-1 h-[50px] rounded-full flex items-center justify-center bg-white text-black text-lg tracking-wide hover:shadow-xl hover:shadow-gray-900">
                    Exchange
                </button>
                <div
                    onClick={() => setUseDifferentWallet((prev) => !prev)}
                    className="w-[50px] h-[50px] rounded-full border flex items-center justify-center cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                        />
                    </svg>
                </div>
            </motion.div>
            {/* Footer Section */}
        </>
    );
};

export default Exchange;

const animate = {
    hidden: {
        x: -100,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 30,
        },
    },
    exit: {
        x: -100,
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
        },
    },
};
