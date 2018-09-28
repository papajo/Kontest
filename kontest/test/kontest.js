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

	it("it initializes the contestants with the correct values", function() {
    return Kontest.deployed().then(function(instance) {
      kontestInstance = instance;
      return kontestInstance.kontestants(1);
    }).then(function(kontestant) {
      assert.equal(kontestant[0], 1, "contains the correct id");
      assert.equal(kontestant[1], "Tom", "contains the correct name");
      assert.equal(kontestant[2], 0, "contains the correct votes count");
      return kontestInstance.kontestants(2);
    }).then(function(kontestant) {
      assert.equal(kontestant[0], 2, "contains the correct id");
      assert.equal(kontestant[1], "Jerry", "contains the correct name");
      assert.equal(kontestant[2], 0, "contains the correct votes count");
    });
  });

	it("allows a voter to cast a vote", function() {
    return Kontest.deployed().then(function(instance) {
      kontestInstance = instance;
      kontestantId = 2;
      return kontestInstance.vote(kontestantId, { from: accounts[0] });
    }).then(function(receipt) {
      return kontestInstance.voters(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the voter was marked as voted");
      return kontestInstance.kontestants(kontestantId);
    }).then(function(kontestant) {
      var voteCount = kontestant[2];
      assert.equal(voteCount, 1, "increments the kontestant's vote count");
    })
  });


});