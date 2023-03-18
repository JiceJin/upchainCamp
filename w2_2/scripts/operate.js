const hre = require("hardhat");
const {artifacts} = require("hardhat");


async function main(){
    const teacher = await hre.ethers.getContractAt("Teacher","0x07f470F7793FeFb0F0602bAfC783023c81F5aE44");
    const student = await hre.ethers.getContractAt("Student","0x7E60Ffa9b11d432c113a199800E61109a60FA5Dc");
    
    const name = "JiceJin";
    let tx = await teacher.addScore(name,10);
    await tx.wait();

  
    // setTimeout(async function(){          //状态变量的改变的广播需要时间,所以要睡眠20秒，等待广播基本完成再查询
    //   console.log(await student.score());  
    // }, 20000 );

    console.log(await student.score());
}

main().catch((error)=>{
    console.log(error);
    process.exitCode = 1;
});