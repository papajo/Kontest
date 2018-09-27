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
}