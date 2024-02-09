import { motion } from "framer-motion";

const ExDiffWallet = ({ isDiffWallet }: { isDiffWallet: boolean }) => {
    return (
        <motion.div
            className="hidden"
            variants={{
                hidden: {
                    display: "none",
                    height: 0,
                    transition: { delay: 0.4 },
                },
                visible: { display: "block", height: "80px" },
            }}
            animate={isDiffWallet ? "visible" : "hidden"}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <motion.div
                variants={{
                    hidden: { x: 100, opacity: 0 },
                    visible: { x: 0, opacity: 1 },
                }}
                animate={isDiffWallet ? "visible" : "hidden"}
                transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                }}
                className="w-full h-[80px] flex flex-col gap-y-1 items-start p-3 rounded-xl border border-gray-400"
            >
                <h3 className="text-sm">Send to a different wallet</h3>
                <input
                    className="w-full bg-transparent border-none outline-none h-full text-sm mt-1 text-gray-300"
                    placeholder="Wallet address"
                />
            </motion.div>
        </motion.div>
    );
};

export default ExDiffWallet;
