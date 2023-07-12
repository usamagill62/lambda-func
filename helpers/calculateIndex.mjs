export const calculateIndex = (tick, tickSpacing) => {
  const index = Math.trunc(tick / tickSpacing) * tickSpacing;
  return index < tickSpacing ? tickSpacing : index;
};
