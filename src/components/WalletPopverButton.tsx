type WalletPopverButtonProps = {
    text: string;
    icon: React.ReactNode;
    color: "red" | "gray";
    clickHandler: () => void;
};

const WalletPopverButton = ({
    icon,
    text,
    color,
    clickHandler,
}: WalletPopverButtonProps) => {
    const colorClasses = {
        red: {
            fText: "text-red-400",
            sText: "text-red-300",
            border: "border-red-500",
        },
        gray: {
            fText: "text-gray-400",
            sText: "text-gray-300",
            border: "border-gray-400",
        },
    };

    return (
        <div className="w-[33%] flex flex-col items-center justify-center gap-y-3 cursor-pointer">
            <div
                onClick={clickHandler}
                className={`border ${colorClasses[color].fText} ${colorClasses[color].border} flex items-center justify-center w-[60px] h-[60px] rounded-full`}
            >
                {icon}
            </div>

            <p
                className={`${colorClasses[color].sText} text-sm font-light tracking-wide`}
            >
                {text}
            </p>
        </div>
    );
};

export default WalletPopverButton;
