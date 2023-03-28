const { BigNumber } = require("ethers");
const hre = require("hardhat");

async function main(){
    const [first,second] = await hre.ethers.getSigners();
    const proxyToken = await hre.ethers.getContractAt("proxyToken","0xe7f1725e7734ce288f8367e1bb143e90bb3f0512");
    const token = await hre.ethers.getContractAt("token","0x5fbdb2315678afecb367f032d93f642f64180aa3");
    const tokenV2 = await hre.ethers.getContractAt("tokenV2","0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0");

    // tx = await (await proxyToken.upgrade(tokenV2.address)).wait();

    // tx = await (await proxyToken.mint(first.address,1000)).wait();

                // tx = await (await proxyToken.transferWithCallback(second.address,500)).wait();

                // tx = await proxyToken.balanceOf(first.address);
                // receipt = await tx.wait();
                // console.log(receipt.events.find(event => {
                //         return event.event === 'showbalance'
                //     }).args["balance"]);

                // tx = await proxyToken.balanceOf(second.address);
                // receipt = await tx.wait();
                // console.log(receipt.events.find(event => {
                //         return event.event === 'showbalance'
                //     }).args["balance"]);

    let tx = {
        to: 
    }




    // const transaction = await contract['safeTransferFrom(address,address,uint256)'](account, to, _tokenId);
    // return await transaction.wait();
    /*  星光
        const transaction = await contract['safeTransferFrom(address,address,uint256)'](account, to, _tokenId);
        return await transaction.wait();

        Azleal
        let tx ={
                to: bank.address,
                value: amount,
                data: "0x12345678"
            }

        星光
        这样去调用 不存在的

        Azleal
        await deployer.sendTransaction(tx)

        星光
        contract('xxxxxx')()

        星光
        xxx 明文瞎写
    */
}

main().catch((error)=>{
    console.log(error);
    process.exitCode = 1;
})