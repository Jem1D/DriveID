const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DriveIDModule", (m) => {
  const driveId = m.contract("DriveID");
  return { driveId };
});
