const http = require('http');
const io = require('socket.io')(http);
class Socket {
    constructor() {
        this.connect();
    }

    emit(obj, channal = 'webt') {
        console.log('[SOCKET EMIT]', obj.infoHash);
        io.emit(channal, obj);
    }

    connect() {
        io.on('connection', s => {
            console.error('new connection');
        });
    }
}

module.exports = new Socket();