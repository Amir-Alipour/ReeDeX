import BackToBtn from "@/components/BackToBtn";
import { useSwapContext } from "@/hooks";
import { leftToRightAnimate } from "@/lib/framer-variants";
import { motion } from "framer-motion";

const Swap = () => {
    const { state } = useSwapContext();
    console.log(state);

    return (
        <motion.div
            variants={leftToRightAnimate}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <BackToBtn currentTitle={`Swap`} animate={leftToRightAnimate} />
            {/* Title */}
        </motion.div>
    );
};

export default Swap;
