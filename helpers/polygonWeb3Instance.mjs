import Web3 from "web3";
import { providerUrl } from "../constants/providerUrl.mjs";

export const polygonWeb3Instance = new Web3(providerUrl);
