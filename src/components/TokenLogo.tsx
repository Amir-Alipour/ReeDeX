import { useStateContext } from "@/hooks";

type TokenLogoProps = {
    token: Token | null;
    chain: number | null;
};

const TokenLogo = ({ token, chain }: TokenLogoProps) => {
    const { state } = useStateContext();

    return (
        <div className="relative w-[40px] h-[40px]">
            {chain && token ? (
                <>
                    <img
                        src={token.logoURI}
                        className="rounded-full w-[40px] h-[40px] bg-stone-700"
                    />
                    <img
                        src={state.chains?.find((c) => c.id === chain)?.logoURI}
                        className="absolute -bottom-0.5 -right-0.5 border-2 border-stone-800 rounded-full w-[17px] h-[17px] bg-stone-700"
                    />
                </>
            ) : (
                <>
                    <div className="rounded-full w-[40px] h-[40px] bg-stone-700"></div>
                    <div className="absolute -bottom-0.5 -right-0.5 border-2 border-stone-800 rounded-full w-[17px] h-[17px] bg-stone-700"></div>
                </>
            )}
        </div>
    );
};

export default TokenLogo;
