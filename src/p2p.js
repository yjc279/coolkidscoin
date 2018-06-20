const WebSockets = require('ws');

const socket = [];

const startP2PServer = server => {
    const wsServer = new WebSockets.Server({ server });
    wsServer.on("connection", ws => {
        console.log(`Hello ${ws}`);
    });
    console.log("Cool Kids Coin P2P Server Running!");
}

module.exports = {
    startP2PServer
};