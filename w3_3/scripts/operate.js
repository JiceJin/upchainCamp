const { BigNumber } = require("ethers");
const hre = require("hardhat");

async function main(){
    const [first,second] = await hre.ethers.getSigners();
    const proxyToken = await hre.ethers.getContractAt("proxyToken","0xe7f1725e7734ce288f8367e1bb143e90bb3f0512");
    const token = await hre.ethers.getContractAt("token","0x5fbdb2315678afecb367f032d93f642f64180aa3");
    const tokenV2 = await hre.ethers.getContractAt("tokenV2","0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0");

    // tx = await (await proxyToken.upgrade(tokenV2.address)).wait();

    // tx = await (await proxyToken.mint(first.address,1000)).wait();

    tx = await (await proxyToken.transferWithCallback(second.address,500)).wait();

    tx = await proxyToken.balanceOf(first.address);
    receipt = await tx.wait();
    console.log(receipt.events.find(event => {
            return event.event === 'showbalance'
        }).args["balance"]);

    tx = await proxyToken.balanceOf(second.address);
    receipt = await tx.wait();
    console.log(receipt.events.find(event => {
            return event.event === 'showbalance'
        }).args["balance"]);

    // tx = await (await proxyToken.transfer(second.address,500)).wait();
    // console.log(tx.events.find(event => {
    //         return event.event === 'showtransfer'
    //     }).args["success"]);


    // tx = await (await proxyToken.balanceOf(first.address)).wait();

    // console.log(tx.events.find(event => {
    //         return event.event === 'showbalance'
    //     }).args["balance"]);

    
    // console.log(tx.events.find(event=>{
    //     return event.event === 'Transfer';
    // }).args[to],tx.events.find(event=>{
    //     return event.event === 'Transfer';
    // }).args[amount]);
    

    // tx = await proxyToken.balanceOf(first.address);
    // let receipt = await tx.wait();
    // console.log(receipt.events.find(event => {
    //         return event.event === 'showbalance'
    //     }).args["balance"]);

}

main().catch((error)=>{
    console.log(error);
    process.exitCode = 1;
})