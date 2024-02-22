import "./Layout.css";
import { useEffect } from "react";
import { useChains, useStateContext } from "@/hooks";
import { useChainId } from "wagmi";
import BoxWrapper from "@/features/wrapper/BoxWrapper";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const Layout = () => {
    const { data: chainList } = useChains();
    const chainId = useChainId();

    const { state, dispatch } = useStateContext();

    useEffect(() => {
        dispatch({ type: "SET_CHAINS", payload: chainList });
        dispatch({
            type: "SET_WALLET_CHAIN",
            payload: chainList?.find((c) => c.id === chainId),
        });

        if (state.fromChain === null) {
            dispatch({ type: "SET_FROM_CHAIN", payload: chainId });
            dispatch({ type: "SET_TO_CHAIN", payload: chainId });
        }
    }, [chainList, chainId]);

    return (
        <div className="realative w-100 min-h-screen font-sans">
            <div className="animation">
                <div className="base one"></div>
                <div className="base two"></div>
                {/* background animation section */}

                <Header />
                {/* header section */}

                <div
                    id="main"
                    className="w-100 min-h-[87.7vh] flex items-start justify-center pt-10"
                >
                    {chainList && <BoxWrapper />}
                </div>
                {/* body section */}

                <Footer />
                {/* Footer Section */}
            </div>
        </div>
    );
};

export default Layout;
