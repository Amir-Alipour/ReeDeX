import BackToBtn from "@/components/BackToBtn";
import { useStateContext } from "@/context/stateContext";
import { useViewContext } from "@/context/viewContext";
import { rightToLeftAnimate } from "@/lib/framer-variants";
import { motion } from "framer-motion";

const Chains = () => {
    const { state, dispatch } = useStateContext();
    const {
        state: { onSelecting },
        dispatch: viewDispatch,
    } = useViewContext();

    const handleSelectChain = (id: number) => {
        dispatch({
            type: `SET_${onSelecting.toUpperCase()}_CHAIN` as
                | "SET_FROM_CHAIN"
                | "SET_TO_CHAIN",
            payload: id,
        });

        viewDispatch({ type: "SET_CURRENT_VIEW", payload: "tokens" });
    };

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
                        <div
                            onClick={() => handleSelectChain(chain.id)}
                            className="flex h-[60px] items-center justify-start gap-x-2 pt-2 px-3 hover:bg-black/20 rounded-lg cursor-pointer"
                        >
                            <div className="w-12 h-12">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={chain.logoURI}
                                    alt={chain.name + " logo"}
                                />
                            </div>
                            <div>
                                <p className="text-xl mb-2">{chain.name}</p>
                            </div>
                        </div>
                    ))}
            </motion.div>
            {/* ChainsList */}
        </div>
    );
};

export default Chains;
