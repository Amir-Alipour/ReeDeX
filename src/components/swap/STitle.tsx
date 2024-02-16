import { useSwapContext } from "@/hooks";

const STitle = () => {
    const {
        state: { includedSteps },
    } = useSwapContext();

    return (
        <div className="flex items-center justify-between">
            <p className="text-sm text-white">
                {includedSteps.map((s, i) => {
                    if (s.type === "cross") s.type = "bridge";
                    return i > 0 ? ` and ${s.type}` : s.type;
                })}
            </p>
            <p className="text-sm text-gray-200">
                {Math.ceil(
                    includedSteps
                        .map((step) => step.estimate.executionDuration)
                        .reduce((duration, x) => duration + x, 0) / 60
                )}
                m
            </p>
        </div>
    );
};

export default STitle;
