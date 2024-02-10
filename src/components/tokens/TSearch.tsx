import { leftToRightAnimate } from "@/lib/framer-variants";
import { motion } from "framer-motion";

const TSearch = ({
    searchHandler,
}: {
    searchHandler: React.Dispatch<React.SetStateAction<string>>;
}) => {
    return (
        <motion.div
            variants={leftToRightAnimate}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={0.1}
            className="w-full h-[50px] flex items-center border border-gray-300 rounded-lg"
        >
            <input
                onChange={(e) => searchHandler(e.target.value)}
                type="text"
                placeholder="Search by token name or address"
                className="flex-1 h-full px-3 bg-transparent outline-none bordr-none"
            />
            <div className="w-[50px] h-full flex items-center justify-center">
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
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            </div>
        </motion.div>
    );
};

export default TSearch;
