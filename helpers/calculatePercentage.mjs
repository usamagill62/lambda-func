export const calculatePercentage = (amount, percentage) => {
  const BigIntAmount = BigInt(amount);
  const BigIntPercentage = BigInt(percentage);
  return (BigIntAmount * BigIntPercentage) / BigInt(100);
};
