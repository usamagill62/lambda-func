import { availableProtocols } from "../constants/availableProtocols.mjs";
import { getLpAddress } from "./getLpAddress.mjs";

export const matchProtocolWIthAddresses = async (protocol) => {
  const finalArray = await Promise.all(
    protocol.map(async (subArray) => {
      const modifiedArray = await Promise.all(
        subArray.map(async (channel) => {
          if (availableProtocols[channel.name]) {
            const lpAddress = await getLpAddress({
              ...channel,
              fromTokenAddress:
                channel.fromTokenAddress.toLowerCase() ===
                "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
                  ? "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
                  : channel.fromTokenAddress,
              toTokenAddress:
                channel.toTokenAddress.toLowerCase() ===
                "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
                  ? "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
                  : channel.toTokenAddress,
              ...availableProtocols[channel.name],
            });
            return lpAddress;
          }
        })
      );
      return modifiedArray.filter(Boolean);
    })
  );
  return finalArray;
};
