const { BigNumber } = require("ethers");
const hre = require("hardhat");

async function main(){
    const JNFT = await hre.ethers.getContractFactory("JNFT");
    const jnft = await JNFT.deploy("JNFT","JNFT");

    await jnft.deployed();

    console.log(jnft.address);
}

main().catch((error)=>{
    console.log(error);
    process.exitCode = 1;
})