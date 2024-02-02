import { useChains } from "@/hooks/useChains";
import "./Layout.css";
import Header from "./header/Header";
import { useChainId } from "wagmi";

const Layout = () => {
    const { data: chainList } = useChains();
    const chainId = useChainId();

    return (
        <div className="realative w-100 min-h-screen font-sans">
            {/* background animation section */}
            <div className="animation">
                <div className="base one"></div>
                <div className="base two"></div>
            </div>

            {/* header section */}
            <Header chain={chainList?.filter(chain => chain.id === chainId)[0]} />

            {/* body section */}
            <div id="main" className="w-100 min-h-[87.7vh]"></div>
        </div>
    );
};

export default Layout;
