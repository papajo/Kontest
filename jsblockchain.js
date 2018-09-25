const SHA256 = require('crypto-js/sha256');

class Block {
    constructor (index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        //using SHA256
        return SHA256(this.index+this.timestamp+this.previousHash+JSON.stringify(this.data)+this.nonce).toString();
    }
    mineNewBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join(0)){
            this.nonce++;
            this.hash = this.calculateHash();
        } 
        console.log('this block mined with: ' + this.hash);
    }
}

class BlockChain {
    constructor(){
        //first element of the array - genesis block
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
    }
    createGenesisBlock(){
        return new Block(0,"09/24/2018","genesis block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        //newBlock.hash = newBlock.calculateHash(); function replaces as below
        newBlock.mineNewBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    checkBlockChainIsValid(){
        for(let i=1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
            return true;
        }
    }
}
