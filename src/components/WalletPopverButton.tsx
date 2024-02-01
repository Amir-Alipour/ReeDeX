type WalletPopverButtonProps = {
    text: string;
    icon: React.ReactNode;
    color: string;
    clickHandler: () => void
};

const WalletPopverButton = ({ icon, text, color, clickHandler }: WalletPopverButtonProps) => {
    return (
        <div className="w-[33%] flex flex-col items-center justify-center gap-y-3 cursor-pointer">
            <div
                onClick={clickHandler}
                className={`flex items-center justify-center w-[60px] h-[60px] text-${color}-300 rounded-full border border-${color}-400`}
            >
                {icon}
            </div>
            <p className={`text-${color}-400 text-sm font-light tracking-wide`}>
                {text}
            </p>
        </div>
    );
};

export default WalletPopverButton;
