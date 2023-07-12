import { FeeProtocol } from "../types/FeeProtocol.mjs";
import { estimateApproximateGas } from "./estimateApproximateGas.mjs";
import { estimateGasETHtoTKN } from "../helpers/estimateGasETHtoTKN.mjs";
import { estimateGasTKNtoETH } from "../helpers/estimateGasTKNtoETH.mjs";
import { estimateGasTKNtoTKN } from "../helpers/estimateGasTKNtoTKN.mjs";
import { getNonce } from "../helpers/getNonce.mjs";
export const generateTx = async (
  aggregatorContract,
  sourceToken,
  destinationToken,
  amountIn,
  recipient,
  oneinchEstimatedGas,
  generateCallDataInitialState,
  slippage,
  toTokenAmount,
  optimalRoute
) => {
  const nonce = await getNonce(recipient);
  let conveyorEstimatedGas = BigInt("0");
  if (sourceToken.toLowerCase() === generateCallDataInitialState.ETH) {
    //Do not make the gas estimation call if the recipient is the zero address.
    try {
      // ETH to Token...
      conveyorEstimatedGas = await estimateGasETHtoTKN(
        aggregatorContract,
        amountIn,
        destinationToken,
        recipient,
        generateCallDataInitialState
      );
    } catch (error) {
      //We approximate the gas if the estimation fails
      console.error("Error when estimating Gas", error);
      conveyorEstimatedGas = await estimateApproximateGas(optimalRoute);
    }

    const feeProtocol = new FeeProtocol(
      conveyorEstimatedGas,
      oneinchEstimatedGas
    );
    const fee = await feeProtocol.protocolFee();
    let value_to_send = parseInt(fee) + parseInt(amountIn);
    value_to_send = value_to_send.toString();
    //TODO: Fix this Set amount out min to the value supplied from the websites payload
    const aggregatorCalldata = await aggregatorContract.methods
      .swapExactEthForToken(
        destinationToken,
        1,
        fee < BigInt("0") ? "0" : fee.toString(),
        [
          generateCallDataInitialState.zeroForOne,
          generateCallDataInitialState.dataType,
          generateCallDataInitialState.toAddress,
          generateCallDataInitialState.fee,
          generateCallDataInitialState.tokenInDestination,
          generateCallDataInitialState.calldata,
        ]
      )
      .encodeABI();
    const txParams = {
      tx: {
        from: recipient,
        to: generateCallDataInitialState.aggregator,
        gas: conveyorEstimatedGas.toString(),
        nonce: nonce,
        value: value_to_send,
        data: aggregatorCalldata,
      },

      info: {
        amountOutMin: slippage,
        amountOut: toTokenAmount,
      },
    };
    generateCallDataInitialState.calldata = [];
    generateCallDataInitialState.zeroForOne = 0;
    generateCallDataInitialState.toAddress = 0;
    generateCallDataInitialState.fee = 0;
    generateCallDataInitialState.dataType = 0;
    return txParams;
  } else if (
    destinationToken.toLowerCase() == generateCallDataInitialState.ETH
  ) {
    try {
      // Token to ETH...
      conveyorEstimatedGas = await estimateGasTKNtoETH(
        aggregatorContract,
        sourceToken,
        amountIn,
        slippage,
        recipient,
        generateCallDataInitialState
      );
    } catch (error) {
      console.error("Error when estimating Gas", error);
      //We approximate the gas if the estimation fails
      conveyorEstimatedGas = await estimateApproximateGas(optimalRoute);
    }

    const feeProtocol = new FeeProtocol(
      conveyorEstimatedGas,
      oneinchEstimatedGas
    );
    const fee = await feeProtocol.protocolFee();
    console.log("Fee: ", fee.toString());
    console.log(slippage);
    console.log(amountIn);
    const aggregatorCalldata = aggregatorContract.methods
      .swapExactTokenForEth(sourceToken, amountIn, slippage, [
        generateCallDataInitialState.zeroForOne,
        generateCallDataInitialState.dataType,
        generateCallDataInitialState.toAddress,
        generateCallDataInitialState.fee,
        generateCallDataInitialState.tokenInDestination,
        generateCallDataInitialState.calldata,
      ])
      .encodeABI();
    const txParams = {
      tx: {
        from: recipient,
        to: generateCallDataInitialState.aggregator,
        gas: conveyorEstimatedGas.toString(),
        nonce: nonce,
        value: fee < BigInt("0") ? "0" : fee.toString(),
        data: aggregatorCalldata,
      },
      info: {
        amountOutMin: slippage,
        amountOut: toTokenAmount,
      },
    };
    generateCallDataInitialState.calldata = [];
    generateCallDataInitialState.zeroForOne = 0;
    generateCallDataInitialState.toAddress = 0;
    generateCallDataInitialState.fee = 0;
    generateCallDataInitialState.dataType = 0;
    return txParams;
  } else {
    try {
      conveyorEstimatedGas = await estimateGasTKNtoTKN(
        aggregatorContract,
        sourceToken,
        amountIn,
        slippage,
        recipient,
        destinationToken,
        generateCallDataInitialState
      );
    } catch (error) {
      //We approximate the gas if the estimation fails
      console.error("Error when estimating Gas", error);
      conveyorEstimatedGas = await estimateApproximateGas(optimalRoute);
    }

    const feeProtocol = new FeeProtocol(
      conveyorEstimatedGas,
      oneinchEstimatedGas
    );
    const fee = await feeProtocol.protocolFee();
    const aggregatorCalldata = aggregatorContract.methods
      .swapExactTokenForToken(
        sourceToken,
        amountIn,
        destinationToken,
        slippage,
        [
          generateCallDataInitialState.zeroForOne,
          generateCallDataInitialState.dataType,
          generateCallDataInitialState.toAddress,
          generateCallDataInitialState.fee,
          generateCallDataInitialState.tokenInDestination,
          generateCallDataInitialState.calldata,
        ]
      )
      .encodeABI();
    const txParams = {
      tx: {
        from: recipient,
        to: generateCallDataInitialState.aggregator,
        gas: conveyorEstimatedGas.toString(),
        nonce: nonce,
        value: fee < BigInt("0") ? "0" : fee.toString(),
        data: aggregatorCalldata,
      },

      info: {
        amountOutMin: slippage,
        amountOut: toTokenAmount,
      },
    };
    generateCallDataInitialState.calldata = [];
    generateCallDataInitialState.zeroForOne = 0;
    generateCallDataInitialState.toAddress = 0;
    generateCallDataInitialState.fee = 0;
    generateCallDataInitialState.dataType = 0;
    return txParams;
  }
};
