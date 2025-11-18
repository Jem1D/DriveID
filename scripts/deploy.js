const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Use provider.getBalance() for Ethers v6
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  const DriveID = await hre.ethers.getContractFactory("DriveID");
  const driveID = await DriveID.deploy();

  await driveID.waitForDeployment();
  console.log("DriveID deployed to:", driveID.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

