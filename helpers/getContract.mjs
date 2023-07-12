import {
  DystpairABI,
  quickSwapV3PairABI,
  uniV2PairABI,
  uniswapv3pairABI,
} from "../abi/abiPairCollection.mjs";
import Web3 from "web3";

import { providerUrl } from "../constants/providerUrl.mjs";

const matchABIWithLPAddress = {
  getPair: uniV2PairABI,
  getPool: uniswapv3pairABI,
  getPair2: DystpairABI,
  poolByPair: quickSwapV3PairABI,
};

export const getContract = async (lp_address, functionToCall) => {
  const web3 = new Web3(providerUrl);
  const contract = new web3.eth.Contract(
    matchABIWithLPAddress[functionToCall],
    lp_address
  );
  return contract;
};
