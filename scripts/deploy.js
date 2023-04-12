const hre = require("hardhat");
const Holder = process.env.Holder;
async function main() {
    require('dotenv').config();
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [Holder],
    });

    signer = await ethers.getSigner(Holder);
    console.log("Deploying contracts with the account:", signer.address);
    const Chainlink = await ethers.getContractFactory("Chainlink", signer);
    const chainlink = await Chainlink.deploy();
    const Defi = await ethers.getContractFactory("Defi", signer);
    const defi = await Defi.deploy();
    console.log(`chainlink ${chainlink.address} defi ${defi.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });