import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AutoSizer, List } from "react-virtualized";
import { useStateContext } from "@/context/stateContext";
import { leftToRightAnimate } from "@/lib/framer-variants";
import Token from "@/components/Token";
import { useViewContext } from "@/context/viewContext";

const Tokens = () => {
    const { state, dispatch } = useStateContext();
    const { state: viewState, dispatch: viewDispatch } = useViewContext();

    const isFrom = () => (viewState.onSelecting === "from" ? true : false);
    const getChain = () => (isFrom() ? state.fromChain : state.toChain);

    const [tokens, setTokens] = useState<Token[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        if (getChain()) {
            setIsLoading(true);
            axios
                .get(`https://li.quest/v1/tokens?chains=${getChain()}`)
                .then((res) => res.data.tokens)
                .then((data) => {
                    setTokens([...data[getChain()!]]);
                    setIsLoading(false);
                });
        }

        return () => {
            setTokens([]);
        };
    }, [getChain()]);

    const handleFilterTokens = (item: any) => {
        return (
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.address === searchTerm
        );
    };

    const goToExchange = () =>
        viewDispatch({
            type: "SET_CURRENT_VIEW",
            payload: "exchange",
        });

    return (
        <>
            <motion.div
                variants={leftToRightAnimate}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center justify-between"
            >
                <svg
                    onClick={() => goToExchange()}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                </svg>

                <h1 className="text-xl mr-5">
                    Exchange{" "}
                    {viewState.onSelecting
                        .charAt(0)
                        .toUpperCase()
                        .concat(viewState.onSelecting.slice(1))}
                </h1>

                <div></div>
            </motion.div>
            {/* Title */}

            <motion.div
                variants={leftToRightAnimate}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-5 grid-rows-2 gap-4"
            >
                {state.chains?.map(
                    (chain, index) =>
                        index < 9 && (
                            <TooltipProvider key={chain.id}>
                                <Tooltip delayDuration={150}>
                                    <TooltipTrigger
                                        onClick={() => {
                                            if (isFrom()) {
                                                dispatch({
                                                    type: "SET_FROM_CHAIN",
                                                    payload: chain.id,
                                                });
                                            } else {
                                                dispatch({
                                                    type: "SET_TO_CHAIN",
                                                    payload: chain.id,
                                                });
                                            }
                                        }}
                                        className={` p-2.5 border rounded-lg ${
                                            getChain() === chain.id
                                                ? "bg-white bg-opacity-25 border-white"
                                                : "border-gray-400"
                                        } hover:border-gray-200`}
                                    >
                                        <img
                                            className="w-full rounded-full"
                                            src={chain.logoURI}
                                            alt={chain.name + "logo"}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-black/70 text-white border-none">
                                        <p className="text-xs">{chain.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )
                )}
                <div className="flex items-center justify-center text-lg p-2.5 border border-gray-400 rounded-lg hover:border-gray-200 cursor-pointer">
                    +{state.chains?.length! - 9}
                </div>
            </motion.div>
            {/* Chains Section */}

            <motion.div
                variants={leftToRightAnimate}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={0.1}
                className="w-full h-[50px] flex items-center border border-gray-300 rounded-lg"
            >
                <input
                    onChange={(e) => setSearchTerm(e.target.value)}
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
            {/* Search Section */}

            <motion.div
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                    exit: { opacity: 0 },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full h-[330px] -mb-6 -mt-2"
            >
                {isLoading ? (
                    <div className="w-full h-[50px] flex items-center justify-center text-xl">
                        Loading Tokens ...
                    </div>
                ) : (
                    <AutoSizer>
                        {({ width, height }) => (
                            <List
                                width={width}
                                height={height}
                                rowHeight={60}
                                rowRenderer={(props) => (
                                    <Token
                                        onclick={(token: Token) => {
                                            if (isFrom()) {
                                                dispatch({
                                                    type: "SET_FROM_TOKEN",
                                                    payload: token,
                                                });
                                            } else {
                                                dispatch({
                                                    type: "SET_TO_TOKEN",
                                                    payload: token,
                                                });
                                            }

                                            goToExchange();
                                        }}
                                        data={
                                            [...tokens].filter(
                                                handleFilterTokens
                                            )[props.index]
                                        }
                                        key={props.key}
                                        style={props.style}
                                    />
                                )}
                                rowCount={
                                    [...tokens].filter(handleFilterTokens)
                                        .length
                                }
                                overscanRowCount={3}
                            />
                        )}
                    </AutoSizer>
                )}
            </motion.div>
            {/* Tokens Section */}
        </>
    );
};

export default Tokens;
