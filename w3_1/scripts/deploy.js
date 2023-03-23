const hre = require("hardhat");

async function main(){
    const Jtoken = await hre.ethers.getContractFactory("Jtoken");
    const jtoken = await Jtoken.deploy("JiceJin","JTC");

    await jtoken.deployed();

    const Bank = await hre.ethers.getContractFactory("Bank");
    const bank = await Bank.deploy(jtoken.address);

    await bank.deployed();

    
}

main().catch((error)=>{
    console.log(error);
    process.exitCode = 1;
})