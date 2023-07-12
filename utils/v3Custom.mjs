import { CurrencyAmount, Token } from "@uniswap/sdk-core";
import { Tick, TickListDataProvider } from "@uniswap/v3-sdk";

import JSBI from "jsbi";
import Pool from "../types/V3Pool.mjs";
import { calculateIndex } from "../helpers/calculateIndex.mjs";

const getOutPutAmountV3 = async (
  contractInstance,
  fromTokenAddress,
  toTokenAddress,
  amount
) => {
  let data = {};
  const liquidity = await contractInstance.methods.liquidity().call();
  const tickSpacing = await contractInstance.methods.tickSpacing().call();
  if (!!contractInstance.methods.globalState) {
    const { price, tick, fee } = await contractInstance.methods
      .globalState()
      .call();
    data = {
      price,
      tick,
      fee,
      index: calculateIndex(Number(tick), Number(tickSpacing)),
      liquidity,
      tickSpacing,
    };
  } else {
    const { sqrtPriceX96, tick } = await contractInstance.methods
      .slot0()
      .call();
    const fee = await contractInstance.methods.fee().call();
    data = {
      price: sqrtPriceX96,
      tick,
      fee,
      index: calculateIndex(Number(tick), Number(tickSpacing)),
      liquidity,
      tickSpacing,
    };
  }
  const _token0 = await contractInstance.methods.token0().call();
  const _token1 = await contractInstance.methods.token1().call();
  let amountIn;
  let sqrtLimitX96;
  let token_0_class_instance;
  let token_1_class_instance;
  if (
    _token0.toLowerCase() === fromTokenAddress.toLowerCase() &&
    _token1.toLowerCase() === toTokenAddress.toLowerCase()
  ) {
    token_0_class_instance = new Token(0, fromTokenAddress, 0, "", "");
    token_1_class_instance = new Token(0, toTokenAddress, 0, "", "");
    amountIn = CurrencyAmount.fromRawAmount(
      token_0_class_instance,
      amount.toString()
    );
    sqrtLimitX96 = JSBI.BigInt("4295128740");
  } else {
    token_0_class_instance = new Token(0, toTokenAddress, 0, "", "");
    token_1_class_instance = new Token(0, fromTokenAddress, 0, "", "");
    amountIn = CurrencyAmount.fromRawAmount(
      token_1_class_instance,
      amount.toString()
    );
    sqrtLimitX96 = JSBI.BigInt(
      "1461446703485210103287273052203988822378723970341"
    );
  }
  const tick = new Tick({
    index: parseInt(data.index),
    liquidityGross: 0,
    liquidityNet: 0,
  });
  const ticks = new Array(tick);
  const sqrtPrice = JSBI.BigInt(data.price);
  const dataProvider = new TickListDataProvider(
    ticks,
    parseInt(data.tickSpacing)
  );
  const pool = new Pool(
    token_0_class_instance,
    token_1_class_instance,
    parseInt(data.fee),
    sqrtPrice,
    JSBI.BigInt(liquidity),
    parseInt(data.tick),
    dataProvider,
    parseInt(data.tickSpacing)
  );
  const outputAmount = await pool.getOutputAmount(amountIn, sqrtLimitX96);
  return Math.abs(outputAmount.toString());
};
export default getOutPutAmountV3;
