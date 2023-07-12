
import { calculateSlippage } from "./calculateSlippage.mjs";
describe("calculateSlippage", () => {
    it("0.5% slippage", () => {
        const toTokenAmount = 1000;
        const slippage = 50; // 0.5%
        const result = calculateSlippage(toTokenAmount, slippage);
        expect(result).toEqual("995");
    });
    it("1% slippage", () => {
        const toTokenAmount = 1000;
        const slippage = 100; // 1%
        const result = calculateSlippage(toTokenAmount, slippage);
        expect(result).toEqual("990");
    });
    it("0% slippage shouldn't get division by 0", () => {
        const toTokenAmount = 1000;
        const slippage = 0; // 0%
        const result = calculateSlippage(toTokenAmount, slippage);
        expect(result).toEqual("1000");
    });
});

