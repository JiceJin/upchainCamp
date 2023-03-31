const { BigNumber } = require("ethers");
const hre = require("hardhat");

async function main(){
    const jnft = await hre.ethers.getContractAt("JNFT","0x5fbdb2315678afecb367f032d93f642f64180aa3");
    const first = await hre.ethers.getSigner();
    await (await jnft.mint(first.address,"")).wait();
    console.log(await jnft.balanceOf(first.address));
}

main().catch((error)=>{
    console.log(error);
    process.exitCode = 1;
})