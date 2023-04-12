require("@nomiclabs/hardhat-waffle");
const Holder = process.env.Holder;
const { abi } = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
num18 = ethers.BigNumber.from('1000000000000000000');
const num6 = ethers.BigNumber.from('1000000');
const { POSClient, use } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-ethers");
use(Web3ClientPlugin);
describe("First", () => {
    before(async () => {
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [Holder],
        });
        signer = await ethers.getSigner(Holder);
        Mycontract = await ethers.getContractFactory('Chainlink', signer);
        mycontract = await Mycontract.deploy();
        Mycontract1 = await ethers.getContractFactory('Defi', signer);
        mycontract1 = await Mycontract1.deploy();
        pool = await mycontract1.poolAdress(process.env.USDC, process.env.USDT, process.env.FACTORY, 500);
        poolContract = new ethers.Contract(
            pool,
            abi,
            signer
        );
        const posClient = new POSClient();
        await posClient.init({
            network: 'mainnet',
            version: 'v1',
            parent: {
                provider: signer,
                defaultConfig: {
                    from: signer.address
                }
            },
            child: {
                provider: signer,
                defaultConfig: {
                    from: signer.address
                }
            },
    
        });
        USDCToken = posClient.erc20(process.env.USDC);
      /*   approveResult = await USDCToken.approve(num6.toString(), {
            spenderAddress: mycontract1.address
        });
        txHash = await approveResult.getTransactionHash();
        txReceipt = await approveResult.getReceipt();
        gas = await mycontract1.estimateGas.transferFrom(process.env.USDC, signer.address, mycontract1.address, num6);
        receipt = await mycontract1.transferFrom(process.env.USDC, signer.address, mycontract1.address, num6, {
            gasLimit: ethers.BigNumber.from(gas).mul(ethers.BigNumber.from('2'))
        });
        await receipt.wait(); */
    })
    it('rates', async () => {
        USDC_usd = await mycontract.getLatestPrice(process.env.USDT_USD_Chainlink_Polygon);
        USDT_usd = await mycontract.getLatestPrice(process.env.USDC_USD_Chainlink_Polygon);
        USDc_usdt= ethers.BigNumber.from(USDT_usd).mul(num6).div(ethers.BigNumber.from(USDC_usd));

        const slot = await poolContract.slot0();
        const sqrtPriceX96 = slot[0].toString();
        UniswapUSDT_USDC = ethers.BigNumber.from(ethers.FixedNumber.from(((sqrtPriceX96 ** 2 / (2 ** 192))).toString()));
        UniswapUSDC_USDT = ethers.BigNumber.from(ethers.FixedNumber.from((((2 ** 192) / sqrtPriceX96 ** 2)).toString()));
        console.log(`chainlink ${USDc_usdt}  uniswap ${UniswapUSDT_USDC}  USDC_USDT  ${UniswapUSDC_USDT}`);
        SushiUSDS_USDT = await mycontract1.getAmountsOut(num6, process.env.USDC, process.env.USDT, process.env.SushiswapRouter);
        QuickUSDS_USDT = await mycontract1.getAmountsOut(num6, process.env.USDC, process.env.USDT, process.env.QuickSwapUniswapV2Router02);
        console.log(`sushi ${SushiUSDS_USDT}  quick ${QuickUSDS_USDT}`);
    });
 /*    it('bal', async () => {
        balance = await USDCToken.getBalance(signer.address);
        console.log(`signer ${balance}  `);
        gas = await mycontract1.estimateGas.swapExactTokenForTokens(num6, process.env.USDC, process.env.USDT, process.env.SushiswapRouter);
        receipt = await mycontract1.swapExactTokenForTokens(num6, process.env.USDC, process.env.USDT, process.env.SushiswapRouter, {
            gasLimit: ethers.BigNumber.from(gas).mul(ethers.BigNumber.from('2'))
        });
        await receipt.wait();
        balance = await USDCToken.getBalance(signer.address);
        console.log(`signer ${balance}  `);
    }); */
    

})