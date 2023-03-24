const {loadFixture}  = require("@nomicfoundation/hardhat-network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");
const hre = require("hardhat");
const { deepCopy } = require("ethers/lib/utils");
const { BigNumber } = require("ethers");

describe("Business Test",function(){
    async function deployBusiness(){
        const JNFT = await hre.ethers.getContractFactory("JNFT");
        const jnft = await JNFT.deploy("1111","22");
        
        const Jtoken = await hre.ethers.getContractFactory("Jtoken");
        const jtoken = await Jtoken.deploy("3333","44");

        const Business = await hre.ethers.getContractFactory("Business");
        const business = await Business.deploy(jtoken.address,jnft.address);

        const [first,second] = await hre.ethers.getSigners();

        await (await jtoken.mint(second.address,10000)).wait();
        await (await jnft.mint(first.address,"")).wait(); 

        return {jnft,jtoken,business,first,second};
    }
    it("should be 0",async function(){
        const {business} = await loadFixture(deployBusiness);
        expect(await business.getPrice(0)).to.equal(0);
    })
    it("sell successful",async function(){
        const {jnft,business,first} = await loadFixture(deployBusiness);
        await jnft.approve(business.address,0);
        await business.sell(0,1000);
        expect(await jnft.ownerOf(0)).to.equal(business.address);
        expect(await business.price(0)).to.equal(1000);
        expect(await business.seller(0)).to.equal(first.address);
    })
    it("buy successful",async function(){
        const {jnft,jtoken,business,first,second} = await loadFixture(deployBusiness);
        //sell
        await jnft.approve(business.address,0);
        await business.sell(0,1000);
        //buy
        await jtoken.connect(second).approve(business.address,1000);
        await business.connect(second).buy(0);
        expect(await jtoken.allowance(second.address,business.address)).to.equal(0);
        expect(await jtoken.balanceOf(first.address)).to.equal(1000);
        expect(await jnft.ownerOf(0)).to.equal(second.address);
        expect(await business.price(0)).to.equal(0);
        expect(await business.seller(0)).to.equal("0x0000000000000000000000000000000000000000");
    })
})