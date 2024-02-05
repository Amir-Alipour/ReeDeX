import { useChains } from "@/hooks/useChains";
import "./Layout.css";
import Header from "./header/Header";
import { useChainId } from "wagmi";
import BoxWrapper from "@/features/wrapper/BoxWrapper";

const Layout = () => {
    const { data: chainList } = useChains();
    const chainId = useChainId();

    return (
        <div className="realative w-100 min-h-screen font-sans">
            <div className="animation">
                <div className="base one"></div>
                <div className="base two"></div>
                {/* background animation section */}

                <Header
                    chain={
                        chainList?.filter((chain) => chain.id === chainId)[0]
                    }
                />
                {/* header section */}

                <div
                    id="main"
                    className="w-100 min-h-[87.7vh] flex items-start justify-center pt-24"
                >
                    <BoxWrapper chains={chainList} />
                </div>
                {/* body section */}
            </div>
        </div>
    );
};

export default Layout;
