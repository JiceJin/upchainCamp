const {loadFixture}  = require("@nomicfoundation/hardhat-network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");
const hre = require("hardhat");

describe("Bank",function(){
    async function deployBank(){
        const Bank = await hre.ethers.getContractFactory("Bank");
        const bank = await Bank.deploy();

        const [owner,otherAccount] = await hre.ethers.getSigners();

        return {bank,owner,otherAccount};
    }
    describe("Deployment",function(){
        it("Set Right Owner",async function(){
            const {bank,owner} = await loadFixture(deployBank);
            expect(await bank.owner()).to.equal(owner.address);
        });
    })
    describe("Deposit",function(){
        it("The value of contract should increase",async function(){
            const {bank,owner} = await loadFixture(deployBank);
            const balanceOfBank = await hre.ethers.provider.getBalance(bank.address);
            const amount = hre.ethers.utils.parseEther("1.0");
            const afterTx = balanceOfBank + amount;
            const txResponse = await owner.sendTransaction({
                to: bank.address,
                value: amount
            });
            expect(await hre.ethers.provider.getBalance(bank.address)).to.equal(afterTx);
        });
        it("The balance of sender should increase",async function(){
            const {bank,owner} = await loadFixture(deployBank);
            const balanceBefore = await bank.balance(owner.address);
            const amount = hre.ethers.utils.parseEther("1.0");
             const txResponse = await owner.sendTransaction({
                to: bank.address,
                value: amount
            });
            const balanceAfter = await bank.balance(owner.address);
            expect(balanceBefore + amount).to.equal(balanceAfter);
        });
        it("The event deposit should be emited",async function(){
            const {bank,owner} = await loadFixture(deployBank);
            const amount = hre.ethers.utils.parseEther("1.0");
            expect(await owner.sendTransaction({
                to: bank.address,
                value: amount
            })).to.emit(bank, "deposit").withArgs(owner,amount);
        });
    })
    describe("Withdraw",function(){
        it("Not owner should be reverted",async function(){
            const {bank,otherAccount} = await loadFixture(deployBank);
            await expect(bank.connect(otherAccount).withdraw()).to.be.revertedWith(
                "You are not owner!"
            );
        });
        it("Owner should not be reverted",async function(){
            const {bank} = await loadFixture(deployBank);
            await expect(bank.withdraw()).not.to.be.reverted;
        });
        it("The value of contract should be empty",async function(){
            const {bank} = await loadFixture(deployBank);
            await bank.withdraw();
            expect(await hre.ethers.provider.getBalance(bank.address)).to.equal(0);
        });
    })
})