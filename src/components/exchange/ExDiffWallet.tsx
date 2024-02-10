import { useViewContext } from "@/hooks";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { isAddress } from "viem";

const ExDiffWallet = () => {
    const [haveError, setHaveError] = useState<boolean>(false);
    const {
        state: { useDiffwallet, diffWallet },
        dispatch: viewDispatch,
    } = useViewContext();

    useEffect(() => {
        if (diffWallet !== "") {
            if (isAddress(diffWallet)) setHaveError(false);
            else setHaveError(true);
        }
    }, [diffWallet]);

    const handleAddress = (value: string) => {
        if (value.trim() === "") {
            setHaveError(false);
            viewDispatch({ type: "SET_DIFF_WALLET", payload: "" });
            return;
        }

        viewDispatch({ type: "SET_DIFF_WALLET", payload: value });
    };

    return (
        <motion.div
            className="hidden mb-1"
            variants={{
                hidden: {
                    display: "none",
                    height: 0,
                    transition: { delay: 0.4 },
                },
                visible: { display: "block", height: "80px" },
            }}
            animate={useDiffwallet ? "visible" : "hidden"}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <motion.div
                variants={{
                    hidden: { x: 100, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                }}
                animate={useDiffwallet ? "visible" : "hidden"}
                transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                }}
                className={`${
                    haveError ? "border-red-400" : "border-gray-400"
                } w-full min-h-[80px] flex flex-col gap-y-1 items-start p-3 rounded-xl border`}
            >
                <h3 className="text-sm">Send to a different wallet</h3>
                <input
                    className="w-full bg-transparent border-none outline-none h-full text-sm mt-1 text-gray-300"
                    placeholder="Wallet address"
                    value={diffWallet}
                    onChange={(e) => handleAddress(e.target.value)}
                />
                {haveError && (
                    <p className="text-xs text-red-500">
                        Wallet address is invalid.
                    </p>
                )}
            </motion.div>
        </motion.div>
    );
};

export default ExDiffWallet;
