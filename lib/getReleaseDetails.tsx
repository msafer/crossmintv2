import axios from "axios";

export const getReleaseDetails = async (chainId: number, address: string) => {
  try {
    const url = `https://hq.decent.xyz/api/1.0/contracts/${chainId}/${address}`
    const { data: contractData } = await axios.get(url, {
      headers: {
        accept: 'application/json',
        'x-api-key': `${process.env.NEXT_PUBLIC_DECENT_API_KEY}`
      }
    });
    return contractData;
  } catch (error) {
    console.log(error);
  }
}