import { rightToLeftAnimate } from "@/lib/framer-variants";
import { motion } from "framer-motion";
import ExBtn from "./buttons/ExBtn";
import DiffWalletBtn from "./buttons/DiffWalletBtn";

const ExFooter = () => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={rightToLeftAnimate}
            className="flex gap-x-3"
        >
            <ExBtn />
            {/* Exchange button */}

            <DiffWalletBtn />
            {/* Different Wallet use button */}
        </motion.div>
    );
};

export default ExFooter;
