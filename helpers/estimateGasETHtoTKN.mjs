export const estimateGasETHtoTKN = async (
  aggregatorContract,
  amountIn,
  destinationToken,
  recipient,
  generateCallDataInitialState
) => {
  const estimation = await aggregatorContract.methods
    .quoteSwapExactEthForToken(
      destinationToken, //tokenOut
      1, //AmountOutMin
      0, //ProtocolFee
      [
        generateCallDataInitialState.zeroForOne,
        generateCallDataInitialState.dataType,
        generateCallDataInitialState.toAddress,
        generateCallDataInitialState.fee,
        generateCallDataInitialState.tokenInDestination,
        generateCallDataInitialState.calldata,
      ],
      [recipient, 0],
      "false"
    )
    .call({ from: recipient, value: amountIn });
  return estimation;
};
