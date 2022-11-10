const KryptoBirdz = artifacts.require("./KriptoBirdz.sol");

module.exports = function(deployer) {
  deployer.deploy(KryptoBirdz);
};
