const CryptoJS = require("crypto-js");
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

const getLastBlock = () => blockchain[blockchain.length -1];

const getTimeStamp = () => new Date().getTime() / 1000;

const createHash = (index, previousHash, timestamp, data) => 
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

const createNewBlock = data => {
    const previousBlock = getLastBlock();
    const newBlockIndex = previousBlock.index + 1;
    const newTimeStamp = getTimeStamp();
    const newHash = createHash(
        newBlockIndex, 
        previousBlock.hash, 
        newTimeStamp, 
        data);
    const newBlock = new Block(
        newBlockIndex,
        newHash,
        previousBlock.hash,
        newTimeStamp,
        data
    );
    return newBlock;
}

const getBlocksHash = (block) => createHash(block.index, block.previousHash, block.timestamp, block.data);

const isNewBlockValid = (candiateBlock, latestBlock) => {
    if(latestBlock.index + 1 !== candidateBlock.index){
        console.log("The candidate block doesn't have a valid index");
        return false;
    } else if(lastestBlock.hash !== candidateBock.previousHash) {
        console.log('The previous of the candidate block is not the has of the latest block');
        return false;
    } else if (getBlockHash(candidateBlock) !==candidateBlock.hash) {
        console.log("The hash of this block is invlad");
        return false;
    } 
    return true;
}


