# Minting Page Starter – Decent NFTs

Custom NFT minting page starter repo built on [Next.js](https://nextjs.org/), [Tailwind](https://tailwindcss.com/docs/customizing-colors), and [Decent](http://decent.xyz/), deployed on [Vercel](https://vercel.com/).

![](/public/images/example.png)

The purpose of this repository is to get you up & running quickly with a custom NFT minting page.  **Notably, this repository enables purchasing NFTs with either crypto or credit cards.**  The primary functionality demonstrated in this repo is the ability to mint NFTs from Decent's [Editions](https://docs.decent.xyz/docs/editions) & [Rentable](https://docs.decent.xyz/docs/rentable) contracts.

For a video tutorial on how to get up and running in ~10min, please check out the [YouTube demo](https://youtu.be/5_WbP9bjPKU).

## Deployment Instructions

You will need to create a [Decent NFT](https://hq.decent.xyz/), [Decent API Key](https://docs.google.com/forms/d/e/1FAIpQLSdPBORZGU-JsMxwlhan9aUl01QCTgu2KJMEEPjhHC_9v1PQqA/viewform), [Crossmint Client ID](https://www.crossmint.com/console/overview), and [Alchemy API Key](https://www.alchemy.com/) to use this starter. Here are the steps:

1. Go to https://hq.decent.xyz/create/Editions and create a new NFT

2. From the success page, copy the contract address and note the chain ID number.  You can deploy your NFT to Ethereum, Polygon, Arbitrum or Optimism.  These chains have the following IDs:

| Chain       | ID Number   |
| ----------- | ----------- |
| Ethereum    | 1           |
| Polygon     | 137         |
| Arbitrum    | 42161       |
| Optimism    | 10          |

The example uses an NFT on Polygon.  On the `index.tsx` page, enter your NFT's chain ID and contract address in the `getServerSideProps` request + the `activeChain` property within the `<MintButton />` component.

3. Request a [Decent API Key](https://docs.google.com/forms/d/e/1FAIpQLSdPBORZGU-JsMxwlhan9aUl01QCTgu2KJMEEPjhHC_9v1PQqA/viewform) and add it to your .env file.  Once inputted, your minting page will automatically populate with your NFT's data and metadata.  If you would like to add or swap information, please visit [Decent's API Documentation](https://docs.decent.xyz/reference/get_contracts-chainid-address) to query for your contract and view the JSON response to see the available information.

4. (Skip to #5 if do not want credit cards) Visit the [Crossmint Developer Console](https://www.crossmint.com/console/overview), and select the "Enable credit card payments" option.

5. Click on "Register a new collection" and follow the form's steps.  Crossmint will automatically populate the ABI for all Decent contracts, so you should not have to worry about that step.  Enter the client ID you receive as your .env file to enable credit card payments.

6. Create an Alchemy account and visit [your dashboard](https://dashboard.alchemy.com/) to create an Alchemy API key. Alchemy facilitates the connection between your application and the chain of your choice.

7. If your NFT is not on Polygon, visit the `_app.tsx` file and update the chain config for the chain of your choice.

8. (Optional) Create your own [Privy application id](http://privy.io/) and enter it on the `_app.tsx` file here: `http://privy.io/`.  Ok to just use Decent's default appId as well.

Reach out to [@cdurbinxyz](https://twitter.com/cdurbinxyz) on Twitter if you run into any issues.

## Gasless Mint for free NFTs

1. Create a brand new Metamask wallet and export the private key, use these [instructions](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)

2. Add the private key to the NEXT_PUBLIC_GAS_WALLET_KEY env.

3. Fill the wallet with native token on Polygon -> MATIC, on Eth -> ETH, etc. Send a safe amount to the wallet, this will be processing all the txns. If gas runs out your users wont be able to mint!

4. Swap the <MintButton> component for <GaslessMintButton> in index.tsx.

5. Mint! No txns or pop-ups for your users!

## To Run

First, install dependencies using npm:

```bash
npm i
```

Next, run `cp .env.example .env.local` to create your file to enter the information detailed above.  It should look like:

```bash
NEXT_PUBLIC_CROSSMINT_CLIENTID=<your-crossmint-client-id>
NEXT_PUBLIC_DECENT_API_KEY=<your-decent-api-key>
NEXT_PUBLIC_ALCHEMY_API_KEY=<your-alchemy-api-key>
NEXT_PUBLIC_GAS_WALLET_KEY=<your-gas-wallet-key>
```

Lastly, run the development server:

```bash
npm run dev
```

## Demo

https://minting-page-decent-webapp.vercel.app/

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DecentSDK](https://www.npmjs.com/package/@decent.xyz/sdk)
- [Decent API](https://docs.decent.xyz/reference/get_allowlists-merkleroot)
- [Crossmint](https://www.crossmint.io/)
- [Privy](https://docs.decent.xyz/)
