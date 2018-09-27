var Kontest = artifacts.require('./Kontest.sol');

contract("Kontest", function(accounts) {

	//test for initialization
	it("initializes with two kontestants", function() {
		return Kontest.deployed().then(function(instance) {
			return instance.kontestantsCount();
		}).then(function(count) {
			assert.equal(count, 2);
		});
	});
});