const { ethers } = require("hardhat");

async function main() {
    const CalculatorInstance = await ethers.getContractFactory("Calculator");
    const Calculator = await CalculatorInstance.deploy();
    console.log(`Contract Address: ${Calculator.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
