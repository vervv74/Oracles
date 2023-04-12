(async () => {
await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [process.env.Holder],
        });
        signer = await ethers.getSigner(process.env.Holder);
        const Rates = require('./rates.js');
        provider = await signer.provider;

    provider.on("block", async (blockNumber) => {
        
        const Rates = require('./rates.js');
        console.log(` _____________START__________________________`);
        console.log(`  blocknumber ${blockNumber}`);
        chainlink_rate = await Rates.Chainlink(signer);
        defi_rate = await Rates.DF(signer);
        console.log(`chainlink rate ${chainlink_rate}  uniswap_rate ${defi_rate.Uniswap_rate} sushi_rate ${defi_rate.Sushi_rate} quick_rate ${defi_rate.Quick_rate}`);
        console.log(` _____________Finish__________________________`);

    });
})(); 