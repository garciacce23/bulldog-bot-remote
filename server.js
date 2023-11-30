const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");
const ks = require('node-key-sender');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './remote-app/build')));


app.get('/get-ip', (req, res) => {
    const ip = require('ip');
    res.send({ ip: ip.address() });
    console.log(`IP: ${ip.address()}`);
}); 

// The "catchall" handler: for any request that doesn't
// match one above, send back the index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './remote-app/build', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('keypress', (key) => {
        let keyToSend = key;
        if (key === '.') {
            keyToSend = 'period';
        } else if (key === ',') {
            keyToSend = 'comma';
        }

        ks.sendKey(keyToSend).then(() => {
            console.log(`Key ${key} pressed`);
        }).catch((err) => {
            console.error(`Error sending key ${key}:`, err);
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
  console.log(`listening on *:3000`);
});
