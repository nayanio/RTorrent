const WebTorrent = require('webtorrent');
const Torrent = require('../model/Torrent');
const socket = require('./socket');

let lastEmit = new Date().getTime();

class WTorrent {
    constructor() {
        this.client = new WebTorrent();
        this.client.on('torrent', function (torrent) {
            torrent.on('download', function (bytes) {
                if ((new Date().getTime() - lastEmit) > 1000) {
                    lastEmit = new Date().getTime();
                    const tObject = new Torrent(torrent);
                    socket.emit(tObject);
                }
            });

            torrent.on('done', function () {
                const tObject = new Torrent(torrent);
                tObject.setIsDone(true);
                socket.emit(tObject);
            });
        });
        this.client.on('error', function (err) {
            console.log('[TCLIENT ERROR]', err);
        });
    }

    add(magnetURI, path = `${__dirname}/../public/`) {
        const options = {
            maxWebConns: 5,
            path: path,
        }
        return new Promise((resolve, reject) => {
            const t = this.client.get(magnetURI);
            if (t) resolve(tObject);
            else {
                this.client.add(magnetURI, options, function (torrent) {
                    const tObject = new Torrent(torrent);
                    resolve(tObject);
                });
            }
        });
    }

    getByTorrentId(infoHash) {
        return new Torrent(this.client.torrents.map(t => t.infoHash === infoHash));
    }

    getByTorrentObjId(infoHash) {
        return this.client.torrents.map(t => { if (t.infoHash === infoHash) return t; })[0];
    }

    removeByTorrentId(infoHash) {
        return new Promise((resolve, reject) => {
            this.client.remove(this.client.torrents.map(t => { if (t.infoHash === infoHash) return t; })[0].magnetURI);
            resolve({ messag: `Deleted sucessfully.` });
        });
    }

    getAllTorrents() {
        return this.client.torrents.map(t => new Torrent(t));
    }
}

module.exports = new WTorrent();