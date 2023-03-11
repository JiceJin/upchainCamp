const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Counter",function(){
    async function deployCounter() {
        const Lock = await hre.ethers.getContractFactory("Counter");
        const lock = await Lock.deploy();

        const [owner, otherAccount] = await ethers.getSigners();

    return {lock, owner, otherAccount};
  }
  it("Should not revert",async function(){
    const {lock} = await loadFixture(deployCounter);

    await expect(lock.add(1)).not.to.be.reverted;
  })
  it("Should revert",async function(){
    const {lock, otherAccount} = await loadFixture(deployCounter);

    await expect(lock.connect(otherAccount).add(1)).to.be.revertedWith(
        "Must be owner"
    );
  })
})