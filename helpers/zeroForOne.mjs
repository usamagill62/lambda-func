export const zeroForOne = async (pairContract, tokenIn, tokenOut) => {
  const _token0 = await pairContract.methods.token0().call();
  const _token1 = await pairContract.methods.token1().call();
  if (
    tokenIn.toLowerCase() === _token0.toLowerCase() &&
    tokenOut.toLowerCase() === _token1.toLowerCase()
  ) {
    return true;
  } else {
    return false;
  }
};
