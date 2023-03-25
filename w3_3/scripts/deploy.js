const { BigNumber } = require("ethers");
const hre = require("hardhat");

async function main(){
    const [first,second] = await hre.ethers.getSigners();

    const ProxyToken = await hre.ethers.getContractFactory("proxyToken");
    const proxyToken = await ProxyToken.deploy("Jice","JTC");
    await proxyToken.deployed();

    const Token = await hre.ethers.getContractFactory("token");
    const token = await Token.deploy("111","222",proxyToken.address);
    await token.deployed();

    const TokenV2 = await hre.ethers.getContractFactory("tokenV2");
    const tokenV2 = await TokenV2.deploy("333","444",proxyToken.address);
    await tokenV2.deployed();

    await (await proxyToken.upgrade(token.address)).wait();


}

main().catch((error)=>{
    console.log(error);
    process.exitCode = 1;
})