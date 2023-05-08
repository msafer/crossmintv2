import type { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import MintButton from "../components/MintButton";
import GaslessMintButton from '../components/GaslessMintButton';
import Link from 'next/link';
import Toggle from '../components/Toggle';
import { getReleaseDetails } from '../lib/getReleaseDetails';
import getIpfsLink from "../lib/getIpfsLink";

const Home: NextPage = (props: any) => {
  const [creditCard, setCreditCard] = useState(true);
  const [mintQuantity, setMintQuantity] = useState(1);

  return <>
    <Head>
      <title>{props.contractData.data.name}</title>
      <meta
        name="description"
        content={props.contractData.metadata.description}
      />
      <link rel="icon" href={getIpfsLink(props.contractData.metadata.image)} />
    </Head>

    <main className={`${styles.main}`}>
      <div className='grid md:grid-cols-2 place-items-center w-full mt-[10vh] sm:mt-0'>
        <div className='md:h-[80vh] md:border-r border-black w-full'>
          <h1 className='p-8 border-b border-black text-7xl flex-items-center'>{props.contractData.data.name}</h1>
          <div className='font-[300] p-8 max-h-[50vh] overflow-y-scroll sm:border-b border-black text-sm'>
            {props.contractData.metadata.description}
          </div>
          <div className='px-8 py-4 h-[10vh] sm:border-none border-y border-black'>
            <div className='grid grid-cols-2'><p>Price:</p><p className='text-right'>{props.contractData.data.tokenPrice} MATIC</p></div>
            <div className='grid grid-cols-2'>
              <p>Minted:</p>
              <p className='text-right'>{props.contractData.data.totalSupply} / {props.contractData.data.MAX_TOKENS > 99999999 ? "Open" : props.contractData.data.MAX_TOKENS}</p>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center w-full px-4 my-4 sm:px-8 sm:my-0'>
          <div className='space-y-3'>
            <div className='h-[350px] w-[350px] relative'>
              <div style={{ height: "100%", width: "100%" }}>
                <Image className="drop-shadow-lg" src={getIpfsLink(props.contractData.metadata.image)} object-fit="contain" fill alt={'nft'} />
              </div>
              {!!props.contractData.metadata.animation_url && <audio className='absolute h-8 transform -translate-x-1/2 bottom-2 left-1/2' controls src={getIpfsLink(props.contractData.metadata.animation_url)}></audio>}
              </div>
              {/* Change to GaslessMintButton for free NFTs */}
            <MintButton 
              chainId={props.contractData.chainId} 
              contractAddress={props.contractData.address} 
              price={parseFloat(props.contractData.data.tokenPrice)} 
              setQuantity={setMintQuantity} 
              quantity={mintQuantity} 
              decentLink={'https://hq.decent.xyz/137/Editions/0xC6FeCF72687baA1dC1584d0Af26227858895D38c'} 
              state={creditCard} 
              clientId={process.env.NEXT_PUBLIC_CROSSMINT_CLIENTID}
              activeChain={137}
            />
            <Toggle state={creditCard} setState={setCreditCard} />
          </div>
        </div>
      </div>

      {/* would appreciate the footer s/o but do what you will 🤝 */}
      <footer className='sm:fixed bottom-0 w-full h-[10vh] border-t border-black justify-center flex items-center bg-white'>
        <p className='pr-2 tracking-widest text-sm font-[400]'>Powered by </p>
        <Link href="http://decent.xyz/" className='pt-1'>
          <Image src='/images/decent.png' height={12} width={85} alt='Decent 💪' />
        </Link>
      </footer>
    </main>
  </>
};

export default Home;

export async function getStaticProps() {
  const CHAINID = 137;
  const CONTRACT_ADDRESS = '0xC6FeCF72687baA1dC1584d0Af26227858895D38c';
  let contractData = await getReleaseDetails(CHAINID, CONTRACT_ADDRESS)
  return {
    props: {
      contractData
    },
    revalidate: 20
  };
};