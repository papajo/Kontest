const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
class Block {
    constructor (timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash() {
        //using SHA256
        return SHA256(this.timestamp+this.previousHash+JSON.stringify(this.transactions)+this.nonce).toString();
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
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 10;
    }
    createGenesisBlock(){
        return new Block("09/24/2018","genesis block","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
/* Replaced with minePendingTransactions()
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        //newBlock.hash = newBlock.calculateHash(); function replaces as below
        newBlock.mineNewBlock(this.difficulty);
        this.chain.push(newBlock);
    }
*/
    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineNewBlock(this.difficulty);
        console.log("Block mined successfully");
        this.chain.push(block);
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];  
    }
    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }
    getBalanceOfAddress(address){
        let balance = 100;
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance = balance-trans.amount;
                }
                if (trans.toAddress === address) {
                    balance = balance+trans.amount;
                }
            }
        }
        return balance;
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


