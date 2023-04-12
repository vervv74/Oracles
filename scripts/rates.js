require("@nomiclabs/hardhat-waffle");
let qwe;
const Holder = process.env.Holder;
const { abi } = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const num6 = ethers.BigNumber.from('1000000');
const num12= ethers.BigNumber.from('1000000000000');
const CL = require('../artifacts/contracts/Chainlink.sol/Chainlink.json');
const defI = require('../artifacts/contracts/Defi.sol/Defi.json');
const { POSClient, use } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-ethers");
use(Web3ClientPlugin);
module.exports = {

    Chainlink: (async (signer) => {
              chainlink_contract = new ethers.Contract(process.env.Chainlink_address, CL.abi, signer);
        USDC_usd = await chainlink_contract.getLatestPrice(process.env.USDT_USD_Chainlink_Polygon);
        USDT_usd = await chainlink_contract.getLatestPrice(process.env.USDC_USD_Chainlink_Polygon);
        chainlink_rate = ethers.BigNumber.from(USDT_usd).mul(num6).div(ethers.BigNumber.from(USDC_usd));
        return chainlink_rate;
    }),
    DF: (async (signer) => {
        df_contract = new ethers.Contract(process.env.df_address, defI.abi, signer);
        Sushi_rate = await df_contract.getAmountsOut(num6, process.env.USDC, process.env.USDT, process.env.SushiswapRouter);
        Quick_rate = await df_contract.getAmountsOut(num6, process.env.USDC, process.env.USDT, process.env.QuickSwapUniswapV2Router02);
        pool = await df_contract.poolAdress(process.env.USDC, process.env.USDT, process.env.FACTORY, 500);
        poolContract = new ethers.Contract(
            pool,
            abi,
            signer
        );
        const slot = await poolContract.slot0();
        const sqrtPriceX96 = slot[0].toString();
        Uniswap_rate = ethers.BigNumber.from(ethers.FixedNumber.from(((sqrtPriceX96 ** 2 / (2 ** 192))).toString())).div(num12);
        UniswapUSDT_USDC = ethers.BigNumber.from(ethers.FixedNumber.from((((2 ** 192) / sqrtPriceX96 ** 2)).toString()));
       
       
        return {Uniswap_rate, Sushi_rate, Quick_rate };
    }),
}