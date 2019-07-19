const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(9000);
class Socket {
    constructor() {

    }

    emit(obj, channal = 'webt') {
        // console.log('[SOCKET EMIT]', obj.infoHash);
        io.emit(channal, obj);
    }

    connect() {
        console.log('Socket started sucessfully')
        io.on('connection', s => {
            console.error('new connection');
        });
    }
}

module.exports = new Socket();