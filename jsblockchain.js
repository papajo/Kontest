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