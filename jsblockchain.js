const SHA256 = require('crypto-js');

class Block {
    constructor (index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        //using SHA256
        return SHA256(this.index+this.timestamp+this.previousHash+JSON.stringify(data));

    }
}

class BlockChain {
    constructor(){
        //first element of the array - genesis block
        this.chain = [this.createGenesisBlock()];

    }
    createGenesisBlock(){
        return new Block(0,"09/24/2018","genesis block","0");
    }
}