import { calculatePercentage } from "../helpers/calculatePercentage.mjs";
import { generate_calldata_V2 } from "./generate_calldata_V2.mjs";
import { getAmountOutV2 } from "./getAmountOutV2.mjs";
import { getContract } from "../helpers/getContract.mjs";
import { isV3Address } from "../helpers/isV3Address.mjs";
import getOutPutAmountV3 from "./v3Custom.mjs";
import { generate_calldata_V3 } from "./generateCallData_v3.mjs";

export const processRoutes = async (
  optimalRoute,
  destinationToken,
  amountIn,
  recipient,
  generateCallDataInitialState
) => {
  let nextIterationAmount = BigInt("0");
  let totalIterationAmount = BigInt("0");

  for (let index = 0; index < optimalRoute.length; index++) {
    totalIterationAmount = BigInt("0");
    const protocols = optimalRoute[index];
    let nextPoolIsV3 = null;

    if (index !== optimalRoute.length - 1) {
      for (const { LP_Address, functionToCall } of optimalRoute[index + 1]) {
        nextPoolIsV3 = await isV3Address(LP_Address, functionToCall);
      }
    }
    for (const {
      LP_Address,
      part,
      fromTokenAddress,
      toTokenAddress,
      functionToCall,
    } of protocols) {
      console.log("LP address: ", LP_Address);
      const isV3 = await isV3Address(LP_Address, functionToCall);
      if (index == 0) {
        //If the first pool is v3 set the tokenInDestination to the executor contract
        //To send the funds in the v3 callback
        if (isV3) {
          generateCallDataInitialState.tokenInDestination =
            generateCallDataInitialState.executor;
        } else {
          generateCallDataInitialState.tokenInDestination = LP_Address;
        }
      }
      let contract = await getContract(LP_Address, functionToCall);
      const percentage = calculatePercentage(
        index > 0 ? nextIterationAmount : BigInt(amountIn),
        part
      );
      if (!isV3) {
        const amountOut = await getAmountOutV2(
          contract,
          percentage,
          fromTokenAddress,
          toTokenAddress
        );
        // v2 swap...
        totalIterationAmount = totalIterationAmount + amountOut;
        await generate_calldata_V2(
          contract,
          fromTokenAddress,
          index,
          nextPoolIsV3,
          generateCallDataInitialState
        );
      } else {
        // executing v3 logic...
        // generating V3 calldata...
        const amountOut = await getOutPutAmountV3(
          contract,
          fromTokenAddress,
          toTokenAddress,
          percentage,
          amountIn
        );
        if (toTokenAddress.toLowerCase() === destinationToken.toLowerCase()) {
          // recipient is user...
          await generate_calldata_V3(
            contract,
            fromTokenAddress,
            toTokenAddress,
            percentage,
            recipient,
            index,
            nextPoolIsV3,
            generateCallDataInitialState
          );
        } else {
          if (
            toTokenAddress.toLowerCase() ===
              generateCallDataInitialState.WETH.toLowerCase() &&
            destinationToken.toLowerCase() ===
              generateCallDataInitialState.ETH.toLowerCase()
          ) {
            await generate_calldata_V3(
              contract,
              fromTokenAddress,
              toTokenAddress,
              percentage,
              generateCallDataInitialState.aggregator,
              index,
              nextPoolIsV3,
              generateCallDataInitialState
            );
          } else {
            await generate_calldata_V3(
              contract,
              fromTokenAddress,
              toTokenAddress,
              percentage,
              generateCallDataInitialState.executor,
              index,
              nextPoolIsV3,
              generateCallDataInitialState
            );
          }
        }

        totalIterationAmount = totalIterationAmount + BigInt(amountOut);
      }
    }
    nextIterationAmount = totalIterationAmount;
  }
  console.log("calldata generated: ", generateCallDataInitialState);
};
