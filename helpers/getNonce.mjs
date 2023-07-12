import { polygonWeb3Instance } from "./polygonWeb3Instance.mjs";

export const getNonce = async (signer) => {
  const nonce = await polygonWeb3Instance.eth.getTransactionCount(signer);
  return nonce;
};
