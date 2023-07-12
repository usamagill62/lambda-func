import { isV3Address } from "../helpers/isV3Address.mjs";
//Conveyor Contract cost
const BASE_GAS = BigInt("21000");

//Approximates total gas based on the approximated gas per swap
export const estimateApproximateGas = async (optimalRoute) => {
    let totalGas = BASE_GAS;
    for (let i=0; i < optimalRoute.length; i++) {
        for (const {
            LP_Address,
            functionToCall,
        } of optimalRoute[i]) {
            switch (await isV3Address(LP_Address, functionToCall)) {
                case true:
                    totalGas += BigInt("200000");
                case false:
                    totalGas += BigInt("150000");
                default:
            }
            console.log(totalGas);
        }
    }
    return totalGas;
}