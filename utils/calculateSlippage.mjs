const TEN_THOUSAND = BigInt(10000);
export const calculateSlippage = (_toTokenAmount, _slippage) => {
  const minAllowed = TEN_THOUSAND - BigInt(_slippage);
  const slippage = ((BigInt(_toTokenAmount) * minAllowed)/TEN_THOUSAND);
  return slippage.toString();
};
