const { BigNumber } = require("ethers");
const hre = require("hardhat");

async function main(){
    //business:0x8170D9E5F1a94EfC183cE784D092c5dE200Fa827
    //jnft:0xe49dC5fE6Aac3AD4517111C02bd0FdB01d6D5620
    //jtoken:0x4e5EE78D23099956c55C84cd274E354539404c60


    const jnft = await hre.ethers.getContractAt("JNFT","0xAb1115737fbDf910D97DCf80D0E2C32a3E190170");
    // const jtoken = await hre.ethers.getContractAt("Jtoken","0x4e5EE78D23099956c55C84cd274E354539404c60");
    // const business = await hre.ethers.getContractAt("Business","0x8170D9E5F1a94EfC183cE784D092c5dE200Fa827");
    const [first,second] = await hre.ethers.getSigners();


    await (await jnft.mint(first.address,"")).wait();
    console.log(await jnft.ownerOf(0));
    // await (await jnft.mint(first.address,"ipfs://QmR38LhK4yz9JNKGE1N3Vys5YNUq3y13sX78U8qbhRENCn")).wait();
    // await (await jtoken.connect(second).approve(business.address,1000)).wait();
    // await (await business.connect(second).buy(2)).wait();

    // console.log(await jnft.balanceOf(second.address),await jnft.ownerOf(2),await business.getPrice(2));
}

main().catch((error)=>{
    console.log(error);
    process.exitCode = 1;
})