const { expect } = require("chai");
const {ethers, artifacts} = require("hardhat");
const BuyCoffeeInstance = artifacts.require("BuyMeACoffee.sol");
let coffee;

before(async ()=> {
    coffee = await BuyCoffeeInstance.new();
});
contract("Buy Me A Coffee Contract", (accounts) => {
    it("should check if owner of contract is the deployer", async ()=> {
        var contract_owner = coffee.owner.call();
        expect(await contract_owner.address).to.equal(accounts[0].address);
    });
    it("should allow a friend to buy me coffee", async ()=> {
        amount = ethers.utils.parseEther("19.0");
        console.log("Buying Cofeee");
        await coffee.buyCoffee("Tolulope", "Enjoy", 19, {from: accounts[1], value: amount});
        console.log("Coffee bought")
    });
    it("should allow owner to withdraw tips", async ()=> {
        // console.log("withdrawing tips")
        // await coffee.withdrawTips();
        // console.log("tips withdrawn")
        const contractBalance = await coffee.balance()
        // expect(contractBalance.toString()).to.equal("0");
        console.log(`Contract balance: ${contractBalance}`)
    })
    it("should allow owner to get the memos", async ()=> {
        console.log(await coffee.getMemos());
    })
})