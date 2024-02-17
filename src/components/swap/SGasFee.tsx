import { useStateContext, useSwapContext } from "@/hooks";
import { useEffect, useMemo } from "react";

const SGasFee = () => {
    const {
        state: { includedSteps },
        dispatch: swapDispatch,
    } = useSwapContext();
    const {
        state: { balance },
    } = useStateContext();

    const gasFee = useMemo(() => {
        const GF = includedSteps
            .map((s) => {
                const fees = s.estimate.feeCosts
                    .map((f) => parseFloat(f.amountUSD))
                    .reduce((a, b) => a + b, 0);

                const gases = s.estimate.gasCosts
                    .map((g) => parseFloat(g.amountUSD))
                    .reduce((a, b) => a + b, 0);

                return { fee: fees, gas: gases };
            })
            .reduce(
                (a, b) => {
                    return {
                        gas: a.gas + b.gas,
                        fee: a.fee + b.fee,
                    };
                },
                { gas: 0, fee: 0 }
            );

        return {
            gas: GF.gas > 0 ? GF.gas : 0.01,
            fee: GF.fee,
        };
    }, [includedSteps]);

    useEffect(() => {
        const amount =
            +includedSteps[0].action.fromAmount /
            +["1"]
                .concat(
                    Array(includedSteps[0].action.fromToken.decimals).fill("0")
                )
                .join("");
        // From Amount

        const allCosts = gasFee.gas + gasFee.fee;
        // GasCosts + FeeCosts

        if (amount + allCosts > +balance?.amount!)
            swapDispatch({ type: "SET_GASFEE_ERROR", payload: true });
        else swapDispatch({ type: "SET_GASFEE_ERROR", payload: false });
        // not enough balance for gas fee

        if (amount <= allCosts)
            swapDispatch({ type: "SET_HIGH_VALUE_LOSS", payload: true });
        else swapDispatch({ type: "SET_HIGH_VALUE_LOSS", payload: false });
        // high value loss warning
    }, [gasFee.gas, gasFee.fee]);

    return (
        <div className="flex items-start gap-x-4">
            <div className="w-[40px] h-[40px] flex items-start justify-center text-gray-400">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mt-1"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                    />
                </svg>
            </div>

            <div className="flex flex-col ">
                <p className="text-sm text-gray-300">
                    ${(gasFee.gas + gasFee.fee).toFixed(2)} estimated gas fee
                </p>
                <p className="text-xs text-gray-500">
                    ${gasFee.gas.toFixed(2)} gas · ${gasFee.fee.toFixed(2)} fee
                </p>
            </div>
        </div>
    );
};

export default SGasFee;
