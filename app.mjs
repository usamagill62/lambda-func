import { calculateSlippage } from "./utils/calculateSlippage.mjs";
import { mainHandler } from "./calldata/generateCallData.mjs";
import { matchProtocolWIthAddresses } from "./utils/matchProtocolWIthAddresses.mjs";
import { nullAddress } from "./constants/nullAddress.mjs";
import { parseBody } from "./utils/ParseBody.mjs";
import { responseInstance } from "./utils/responseInstance.mjs";
import { availableProtocols } from "./constants/availableProtocols.mjs";

export const lambdaHandler = async (payload) => {
  let generateCallDataInitialState = {
    amountIn: "",
    WETH: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    ETH: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    calldata: [],
    zeroForOne: 0,
    toAddress: 0,
    dataType: 0,
    fee: 0,
    sourceToken: "",
    destinationToken: "",
    tokenInDestination: "",
    recipient: "",
    executor: "0xFbB6FE24d669082cE523AD0a309173579D3Ba106",
    aggregator: "0x0B2666B5969272Cb4806759D5a25e0A3e1811a06",
    slippage: "",
    conveyorEstimatedGas: "",
  };

  const requestBody = parseBody(payload);

  if (Array.isArray(requestBody)) {
    return responseInstance(requestBody, 400, "Fields missing");
  } else {
    const {
      fromTokenAddress,
      toTokenAddress,
      amount,
      slippage,
      chainId,
      fromAddress,
    } = requestBody;

    const apiUrl = `https://api-conveyor.1inch.io/v5.0/${chainId}/quote`;

    const params = new URLSearchParams({
      fromTokenAddress,
      toTokenAddress,
      amount,
      slippage,
      mainRouteParts: 1,
      protocols: Object.keys(availableProtocols).join(),
    });

    const apiUrlWithParams = `${apiUrl}?${params.toString()}`;

    try {
      const response = await fetch(apiUrlWithParams);
      if (!response.ok) {
        const errorResponse = await response.json();
        return responseInstance(
          errorResponse,
          response.status,
          "Error response from 1inch API"
        );
      }
      const { protocols, toTokenAmount, estimatedGas } = await response.json();

      if (protocols && protocols.length === 0) {
        return responseInstance(null, 400, "No protocols Available");
      }

      // if (fromAddress === nullAddress) {
      //   return responseInstance(
      //     {
      //       amountOutMin: calculateSlippage(toTokenAmount, slippage),
      //       amountOut: toTokenAmount,
      //     },
      //     200,
      //     "GET request processed successfully"
      //   );
      // }
      const matchedAddresses = await matchProtocolWIthAddresses(
        protocols.length > 1
          ? protocols.sort((a, b) => a.length - b.length)
          : protocols[0]
      );

      const data = await mainHandler(
        generateCallDataInitialState,
        matchedAddresses,
        fromTokenAddress,
        toTokenAddress,
        amount,
        fromAddress,
        estimatedGas,
        calculateSlippage(toTokenAmount, slippage),
        toTokenAmount
      );
      return responseInstance(data, 200, "GET request processed successfully");
    } catch (error) {
      return responseInstance(error, 400, "something went wrong");
    }
  }
};
