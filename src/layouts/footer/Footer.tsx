const Footer = () => {
    return (
        <div className="absolute text-white bottom-5 right-5 flex flex-col gap-y-1 items-end z-10">
            <p className="text-xs md:text-auto text-gray-400 break-words">
                open-source on{" "}
                <a
                    className="text-white"
                    href="https://github.com/amir-alipour/redex"
                    target="_blank"
                >
                    GitHub
                </a>
                .
            </p>
            <p className="text-xs md:text-auto text-gray-400 break-words">
                powered by{" "}
                <a
                    className="text-white"
                    href="https://apidocs.li.fi/reference/welcome-to-the-lifinance-api"
                    target="_blank"
                >
                    LI.FI api
                </a>
                .
            </p>
        </div>
    );
};

export default Footer;
