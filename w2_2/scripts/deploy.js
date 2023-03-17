const hre = require("hardhat");

const abi_teacher = [
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
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "at",
          "type": "address"
        }
      ],
      "name": "Claim",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "score",
          "type": "uint8"
        }
      ],
      "name": "addScore",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "student",
          "type": "string"
        }
      ],
      "name": "claim",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "score",
          "type": "uint8"
        }
      ],
      "name": "modifyScore",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "students",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

async function main(){

    const name = "JiceJin";

    const Teacher = await hre.ethers.getContractFactory("Teacher");
    const teacher = await Teacher.deploy()

    await teacher.deployed();

    console.log(`Teacher contract deployed on ${teacher.address}
    it's owner is ${await teacher.owner()}`);
    
    const [owner,otherAccount] = await hre.ethers.getSigners();

    const Student = await hre.ethers.getContractFactory("Student");
    const student = await Student.connect(otherAccount).deploy(name,teacher.address);

    await student.deployed();

    console.log(`Student contract deployed on ${student.address}
    it's owner is ${await student.owner()}
    it's teacher is ${await student.teacher()}`);
    
}

main().catch((error)=>{
    console.log(error);
    process.exitCode = 1;
})