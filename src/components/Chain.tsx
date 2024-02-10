import { useStateContext, useViewContext } from "@/hooks";

const Chain = ({ chain }: { chain: Chain }) => {
    const { dispatch } = useStateContext();
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
    );
};

export default Chain;
