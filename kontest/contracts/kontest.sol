pragma solidity ^0.4.24;

//creating the contract
contract Kontest {

	//create a structure modeling the kontestant
	struct Kontestant {
		uint id;
		string name;
		uint voteCount;
	}
	//mapping to fetch the kontestant details
	mapping(uint => Kontestant) public kontestants;

	//keep a list of users who cast the vote
	mapping(address => bool) public voters;

	//keep track of kontestants count 
	uint public kontestantsCount;

	function Kontest () public {
		addKontenstant("Tom");
		addKontenstant("Jerry");
	}
	//add a kontestant
	function addKontenstant(string _name) private {
		kontestantsCount++;
		kontestants[kontestantsCount] = Kontestant(kontestantsCount, _name, 0);
	}
	//prevent from duplicate voting
	function vote (uint _kontestantId) public {

		require (!voters[msg.sender]);
		require(_kontestantId > 0 && _kontestantId <= kontestantsCount);

		//increment the voters vote count 
		kontestants[_kontestantId].voteCount++ ;
		//set the voters voted status to true
		voters[msg.sender] = true;

	}
}