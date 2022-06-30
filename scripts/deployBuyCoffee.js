const hre = require("hardhat");

async function main() {
    const BuyCoffeeInstance = await hre.ethers.getContractFactory("BuyMeACoffee");
    const coffeeContract = await BuyCoffeeInstance.deploy();
    await coffeeContract.deployed();
    console.log("Buy Me a Coffee Contract deployed to: ", coffeeContract.address);
}
main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });