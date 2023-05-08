import { DecentSDK, edition } from "@decent.xyz/sdk";
import { usePrivy } from '@privy-io/react-auth';
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useState } from "react";
import handleTxError from "../lib/handleTxError";
import NumberTicker from "./NumberTicker";
import MarketplaceButtons from "./MarketplaceButtons";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { useSigner, useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { Alchemy, Network } from "alchemy-sdk";



// Set up Alchemy client
const alchemysettings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
  network: Network.OPT_GOERLI as Network,
};

const alchemy = new Alchemy(alchemysettings);

const GaslessMintButton = (props: any) => {
  const { ready, authenticated, linkWallet } = usePrivy();
  const { data: signer } = useSigner();
  const { address: account } = useAccount();
  const { chain: activeChain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [isMinting, setIsMinting] = useState(false);

  const onSigning = (isMinting: boolean) => {
    setIsMinting(isMinting || false);
  };

  const onSuccess = (receipt: any) => {
    if (receipt) setIsMinting(false);
  };

  const onSuccessfulMint = async (receipt: any) => {
    onSuccess?.(receipt);
    toast.success("Success!");
  }

  const mint = async () => {
    console.log(activeChain?.id, props.activeChain)
    if (activeChain?.id !== props.activeChain) {
      toast.error("Please switch to Polygon network to continue.");
      return;
    }
    if (signer) {
      try {
        onSigning?.(true);
        const provider = await alchemy.config.getProvider();
        const wallet = new ethers.Wallet(
          process.env.NEXT_PUBLIC_GAS_WALLET_KEY as string,
          provider
        );
        const sdk = new DecentSDK(props.chainId, wallet);
        const price: number = props.price * props.quantity;
        const nftOne = await edition.getContract(sdk, props.contractAddress);
        const tx = await nftOne.mint(account, props.quantity, { value: ethers.utils.parseEther(price.toString()) });
        const receipt = await tx.wait();
        await onSuccessfulMint(receipt);
      } catch (error) {
        handleTxError(error);
        onSigning?.(false);
      }
    } else {
      toast.error("Please connect wallet to continue.");
      if (ready && authenticated) {
        linkWallet();
      }
    }
  }
  return <div className="flex items-center justify-between h-20 gap-4 px-4 py-2 mx-4 sm:px-0">
    {props.state ?
      <>
        <CrossmintPayButton
          clientId={props.clientId}
          environment="production"
          className="w-32 xmint-btn"
          mintConfig={{
            type: "erc-721",
            totalPrice: (props.price * props.quantity).toString(),
            numberOfTokens: props.quantity
          }} />
      </>
      : <>
        <button className="bg-black hover:bg-opacity-80 drop-shadow-md text-white px-5 py-1 rounded-full font-[500] w-32 text-lg" onClick={mint}>{isMinting ? "..." : "Purchase"}</button>
      </>
    }
    <NumberTicker quantity={props.quantity} setQuantity={props.setQuantity} />
    <MarketplaceButtons decentLink={props.decentLink} />
  </div>;
};

export default GaslessMintButton;