import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./lib/wagmi-config";
import Layout from "./layouts/Layout";
import { StateProvider } from "./context/state";

const queryClient = new QueryClient();

function App() {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <StateProvider>
                    <Layout />
                </StateProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default App;
