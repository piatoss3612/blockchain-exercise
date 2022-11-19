const TaskContract = artifacts.require("TaskContract");

module.exports = (deployer) => {
  deployer.deploy(TaskContract);
};
