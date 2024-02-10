const Token = ({
    style,
    data,
    onclick,
}: {
    style: any;
    data: Token;
    onclick: (token: Token) => void;
}) => {
    return (
        <div
            onClick={() => onclick(data)}
            style={style}
            className="flex items-center justify-start gap-x-4 px-3 hover:bg-black/20 rounded-lg cursor-pointer"
        >
            <div className="w-8 h-8">
                {data.logoURI ? (
                    <img
                        className="rounded-full"
                        src={data.logoURI}
                        alt={data.symbol + " logo"}
                    />
                ) : (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-600">
                        <p className="text-white">{data.name[0]}</p>
                    </div>
                )}
            </div>
            <div>
                <p>{data.name}</p>
                <p className="text-xs text-gray-400">{data.symbol}</p>
            </div>
        </div>
    );
};

export default Token;
