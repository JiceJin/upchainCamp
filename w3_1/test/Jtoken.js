const {loadFixture}  = require("@nomicfoundation/hardhat-network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");
const hre = require("hardhat");
const { deepCopy } = require("ethers/lib/utils");
const { BigNumber } = require("ethers");

describe("Jtoken and Bank Test",function(){
    async function deployJtokenandBank(){
        const name = "JiceJin";
        const symbol = "JTC";
        const [first,second] = await hre.ethers.getSigners();
        const Jtoken = await hre.ethers.getContractFactory("Jtoken");
        const jtoken = await Jtoken.deploy(name,symbol);

        const Bank = await hre.ethers.getContractFactory("Bank");
        const bank = await Bank.deploy(jtoken.address);

        await (await jtoken.mint(first.address,BigNumber.from("100000000000000000000"))).wait();

        return {jtoken,bank,first,second,symbol};
    }
    describe("Jtoken tests",function(){
        it("mint() success",async function(){
            const {jtoken,first} = await loadFixture(deployJtokenandBank);
            const beforeMint_string = await jtoken.balanceOf(first.address);
            const beforeMint = BigNumber.from(beforeMint_string);
            await (await jtoken.mint(first.address,100)).wait();
            const afterMint = await jtoken.balanceOf(first.address);
            expect(beforeMint.add(100)).to.equal(afterMint);
        })
    })
    describe("Bank tests",function(){
        it("showToken() success",async function(){
            const {bank,symbol} = await loadFixture(deployJtokenandBank);
            expect(await bank.showToken()).to.equal(symbol);
        })
        it("showBalance() success",async function(){
            const {bank,first} = await loadFixture(deployJtokenandBank);
            expect(await bank.showBalance(first.address)).to.equal(0);
        })
        it("deposit() success",async function(){
            const {bank,jtoken,first} = await loadFixture(deployJtokenandBank);
            await (await jtoken.approve(bank.address,5000)).wait();
            await (await bank.deposit(5000)).wait();
            expect(await bank.showBalance(first.address)).to.equal(5000);
        })
        it("withdraw() success",async function(){
            const {bank,jtoken,first} = await loadFixture(deployJtokenandBank);
            await (await jtoken.approve(bank.address,5000)).wait();
            await (await bank.deposit(5000)).wait();
            await (await bank.withdraw(2500)).wait();
            expect(await bank.showBalance(first.address)).to.equal(2500);
        })
    })
    describe("ERC777transfer",function(){
        it("Should reverted with EOA",async function(){
            const {jtoken,second} = await loadFixture(deployJtokenandBank);
            await expect(jtoken.ERC777transfer(second.address,100)).to.be.revertedWith("Jtoken: CANNOT EOA");
        })
        it("Jtoken balance works right",async function(){
            const {bank,jtoken,first} = await loadFixture(deployJtokenandBank);
            const beforeBalance_first = BigNumber.from(await jtoken.balanceOf(first.address));
            const beforeBalance_bank = BigNumber.from(await jtoken.balanceOf(bank.address));
            await (await jtoken.ERC777transfer(bank.address,100)).wait();
            const afterBalance_first = await jtoken.balanceOf(first.address);
            const afterBalance_bank = await jtoken.balanceOf(bank.address);
            expect(beforeBalance_first.sub(100)).to.equal(afterBalance_first);
            expect(beforeBalance_bank.add(100)).to.equal(afterBalance_bank);
        })
        it("Bank balance works right",async function(){
            const {bank,jtoken,first} = await loadFixture(deployJtokenandBank);
            const beforeBalance = BigNumber.from(await bank.showBalance(first.address));
            await (await jtoken.ERC777transfer(bank.address,100)).wait();
            const afterBalance = BigNumber.from(await bank.showBalance(first.address));
            expect(beforeBalance.add(100)).to.equal(afterBalance);
        })
    })
})