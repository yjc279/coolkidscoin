const express = require("express"),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    Blockchain = require("./blockchain"),
    p2p = require('./p2p');

const { getBlockchain, createNewBlock } = Blockchain;
const { startP2PServer, connectToPeers } = p2p;

const PORT = process.env.HTTP_PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(morgan("combined"));

app.get("/blocks", (req,res) => {
    res.send(getBlockchain());
});

app.post("/blocks", (req,res) => {
    const { body: { data } } = req;
    const newBlock = createNewBlock(data);
    res.send(newBlock);
});

app.post("/peers", (req,res)=>{
    const {body : { peer } }= req;
    connectToPeers(peer);
    res.send(); 
});

const server = app.listen(PORT, () => 
    console.log(`Cool Kids Coin Server running on ${PORT}. Lets Get it!!` )
);
startP2PServer(server);
