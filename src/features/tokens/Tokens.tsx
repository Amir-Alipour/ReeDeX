import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ViewsState } from "../wrapper/BoxWrapper";
import { Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { AutoSizer, List } from "react-virtualized";
import Token from "@/components/Token";

type TokensProps = {
    chains: Chain[] | undefined;
    viewHandler: React.Dispatch<React.SetStateAction<ViewsState>>;
    onSelecting: "from" | "to";
    selectedChain: {
        chain: number | null;
        setChain: React.Dispatch<React.SetStateAction<number | null>>;
    };
    setToken: React.Dispatch<React.SetStateAction<Token | null>>;
};

const Tokens = ({
    chains,
    viewHandler,
    onSelecting,
    selectedChain,
    setToken,
}: TokensProps) => {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        if (selectedChain.chain) {
            setIsLoading(true);
            axios
                .get(`https://li.quest/v1/tokens?chains=${selectedChain.chain}`)
                .then((res) => res.data.tokens)
                .then((data) => {
                    setTokens([...data[selectedChain.chain!]]);
                    setIsLoading(false);
                });
        }

        return () => {
            setTokens([]);
        };
    }, [selectedChain.chain]);

    const handleFilterTokens = (item: any) => {
        return (
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.address === searchTerm
        );
    };

    return (
        <>
            <motion.div
                variants={animate}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center justify-between"
            >
                <svg
                    onClick={() => viewHandler("exchange")}
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
                    {onSelecting
                        .charAt(0)
                        .toUpperCase()
                        .concat(onSelecting.slice(1))}
                </h1>

                <div></div>
            </motion.div>
            {/* Title */}

            <motion.div
                variants={animate}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-5 grid-rows-2 gap-4"
            >
                {chains?.map(
                    (chain, index) =>
                        index < 9 && (
                            <TooltipProvider key={chain.id}>
                                <Tooltip delayDuration={150}>
                                    <TooltipTrigger
                                        onClick={() => {
                                            selectedChain.setChain(chain.id);
                                        }}
                                        className={` p-2.5 border rounded-lg ${
                                            selectedChain.chain === chain.id
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
                    +{chains?.length! - 9}
                </div>
            </motion.div>
            {/* Chains Section */}

            <motion.div
                variants={animate}
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
                                            setToken(token);
                                            viewHandler("exchange");
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

const animate: Variants = {
    hidden: {
        x: 100,
        opacity: 0,
    },
    visible: (delay = 0) => ({
        x: 0,
        opacity: 1,
        transition: {
            delay,
            type: "spring",
            duration: "0.3s",
            stiffness: 120,
            damping: 30,
        },
    }),
    exit: {
        x: 100,
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 30,
        },
    },
};
