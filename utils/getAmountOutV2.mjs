export const getAmountOutV2 = async (
  pairContract,
  amountIn,
  tokenIn,
  tokenOut
) => {
  const _token0 = await pairContract.methods.token0().call();
  const _token1 = await pairContract.methods.token1().call();
  if (
    _token0.toLowerCase() === tokenIn.toLowerCase() &&
    _token1.toLowerCase() === tokenOut.toLowerCase()
  ) {
    const reserves = await pairContract.methods.getReserves().call();
    const amountInWithFee = amountIn * BigInt(997);
    const numerator = amountInWithFee * BigInt(reserves._reserve1);
    const denominator = BigInt(reserves._reserve0 * 1000) + amountInWithFee;
    const amountOut = numerator / denominator;
    return amountOut;
  } else {
    const reserves = await pairContract.methods.getReserves().call();
    const amountInWithFee = amountIn * BigInt(997);
    const numerator = amountInWithFee * BigInt(reserves._reserve0);
    const denominator = BigInt(reserves._reserve1 * 1000) + amountInWithFee;
    const amountOut = numerator / denominator;
    return amountOut;
  }
};
