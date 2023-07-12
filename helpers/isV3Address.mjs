import { getContract } from "./getContract.mjs";

export const isV3Address = async (contractAddress, functionToCall) => {
  const contract = await getContract(contractAddress, functionToCall);
  if (!!contract.methods.symbol) {
    return false;
  }
  return true;
};
