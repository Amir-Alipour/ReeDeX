import BackToBtn from "@/components/BackToBtn";
import Chain from "@/components/Chain";
import { useStateContext } from "@/hooks";
import { rightToLeftAnimate } from "@/lib/framer-variants";
import { motion } from "framer-motion";

const Chains = () => {
    const { state } = useStateContext();

    return (
        <div className="w-full h-[560px]">
            <BackToBtn
                currentTitle="Select chain"
                animate={rightToLeftAnimate}
                backTo="tokens"
            />
            {/* Title Section */}

            <motion.div
                variants={rightToLeftAnimate}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full mt-3 pt-2 pb-5 h-[543px] overflow-y-scroll flex flex-col gap-y-1.5"
            >
                {state.chains &&
                    state.chains.map((chain) => (
                        <Chain key={chain.id} chain={chain} />
                    ))}
            </motion.div>
            {/* ChainsList */}
        </div>
    );
};

export default Chains;
