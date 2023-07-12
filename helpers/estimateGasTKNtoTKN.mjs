export const estimateGasTKNtoTKN = async (
  aggregatorContract,
  sourceToken,
  amountIn,
  slippage,
  recipient,
  destinationToken,
  generateCallDataInitialState
) => {
  const estimation = await aggregatorContract.methods
    .quoteSwapExactTokenForToken(
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
      ],
      [recipient, 0],
      "false"
    )
    .call({ from: recipient });
  return estimation;
};
