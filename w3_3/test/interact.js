const {loadFixture}  = require("@nomicfoundation/hardhat-network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");
const hre = require("hardhat");
const { deepCopy } = require("ethers/lib/utils");
const { BigNumber } = require("ethers");

describe("Test Upgrade Contract",function(){
    async function deployment(){
    const [first,second] = await hre.ethers.getSigners();

    const ProxyToken = await hre.ethers.getContractFactory("proxyToken");
    const proxyToken = await ProxyToken.deploy("Jice","JTC");

    const Token = await hre.ethers.getContractFactory("token");
    const token = await Token.deploy("111","222",proxyToken.address);

    await (await proxyToken.upgrade(token.address)).wait();

    const TokenV2 = await hre.ethers.getContractFactory("tokenV2");
    const tokenV2 = await TokenV2.deploy("333","444",proxyToken.address);

    return {token,proxyToken,tokenV2,first,second};
    }
    describe("proxyToken.sol",function(){
        it("Should return right name",async function(){
            const {proxyToken} = await loadFixture(deployment);
            let tx = await (await proxyToken.name()).wait();
            expect(tx.events.find(event=>{
                return event.event === "showname";
            }).args["name"]).to.equal("Jice");
        })
        it("Should mint successfully",async function(){
            const {proxyToken,first} = await loadFixture(deployment);
            await expect(await proxyToken.mint(first.address,100)).not.to.be.reverted;
        })
        it("Should return right balance",async function(){
            const {proxyToken,first} = await loadFixture(deployment);
            let tx = await (await proxyToken.balanceOf(first.address)).wait();
            expect(tx.events.find(event=>{
                return event.event === "showbalance";
            }).args["balance"]).to.equal(0);
        })
        it("Should upgrade successfully",async function(){
            const {proxyToken,tokenV2} = await loadFixture(deployment);
            await expect(await proxyToken.upgrade(tokenV2.address)).not.to.be.reverted;
        })
        it("Should upgrade and transferWithCallback successfully",async function(){
            const {proxyToken,tokenV2,first,second} = await loadFixture(deployment);
            await proxyToken.upgrade(tokenV2.address);
            await proxyToken.mint(first.address,1000);
            let tx = await (await proxyToken.transferWithCallback(second.address,500)).wait();
            expect(tx.events.find(event=>{
                return event.event === "showtransfer";
            }).args["success"]).to.equal(true);
        })
    })
})