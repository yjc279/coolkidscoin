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

const getBlockchain = () => blockchain;

const createHash = (index, previousHash, timestamp, data) => 
    CryptoJS.SHA256(
        index + previousHash + timestamp + JSON.stringify(data)
    ).toString();

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
    addBlockToChain(newBlock);
    return newBlock;
};

const getBlocksHash = (block) => createHash(block.index, block.previousHash, block.timestamp, block.data);

const isNewBlockValid = (candiateBlock, latestBlock) => {
    if(!isNewStructureValid(candidateBlock)) {
        console.log("The candidate block structure is not valid")
        return false;
    }
    else if(latestBlock.index + 1 !== candidateBlock.index){
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
};

const isNewStructureValid = block => {
    return (
        typeof block.index === 'number' && 
        typeof block.hash ==="string" && 
        typeof block.previousHash === "string" && 
        typeof block.timestamp === "number" &&
        typeof block.data === "string"
    );
};


const isChainValid = (candidateChain) => {
    const isGenesisValid = block => {
        return JSON.stringify(block) === JSON.stringify(genesisBlock);
    };
    if(!isGenesisValid(candidateChain[0])){
        console.log(
            "The candidateChain's genesisBlock is not the same as our genesisBloc"
        );
        return false;
    }
    for(let i=1; i <candidateChain.length; i++){
        if(!isNewBlockValid(candidateChain[i],candidateChain[i-1])){
            return false;
        }
        return true;
    }
};

const replaceChain = newChain => {
    if(isChainValid(newChain) && newChain.length> getBlockchain().length){
        blockchain = newChain;
        return true;
    } else {
        return false;
    }
};

const addBlockToChain = candidateBlock => {
    if(isNewBlockValid(candidateBlock,getLastBlock())){
        getBlockchain().push(candidateBlock)
        return true;
    } else {
        return false;
    }
};

module.exports = {
    getBlockchain,
    createNewBlock
}