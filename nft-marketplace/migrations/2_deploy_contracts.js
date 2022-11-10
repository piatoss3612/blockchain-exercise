const KryptoBirdz = artifacts.require("./KryptoBirdz.sol");

module.exports = function(deployer) {
  deployer.deploy(KryptoBirdz);
};
