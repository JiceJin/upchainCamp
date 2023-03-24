const {loadFixture}  = require("@nomicfoundation/hardhat-network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");
const hre = require("hardhat");
const { deepCopy } = require("ethers/lib/utils");
const { BigNumber } = require("ethers");

describe("Mint Test",function(){
    async function deployJNFT(){
        const JNFT = await hre.ethers.getContractFactory("JNFT");
        const jnft = await JNFT.deploy("学院卡","JNFT");
        const [first,second] = await hre.ethers.getSigners();
        return {jnft,first,second};
    }
    it("should return 0",async function(){
        const {jnft,first} = await loadFixture(deployJNFT);
        const result = await jnft.mint(first.address,"123321");// 要修改状态变量并且有返回值的函数，要取到返回值需要用到value属性
        expect(result.value).to.equal(0);
    })
    it("should show URI 123321",async function(){
        const {jnft,first} = await loadFixture(deployJNFT);
        const result = await jnft.mint(first.address,"123321");
        expect(await jnft.tokenURI(result.value)).to.equal("123321");
    })
    it("should set right owner",async function(){
        const {jnft,first} = await loadFixture(deployJNFT);
        const result = await jnft.mint(first.address,"123321");
        expect(await jnft.ownerOf(result.value)).to.equal(first.address);
    })
})