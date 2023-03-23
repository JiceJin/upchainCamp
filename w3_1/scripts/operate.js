const { BigNumber } = require("ethers");
const hre = require("hardhat");

async function main(){
    const jtoken = await hre.ethers.getContractAt("Jtoken","0x4e5EE78D23099956c55C84cd274E354539404c60");
    const bank = await hre.ethers.getContractAt("Bank","0xf1dA3CEDeD19e6EaA08b44fbD1EF84aEef87cb13");
    const [first,second] = await hre.ethers.getSigners();

    await (await jtoken.ERC777transfer(bank.address,10000)).wait();
    console.log(await bank.showBalance(first.address));

    // await (await jtoken.mint(first.address,BigNumber.from("100000000000000000000"))).wait();
    // console.log(await jtoken.balanceOf(first.address));

    // await (await jtoken.approve(bank.address,10000)).wait();
    // await (await bank.deposit(10000)).wait();
    // console.log(await bank.showBalance(first.address));
    
    // await(await bank.withdraw(5000)).wait();
    // console.log(await bank.showBalance(first.address));
    // console.log(await bank.showBalance(first.address));
    // await(await jtoken.ERC777transfer(bank.address,5000)).wait();
    // console.log(await bank.showBalance(first.address));

    
}

main().catch((error)=>{
    console.log(error);
    process.exitCode = 1;
})