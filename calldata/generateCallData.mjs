import { aggregatorABI } from "../abi/conveyorAggregator.mjs";
import { processRoutes } from "../utils/processRoutes.mjs";
import { generateTx } from "../utils/generateTx.mjs";
import { polygonWeb3Instance } from "../helpers/polygonWeb3Instance.mjs";

export const mainHandler = async (
  generateCallDataInitialState,
  optimalRoute,
  sourceToken,
  destinationToken,
  amountIn,
  recipient,
  estimatedGasOneInch,
  slippage,
  toTokenAmount
) => {
  // initializing global variables...
  generateCallDataInitialState.destinationToken = destinationToken;
  await processRoutes(
    optimalRoute,
    destinationToken,
    amountIn,
    recipient,
    generateCallDataInitialState
  );
  const aggregator = new polygonWeb3Instance.eth.Contract(
    aggregatorABI,
    generateCallDataInitialState.aggregator
  );

  return await generateTx(
    aggregator,
    sourceToken,
    destinationToken,
    amountIn,
    recipient,
    estimatedGasOneInch,
    generateCallDataInitialState,
    slippage,
    toTokenAmount,
    optimalRoute
  );
};
