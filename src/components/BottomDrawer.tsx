import { motion } from "framer-motion";
import { useViewContext } from "@/hooks";

const BottomDrawer = ({ children }: { children: React.ReactNode }) => {
    const {
        state: { isBottomDrawerOpen },
    } = useViewContext();

    return (
        <motion.div
            initial={false}
            variants={{
                hidden: { y: 500 },
                visible: { y: 0 },
            }}
            animate={isBottomDrawerOpen ? "visible" : "hidden"}
            transition={{
                duration: 0.4,
                ease: "easeInOut",
            }}
            className="absolute bottom-0 w-[112%] h-80 flex items-center justify-between p-5 flex-col gap-y-3 bg-stone-800 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.6)] rounded-2xl z-50"
            style={{ margin: "-24px -20px" }}
        >
            {children}
        </motion.div>
    );
};

export default BottomDrawer;
