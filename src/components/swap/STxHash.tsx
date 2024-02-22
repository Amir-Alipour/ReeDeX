import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useStateContext } from "@/hooks";

const STxHash = ({
    txHash,
    chainId,
}: {
    txHash: `0x${string}` | undefined;
    chainId: number;
}) => {
    const {
        state: { chains },
    } = useStateContext();

    return (
        <TooltipProvider>
            <Tooltip delayDuration={150}>
                <TooltipTrigger>
                    <div
                        onClick={() =>
                            window
                                .open(
                                    `${
                                        chains?.find((c) => c.id === chainId)
                                            ?.metamask.blockExplorerUrls[0]
                                    }tx/${txHash}`,
                                    "_blank"
                                )
                                ?.focus()
                        }
                        className="w-[30px] flex items-center justify-center cursor-pointer"
                    >
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
                                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                            />
                        </svg>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="bg-black/70 text-white border-none">
                    {chains?.find((c) => c.id === chainId)?.name} Scan
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default STxHash;
