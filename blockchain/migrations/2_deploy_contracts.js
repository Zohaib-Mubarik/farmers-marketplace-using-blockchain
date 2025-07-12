const CropListing = artifacts.require("CropListing");

module.exports = async function (deployer) {
  await deployer.deploy(CropListing);
  const deployed = await CropListing.deployed();
  console.log("✅ CropListing deployed at address:", deployed.address);
};
