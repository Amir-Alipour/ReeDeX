import { IncludedStep } from "@/types/swap";
import TokenLogo from "../TokenLogo";
import { useStateContext } from "@/hooks";
import { useMemo } from "react";
import { decimalsFixer } from "@/utils/decimalsFixer";

const SToken = ({
    swap,
    side,
}: {
    swap: IncludedStep;
    side: "from" | "to";
}) => {
    const {
        state: { chains },
    } = useStateContext();

    const data = useMemo(() => {
        if (side === "from") {
            return {
                chainId: swap.action.fromChainId,
                token: swap.action.fromToken,
                amount: swap.estimate.fromAmount,
            };
        } else {
            return {
                chainId: swap.action.toChainId,
                token: swap.action.toToken,
                amount: swap.estimate.toAmount,
            };
        }
    }, [swap, side]);

    return (
        <div className="flex items-center gap-x-4">
            <TokenLogo chain={data.chainId} token={data.token} />
            {/* Logo */}

            <div>
                <div className="flex flex-col gap-y-1">
                    <p className="text-2xl">
                        {parseFloat(
                            decimalsFixer(
                                +data.amount,
                                data.token.decimals,
                                "/"
                            )
                                .toFixed(4)
                                .toString()
                        )}
                    </p>
                    <p className="text-xs text-gray-300">
                        $
                        {(
                            +swap.estimate.fromAmount /
                            +["1"]
                                .concat(
                                    Array(swap.action.fromToken.decimals).fill(
                                        "0"
                                    )
                                )
                                .join("")
                        ).toFixed(2)}{" "}
                        · {data.token.symbol} on{" "}
                        {chains?.find((c) => c.id === data.token.chainId)?.name}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SToken;
