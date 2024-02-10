import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useStateContext, useViewContext } from "@/hooks";
import { isFrom } from "@/utils";

const TChain = ({ chain }: { chain: Chain }) => {
    const { state, dispatch } = useStateContext();
    const { state: viewState } = useViewContext();

    const getChain = () =>
        isFrom(viewState.onSelecting) ? state.fromChain : state.toChain;

    return (
        <TooltipProvider>
            <Tooltip delayDuration={150}>
                <TooltipTrigger
                    onClick={() => {
                        if (isFrom(viewState.onSelecting)) {
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
    );
};

export default TChain;

export const TMoreChainsBtn = () => {
    const { state } = useStateContext();
    const { dispatch: viewDispatch } = useViewContext();

    return (
        <div
            onClick={() =>
                viewDispatch({
                    type: "SET_CURRENT_VIEW",
                    payload: "chains",
                })
            }
            className="flex items-center justify-center text-lg p-2.5 border border-gray-400 rounded-lg hover:border-gray-200 cursor-pointer"
        >
            +{state.chains?.length! - 9}
        </div>
    );
};
