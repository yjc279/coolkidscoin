const express = require("express"),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    Blockchain = require("./blockchain"),
    p2p = require('./p2p');

const { getBlockchain, createNewBlock } = Blockchain;
const { startP2PServer } = p2p;

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



const server = app.listen(PORT, () => 
    console.log(`Cool Kids Coin Server running on ${PORT}. Lets Get it!!` )
);
startP2PServer(server);
