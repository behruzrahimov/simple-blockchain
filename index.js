const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, preHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.preHash = preHash;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    return SHA256(
      this.index + this.timestamp + this.preHash + JSON.stringify(this.data)
    ).toString();
  }
}

class BlockChain {
  constructor() {
    this.chains = [this.createGenisisBlock()];
  }
  createGenisisBlock() {
    return new Block(0, "01/01/2022", "genusisBlock", 0);
  }
  getLatestBlock() {
    return this.chains[this.chains.length - 1];
  }
  addBlock(newBlock) {
    newBlock.preHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chains.push(newBlock);
  }
  isChainValid() {
    for (const i = 1; i < this.chains; i++) {
      const currentBlock = this.chains[index];
      const preBlock = this.chains[index - 1];
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.preHash !== preBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

const coin = new BlockChain();

coin.addBlock(new Block(1, "01/01/2020", { amount: 10 }));
coin.addBlock(new Block(2, "01/01/2022", { amount: 4 }));

console.log(JSON.stringify(coin, null, 4));
console.log("Is BlockchainValid?", coin.isChainValid());
