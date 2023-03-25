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

    //以下测试有误，不知如何取到返回值
    it("should return 0",async function(){
        const {jnft,first} = await loadFixture(deployJNFT);
        const result = await (await jnft.mint(first.address,"123321")).wait();
        const lastTokenID = result.events.find(event=>{
            return event.event === "showcurrentID";
        }).args["currentId"];
        expect(lastTokenID).to.equal(0);
    })
    it("should show URI 123321",async function(){
        const {jnft,first} = await loadFixture(deployJNFT);
        const result = await (await jnft.mint(first.address,"123321")).wait();
        const lastTokenID = result.events.find(event=>{
            return event.event === "showcurrentID";
        }).args["currentId"];
        expect(await jnft.tokenURI(lastTokenID)).to.equal("123321");
    })
    it("should set right owner",async function(){
        const {jnft,first} = await loadFixture(deployJNFT);
        const result = await (await jnft.mint(first.address,"123321")).wait();
        const lastTokenID = result.events.find(event=>{
            return event.event === "showcurrentID";
        }).args["currentId"];
        expect(await jnft.ownerOf(lastTokenID)).to.equal(first.address);
    })
})