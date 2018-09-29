var Message = artifacts.require("./Message.sol");

module.exports = function(deployer) {
  deployer.deploy(Message);
};
