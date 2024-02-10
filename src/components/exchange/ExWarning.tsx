import { useViewContext } from "@/hooks";
import { motion } from "framer-motion";

const ExWarning = () => {
    const { state: viewState } = useViewContext();

    return (
        <motion.div
            className="hidden"
            variants={{
                hidden: {
                    display: "none",
                    height: 0,
                    transition: { delay: 0.3 },
                },
                visible: { display: "block", height: "80px" },
            }}
            animate={viewState.haveWarning ? "visible" : "hidden"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <motion.div
                variants={{
                    hidden: { y: 100, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                }}
                animate={viewState.haveWarning ? "visible" : "hidden"}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className="w-full h-[80px] flex gap-x-3 items-start justify-start p-3 rounded-xl bg-orange-500/20"
            >
                <div className="text-orange-300">
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
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
                    </svg>
                </div>
                <p className="text-md text-gray-300">
                    {viewState.warningMessage}
                </p>
            </motion.div>
        </motion.div>
    );
};

export default ExWarning;
