import { useStateContext } from "./useStateContext";

import { type Signer, providers, ethers } from 'ethers';
import { config } from '../lib/wagmi-config';
import { getEthersSigner } from "../utils/getEthersSigner";

const erc20_abi = [
    {
        "name": "approve",
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "name": "allowance",
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

type useAllowanceProps = {
    tokenDecimals: number,
    tokenAddress: `0x${string}`;
    amount: number;
    setLoading?: (isLoading: boolean) => void;
    setHash?: (txHash: `0x${string}`) => void;
}

export const useAllowance = ({ tokenDecimals, tokenAddress, amount, setLoading, setHash }: useAllowanceProps) => {
    const { state: { walletChain } } = useStateContext();
    const amountToApprove = ethers.utils.parseUnits(amount.toString(), tokenDecimals);
    const lifiDiamondAddress = "0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE";

    const approveAllowance = async () => {
        // Transactions with the native token don't need approval
        if (tokenAddress === walletChain?.nativeToken.address) return true;
        else {
            let signer: providers.JsonRpcSigner | undefined;
            await getEthersSigner(config, { chainId: walletChain?.id }).then(data => signer = data);
            const tokenContract = new ethers.Contract(tokenAddress, erc20_abi, signer as Signer);
            const allowance = await tokenContract.allowance(await signer?.getAddress(), lifiDiamondAddress);

            if (allowance.lt(amountToApprove)) {
                const approveTx = await tokenContract.approve(lifiDiamondAddress, amountToApprove, { gasPrice: await signer?.provider.getGasPrice() })
                setLoading?.(true);
                try {
                    await approveTx.wait();
                    setLoading?.(false);
                    setHash?.(approveTx.hash);
                    console.log(`Approve succesfully: ${approveTx.hash}`)

                    return true;
                } catch (error) {
                    setLoading?.(false);
                    console.log(`Approve failed with error: ${error}`)

                    return false;
                }
            } else return true;
        }
    }

    return { approveAllowance };
}