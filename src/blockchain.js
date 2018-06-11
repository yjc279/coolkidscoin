class Block {
    constructor(index, hash, previoushHash, timestamp, data) {
        this.index = index;
        this.hash = hash;
        this. previoushHash = previoushHash;
        this.timestamp = timestamp;
        this.data = data;
    }
}

const genesisBlock = new Block(
  0,
  "C48F80B36EC6881C21B6795928065967AD5DDC4898B3E89B044374FE6B78806E",
  null,
  1528741246228,
  "This is genesis!!"
);

let blockchain = [genesisBlock];
console.log(blockchain);