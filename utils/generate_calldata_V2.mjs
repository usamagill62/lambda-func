import { polygonWeb3Instance } from "../helpers/polygonWeb3Instance.mjs";

export const generate_calldata_V2 = async (
  contract,
  fromTokenAddress,
  index,
  nextPoolIsV3,
  generateCallDataInitialState
) => {
  const _token0 = await contract.methods.token0().call();
  //If token0 on the pool is the from token add 1<< index to the zeroForOne bitmap.
  if (fromTokenAddress.toLowerCase() === _token0.toLowerCase()) {
    generateCallDataInitialState.zeroForOne += 1 << index;
  } else {
    generateCallDataInitialState.zeroForOne += 0 << index;
  }
  ///@dev Bit Patterns: 01 => msg.sender, 10 => ConveyorSwapExecutor, 11 = next pool, 00 = ConveyorRouterV1
  //Update to address bitmap
  if (nextPoolIsV3 !== null) {
    //If next pool is v3 send to the ConveyorSwapExecutor else send to the next pool.
    generateCallDataInitialState.toAddress += nextPoolIsV3
      ? 2 << (2 * index)
      : 3 << (2 * index);
  } else {
    // No next pool exists...check if swap is TokenToEth or EthToToken...
    //Set to address bitmap to msg.sender
    if (
      generateCallDataInitialState.destinationToken.toLowerCase() ==
      generateCallDataInitialState.ETH
    ) {
      //
      generateCallDataInitialState.toAddress += 0 << (2 * index);
    } else {
      generateCallDataInitialState.toAddress += 1 << (2 * index);
    }
  }
  // generateCallDataInitialState.dataType += 0 << (2 * index);
  //Call type bit pattern = 0 since this is a v2 swap. Therefore no need to update the bitmap.
  //Update the fee bitmap TODO: Unhardcode this from 300.
  //Notice giving 10 bits of padding for the fee.
  generateCallDataInitialState.fee += 300 << (10 * index);
  //Push the calldata.
  generateCallDataInitialState.calldata.push([
    contract._address,
    polygonWeb3Instance.utils.hexToBytes("0x"),
  ]);
};
