const hre = require("hardhat");


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