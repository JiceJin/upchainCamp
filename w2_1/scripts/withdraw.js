const hre = require("hardhat");

const abi=[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]

async function main(){
    const bank = await hre.ethers.getContractAt(abi,"0xAe441F90B7C3585aBDa7cbbbdd7F512Acb9b7bbe");
    
    await bank.withdraw();
    console.log(await hre.ethers.provider.getBalance(bank.address))//return BigNumber{value: 0}
}

main().catch((err)=>{
    console.log(err);
    process.exitCode = 1;
});