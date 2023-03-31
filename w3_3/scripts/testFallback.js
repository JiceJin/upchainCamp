const { BigNumber } = require("ethers");
const hre = require("hardhat");

async function main(){
    const [first,second] = await hre.ethers.getSigners();
    const proxyToken = await hre.ethers.getContractAt("proxyToken","0x5fbdb2315678afecb367f032d93f642f64180aa3");
    const token = await hre.ethers.getContractAt("token","0xe7f1725e7734ce288f8367e1bb143e90bb3f0512");
    const tokenV2 = await hre.ethers.getContractAt("tokenV2","0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0");

    //mint 前
    transaction = await (await proxyToken.balanceOf(first.address)).wait();
    console.log(transaction.events.find((event)=>{
        return event.event == 'showbalance';
    }).args["balance"]);
    //mint 
    tx = {
        to: proxyToken.address,
        value: 0,
        data: "0x40c10f19000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000064"
    }
    result =await( await first.sendTransaction(tx)).wait();
    console.log(result);

    //mint 后
    transaction = await (await proxyToken.balanceOf(first.address)).wait();
    console.log(transaction.events.find((event)=>{
        return event.event == 'showbalance';
    }).args["balance"]);
    //测试过后，没有用
    // const transaction = await proxyToken['mint(address,uint256)'](first.address,100);
    // console.log(await transaction.wait());
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