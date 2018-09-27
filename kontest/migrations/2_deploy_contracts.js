var Kontest = artifacts.require("./Kontest.sol");

module.exports = function(deployer) {
  deployer.deploy(Kontest);
};

