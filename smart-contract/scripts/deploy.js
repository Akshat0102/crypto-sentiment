const hre = require("hardhat");

async function main() {

  const MarketSentiment = await hre.ethers.getContractFactory("MarketSentiment");
  const marketsentiment = await MarketSentiment.deploy();

  console.log("MarketSentiment Contract deployed to : ", marketsentiment.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
