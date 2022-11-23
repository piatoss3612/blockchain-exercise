const Transactions = artifacts.require("Transactions");

module.exports = (deployer) => {
  deployer.deploy(Transactions);
};
