import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./lib/wagmi-config";
import Layout from "./layouts/Layout";
import { StateProvider } from "./context/stateContext";
import { ViewProvider } from "./context/viewContext";
import { SwapProvider } from "./context/swapContext";

const queryClient = new QueryClient();

function App() {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ViewProvider>
                    <StateProvider>
                        <SwapProvider>
                            <Layout />
                        </SwapProvider>
                    </StateProvider>
                </ViewProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default App;
