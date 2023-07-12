export const estimateGasTKNtoETH = async (
  aggregatorContract,
  sourceToken,
  amountIn,
  slippage,
  recipient,
  generateCallDataInitialState
) => {
  const estimation = await aggregatorContract.methods
    .quoteSwapExactTokenForEth(
      sourceToken,
      amountIn,
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
