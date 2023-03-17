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
const abi_student = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "stude",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "teach",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "overScore",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "teacher",
          "type": "address"
        }
      ],
      "name": "Relationship",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint8",
          "name": "score",
          "type": "uint8"
        }
      ],
      "name": "updateScore",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "num",
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
          "internalType": "uint8",
          "name": "num",
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
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
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
      "name": "score",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "teacher",
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
    const teacher = await hre.ethers.getContractAt(abi_teacher,"0x07f470F7793FeFb0F0602bAfC783023c81F5aE44");
    const student = await hre.ethers.getContractAt(abi_student,"0x7E60Ffa9b11d432c113a199800E61109a60FA5Dc");
    
    const name = "JiceJin";
    await teacher.addScore(name,10);

  
    setTimeout(async function(){          //状态变量的改变的广播需要时间,所以要睡眠20秒，等待广播基本完成再查询
      console.log(await student.score());  
    }, 20000 );

    // console.log(await student.score());
}

main().catch((error)=>{
    console.log(error);
    process.exitCode = 1;
});