const SHA256 = require('crypto-js/sha256');

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
        return SHA256(this.index+this.timestamp+this.previousHash+JSON.stringify(this.data).toString());

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

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}
