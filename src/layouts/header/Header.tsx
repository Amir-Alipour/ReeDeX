import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import WalletPopverButton from "@/components/WalletPopverButton";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const Header = ({ chain }: { chain: Chain | undefined }) => {
    const { connect, connectors } = useConnect();
    const { address } = useAccount();
    const { disconnect } = useDisconnect();

    const [popoverIsOpen, setPopoverIsOpen] = useState<boolean>(false);

    return (
        <div
            id="header"
            className="w-100 min-h-[10vh] flex items-center justify-between gap-x-1 sm:gap-x-0 px-2 md:px-16 pt-5 text-white"
        >
            <div className="w-[140px] sm:w-auto flex flex-col justify-end gap-y-1">
                <h1 className="text-xl md:text-4xl font-mono tracking-wider border-b pb-1">
                    ReDeX
                </h1>
                <p className="text-sm md:text-auto">doesn't take a fee.</p>
                <p className="text-xs md:text-auto break-words">
                    Developed by{" "}
                    <a href="https://github.com/amir-alipour" target="_blank">
                        Amir Alipour
                    </a>
                    .
                </p>
            </div>
            <div>
                {address ? (
                    <Popover
                        open={popoverIsOpen}
                        onOpenChange={setPopoverIsOpen}
                    >
                        <PopoverTrigger className="isolate rounded-xl bg-white/20 shadow-[0px_5px_100px_0px_#f7fafc] ring-1 ring-black/5 p-4 pl-2 sm:p-4 border flex items-center justify-between gap-x-1 sm:gap-x-3 sm:mr-3 mt-3">
                            <div className="relative">
                                <img
                                    className="w-5 h-5 sm:w-auto sm:h-auto"
                                    src="/metamask.svg"
                                    alt="metamask icon"
                                />
                                {chain && (
                                    <img
                                        className="absolute -right-2 -bottom-2 w-4 h-4 sm:w-[20px] sm:h-[20px] rounded-full shadow-lg"
                                        src={chain.logoURI}
                                        alt={chain.name + " icon"}
                                    />
                                )}
                            </div>
                            <p className="text-xs sm:text-lg font-mono">
                                {address.slice(0, 5)}...
                                {address
                                    .split("")
                                    .reverse()
                                    .slice(0, 4)
                                    .reverse()}
                            </p>
                        </PopoverTrigger>
                        <PopoverContent className="isolate rounded-xl bg-white/20 shadow-xl ring-1 ring-black/5 flex flex-col items-center gap-y-6">
                            <div className="flex flex-col items-center gap-y-3">
                                <div className="shadow-xl relative w-[90px] h-[90px] flex items-center justify-center bg-white rounded-full mt-4">
                                    <div>
                                        <img
                                            src="/metamask.svg"
                                            alt="metamask icon"
                                            className="w-[60px] h-[60px] "
                                        />
                                        {chain && (
                                            <img
                                                className="absolute -right-3 -bottom-3 w-[40px] h-[40px] rounded-full shadow-lg"
                                                src={chain.logoURI}
                                                alt={chain.name + " icon"}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-white truncate">
                                        {address.slice(0, 5)}...
                                        {address
                                            .split("")
                                            .reverse()
                                            .slice(0, 4)
                                            .reverse()}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between gap-x-3">
                                <WalletPopverButton
                                    clickHandler={() => {
                                        navigator.clipboard.writeText(address);
                                        setPopoverIsOpen(false);
                                    }}
                                    text="Copy"
                                    color="gray"
                                    icon={
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
                                                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                                            />
                                        </svg>
                                    }
                                />
                                <WalletPopverButton
                                    clickHandler={() => {
                                        window
                                            .open(
                                                `${chain?.metamask.blockExplorerUrls[0]}address/${address}`,
                                                "_blank"
                                            )
                                            ?.focus();
                                    }}
                                    text="Explore"
                                    color="gray"
                                    icon={
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
                                                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                            />
                                        </svg>
                                    }
                                />
                                <WalletPopverButton
                                    clickHandler={() => disconnect()}
                                    text="Disconnect"
                                    color="red"
                                    icon={
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
                                                d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                                            />
                                        </svg>
                                    }
                                />
                            </div>
                        </PopoverContent>
                    </Popover>
                ) : (
                    <>
                        {connectors.map((connector) => (
                            <button
                                className="isolate rounded-xl bg-white/20 shadow-[0px_5px_100px_0px_#f7fafc] ring-1 ring-black/5 p-4 border flex items-center justify-between gap-x-3 mr-3 mt-3"
                                key={connector.uid}
                                onClick={() => connect({ connector })}
                            >
                                <p>{connector.name}</p>
                                <img
                                    src={connector.icon}
                                    alt={connector.name + "icon"}
                                />
                            </button>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
