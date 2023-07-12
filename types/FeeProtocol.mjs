import Web3 from "web3";
import { config } from "dotenv";

export class FeeProtocol {
  polygonScanAPI =
    "https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=F337QDY7MGY7UQAA2MKRV7ZIWVJK66II4C";
  polygonWeb3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://polygon-mainnet.g.alchemy.com/v2/JLbLFgkieJfw7EVGfZYAkIci42u_1Gdj"
    )
  );
  oneInchEstimatedGas;
  conveyorEstimatedGas;

  /**
   *
   * @param {gWEI is unit} oneInchEstimatedGas
   * @param {gWEI is unit} conveyorEstimatedGas
   * @returns difference in gWEI of estimated gas consumption...
   */
  constructor(conveyorEstimatedGas, oneInchEstimatedGas) {
    this.conveyorEstimatedGas = BigInt(conveyorEstimatedGas);
    this.oneInchEstimatedGas = BigInt(oneInchEstimatedGas);
  }
  gasDifference = async () => {
    return this.oneInchEstimatedGas - this.conveyorEstimatedGas;
  };
  /**
   * @returns gasSaved in ETH unit...
   */
  savedGas = async () => {
    const price = await this.gasPrice();
    const gas = await this.gasDifference();
    const gasSaved = gas * price;
    return gasSaved;
  };

  gasPrice = async () => {
    const gasPrice = BigInt(await this.polygonWeb3.eth.getGasPrice());
    return gasPrice;
  };

  // user savings and protocol fee is same value...
  protocolFee = async () => {
    const savedValue = await this.savedGas();
    if (savedValue < BigInt(0)) {
      return BigInt(0);
    }
    const fee = savedValue / BigInt(2);
    return fee;
  };
}
