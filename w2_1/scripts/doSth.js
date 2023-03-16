const hre = require("hardhat");

const abi=[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]

async function main(){
    const bank = await hre.ethers.getContractAt(abi,"0x5FbDB2315678afecb367f032d93F642f64180aa3");
    const [owner,otherAccount] = await hre.ethers.getSigners();
    
    // console.log(await bank.owner());
    
    const amount = hre.ethers.utils.parseEther("1.0");
    
    // const txResponse = await owner.sendTransaction({
    //     to: bank.address,
    //     value: amount
    // })
    
    // console.log(await hre.ethers.provider.getBalance(bank.address),await owner.getBalance());

    // console.log(await bank.balance(owner.address));

    // console.log("before   ",await hre.ethers.provider.getBalance(bank.address),await owner.getBalance());
    // await bank.withdraw();
    // console.log(await hre.ethers.provider.getBalance(bank.address),await owner.getBalance());

    console.log(await hre.ethers.provider.getBalance(bank.address),await owner.getBalance());
}

main().catch((err)=>{
    console.log(err);
    process.exitCode = 1;
});