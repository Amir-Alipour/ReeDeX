import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism, arbitrum, polygon, bsc, zkSync, polygonZkEvm, avalanche, linea, gnosis, fantom, moonriver, moonbeam, fuse, boba, aurora } from 'wagmi/chains'

export const config = createConfig({
    chains: [
        mainnet,
        base,
        optimism,
        arbitrum,
        polygon,
        bsc,
        zkSync,
        polygonZkEvm,
        linea,
        gnosis,
        fantom,
        moonbeam,
        moonriver,
        fuse,
        boba,
        aurora,
    ],
    transports: {
        [mainnet.id]: http(),
        [base.id]: http(),
        [optimism.id]: http(),
        [arbitrum.id]: http(),
        [polygon.id]: http(),
        [bsc.id]: http(),
        [zkSync.id]: http(),
        [polygonZkEvm.id]: http(),
        [avalanche.id]: http(),
        [linea.id]: http(),
        [gnosis.id]: http(),
        [fantom.id]: http(),
        [moonbeam.id]: http(),
        [moonriver.id]: http(),
        [fuse.id]: http(),
        [boba.id]: http(),
        [aurora.id]: http(),
    },
})