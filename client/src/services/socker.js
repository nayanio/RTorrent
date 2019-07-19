// import CONFIG from '../config';
import openSocket from 'socket.io-client';
// const  socket = openSocket(`${CONFIG.base_path}`);
const  socket = openSocket(`http://localhost:9000`);

function onTorrentUpdate(cb){
  socket.on('webt', torrent => cb(torrent));
}

function onTorrentDone(cb){
  socket.on('webt_done', torrent => cb(torrent));
}

function onTorrentError(cb){
  socket.on('webt_error', torrent => cb(torrent));
}

export { onTorrentDone, onTorrentError, onTorrentUpdate };