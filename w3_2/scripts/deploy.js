const { BigNumber } = require("ethers");
const hre = require("hardhat");

async function main(){
    const JNFT = await hre.ethers.getContractFactory("JNFT");
    const jnft = await JNFT.deploy("JICE Acadamy","JICE");

    await jnft.deployed();
    console.log(jnft.address);


    //JNFT:0xe49dC5fE6Aac3AD4517111C02bd0FdB01d6D5620,Jtoken:0x4e5EE78D23099956c55C84cd274E354539404c60,
    //Business:
    // const Business = await hre.ethers.getContractFactory("Business");
    // const business = await Business.deploy("0x4e5EE78D23099956c55C84cd274E354539404c60","0xe49dC5fE6Aac3AD4517111C02bd0FdB01d6D5620");
    // await business.deployed();
    
    // console.log(business.address);
}

main().catch((error)=>{
    console.log(error);
    process.exitCode = 1;
})