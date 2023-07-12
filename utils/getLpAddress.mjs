import {
  dystopiaABI,
  quickSwapV3ABI,
  uniswapV2ABI,
  uniswapV3ABI,
} from "../abi/abiCollection.mjs";

import Web3 from "web3";
import { getContract } from "../helpers/getContract.mjs";

export const getLpAddress = async (exchange) => {
  const providerUrl =
    "https://polygon-mainnet.g.alchemy.com/v2/JLbLFgkieJfw7EVGfZYAkIci42u_1Gdj";
  const web3 = new Web3(providerUrl);

  const callContractMethod = {
    getPair: (contract, fromTokenAddress, toTokenAddress) =>
      contract.methods.getPair(fromTokenAddress, toTokenAddress).call(),
    getPair2: (contract, fromTokenAddress, toTokenAddress) =>
      contract.methods.getPair(fromTokenAddress, toTokenAddress, true).call(),
    getPool: (contract, fromTokenAddress, toTokenAddress, fee) =>
      contract.methods.getPool(fromTokenAddress, toTokenAddress, fee).call(),
    getUnamplifiedPool: (contract, fromTokenAddress, toTokenAddress) =>
      contract.methods
        .getUnamplifiedPool(fromTokenAddress, toTokenAddress)
        .call(),
    getDODOPool: (contract, fromTokenAddress, toTokenAddress) =>
      contract.methods.getDODOPool(fromTokenAddress, toTokenAddress).call(),
    getCurve: (contract, fromTokenAddress, toTokenAddress) =>
      contract.methods.getCurve(fromTokenAddress, toTokenAddress).call(),
    tokenToPool: (contract, fromTokenAddress, toTokenAddress) =>
      contract.methods.tokenToPool(fromTokenAddress, toTokenAddress).call(),
    getDodo: (contract, fromTokenAddress, toTokenAddress) =>
      contract.methods.getDodo(fromTokenAddress, toTokenAddress).call(),
    poolByPair: (contract, fromTokenAddress, toTokenAddress) =>
      contract.methods.poolByPair(fromTokenAddress, toTokenAddress).call(),
  };

  const matchABIWithFactoryAddress = {
    "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32": uniswapV2ABI,
    "0xc35DADB65012eC5796536bD9864eD8773aBc74C4": uniswapV2ABI,
    "0x800b052609c355cA8103E06F022aA30647eAd60a": uniswapV2ABI,
    "0xE7Fb3e833eFE5F9c441105EB65Ef8b261266423B": uniswapV2ABI,
    "0xEAA98F7b5f7BfbcD1aF14D0efAa9d9e68D82f640": uniswapV2ABI,
    "0xa98ea6356A316b44Bf710D5f9b6b4eA0081409Ef": uniswapV2ABI,
    "0x668ad0ed2622C62E24f0d5ab6B6Ac1b9D2cD4AC7": uniswapV2ABI,
    "0x4FEE52912f81B78C3CdcB723728926ED6a893D27": uniswapV2ABI,
    "0xCf083Be4164828f00cAE704EC15a36D711491284": uniswapV2ABI,
    "0x477Ce834Ae6b7aB003cCe4BC4d8697763FF456FA": uniswapV2ABI,
    "0x1F98431c8aD98523631AE4a59f267346ea31F984": uniswapV3ABI,
    "0xE3BD06c7ac7E1CeB17BdD2E5BA83E40D1515AF2a": uniswapV2ABI,
    "0x3ed75AfF4094d2Aaa38FaFCa64EF1C152ec1Cf20": uniswapV2ABI,
    "0x1d21Db6cde1b18c7E47B0F7F42f4b3F68b9beeC9": dystopiaABI,
    "0xB581D0A3b7Ea5cDc029260e989f768Ae167Ef39B": uniswapV2ABI,
    "0x9F3044f7F9FC8bC9eD615d54845b4577B833282d": uniswapV2ABI,
    "0x7cFB780010e9C861e03bCbC7AC12E013137D47A5": uniswapV2ABI,
    "0x411b0fAcC3489691f28ad58c47006AF5E3Ab3A28": quickSwapV3ABI,
    "0x30030Aa4bc9bF07005cf61803ac8D0EB53e576eC": dystopiaABI,
  };
  const {
    factoryAddress,
    fromTokenAddress,
    toTokenAddress,
    functionToCall,
    name,
  } = exchange;
  let sortedTokens = [fromTokenAddress, toTokenAddress].sort();
  let pairAddress;

  const contract = new web3.eth.Contract(
    matchABIWithFactoryAddress[factoryAddress],
    factoryAddress
  );
  const method = callContractMethod[functionToCall];
  if (name === "POLYGON_UNISWAP_V3") {
    let bestPrice = fromTokenAddress < toTokenAddress ? BigInt("0") : BigInt("1461501637330902918203684832716283019655932542976");
    let bestLp;
    for (const fee of [100, 300, 500, 3000, 10000]) {
      let lpAddressValue = await method(
        contract,
        fromTokenAddress < toTokenAddress ? fromTokenAddress : toTokenAddress,
        fromTokenAddress < toTokenAddress ? toTokenAddress : fromTokenAddress,
        fee
      );

      if (lpAddressValue && lpAddressValue !== "0x0000000000000000000000000000000000000000") {
        const poolContract = await getContract(lpAddressValue, functionToCall);
        const { sqrtPriceX96,  } = await poolContract.methods
        .slot0()
        .call();
        if (fromTokenAddress < toTokenAddress) {
          if (sqrtPriceX96 > bestPrice) {
            bestPrice = sqrtPriceX96;
            bestLp = lpAddressValue;
          }
        }else {
          if (sqrtPriceX96 < bestPrice) {
            bestPrice = sqrtPriceX96;
            bestLp = lpAddressValue;
          }
        }
      }
      pairAddress = bestLp;
    }
  } else {
    pairAddress = await method(contract, fromTokenAddress, toTokenAddress);
  }

  return { ...exchange, LP_Address: pairAddress };
};
