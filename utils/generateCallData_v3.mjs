import { polygonWeb3Instance } from "../helpers/polygonWeb3Instance.mjs";
import { zeroForOne } from "../helpers/zeroForOne.mjs";

export const generate_calldata_V3 = async (
  contract,
  fromTokenAddress,
  toTokenAddress,
  amountIn,
  recipient,
  index,
  nextPoolIsV3,
  generateCallDataInitialState
) => {
  let sqrtPriceLimit;
  const _zeroForOne = await zeroForOne(
    contract,
    fromTokenAddress,
    toTokenAddress
  );
  const callback = polygonWeb3Instance.eth.abi.encodeParameters(
    ["bool", "address", "address"],
    [_zeroForOne, fromTokenAddress, generateCallDataInitialState.executor]
  );
  if (_zeroForOne) {
    generateCallDataInitialState.zeroForOne += 1 << index;
    sqrtPriceLimit = "4295128740";
  } else {
    generateCallDataInitialState.zeroForOne += 0 << index;
    sqrtPriceLimit = "1461446703485210103287273052203988822378723970341";
  }
  ///@dev Bit Patterns: 01 => msg.sender, 10 => ConveyorSwapExecutor, 11 = next pool, 00 = ConveyorRouterV1
  //Update to address bitmap
  if (nextPoolIsV3 !== null) {
    //If next pool is v3 send to the ConveyorSwapExecutor else send to the next pool.
    generateCallDataInitialState.toAddress += nextPoolIsV3
      ? 2 << (2 * index)
      : 3 << (2 * index);
  } else {
    if (
      generateCallDataInitialState.destinationToken.toLowerCase() ==
      generateCallDataInitialState.ETH
    ) {
      // recipient is routerV1
      generateCallDataInitialState.toAddress += 0 << (2 * index);
    } else {
      // recipient is user
      generateCallDataInitialState.toAddress += 1 << (2 * index);
    }
  }
  //Don't need to update the fee bitmap since this is a v3 swap.

  //Call type bit pattern = 1 since the swap is v3
  generateCallDataInitialState.dataType += 1 << (2 * index);
  const swapCalldata = contract.methods
    .swap(recipient, _zeroForOne, amountIn, sqrtPriceLimit, callback)
    .encodeABI();
  //Push the calldata
  generateCallDataInitialState.calldata.push([contract._address, swapCalldata]);
};
