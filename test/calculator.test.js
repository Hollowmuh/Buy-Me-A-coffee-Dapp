const { expect } = require("chai");
const { ethers, artifacts } = require("hardhat");
const Calculator = artifacts.require("Calculator");
let calculator;

before(async () => {
    calculator = await Calculator.new();
});
contract("Calculator Contract", (accounts) => {
    it("should check if addition works as expected", async () => {
        const addedNumbers = await calculator.addition(5,6);
        expect(await addedNumbers.toNumber()).to.equal(11);
    });
    it("should check if subtraction works as expected", async () => {
        const subdNumbers = await calculator.subtraction(17,6);
        expect(await subdNumbers.toNumber()).to.equal(11);
    });
    it("should check if multiplication works as expected", async () => {
        const mulNumbers = await calculator.multiplication(5,6);
        expect(await mulNumbers.toNumber()).to.equal(30);
    });
    it("should check if division works as expected", async () => {
        const dividedNumbers = await calculator.division(30,6);
        expect(await dividedNumbers.toNumber()).to.equal(5);
    });
});