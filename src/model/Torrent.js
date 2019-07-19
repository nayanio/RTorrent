class Torrent {
    constructor({ length, pieceLength, lastPieceLength, downloaded, downloadSpeed, uploaded, progress, infoHash, magnetURI, numPeers, name, dn, timeRemaining }) {
        this.length = length;
        this.pieceLength = pieceLength;
        this.lastPieceLength = lastPieceLength;
        this.downloaded = downloaded;
        this.downloadSpeed = downloadSpeed;
        this.uploaded = uploaded;
        this.progress = progress;
        this.infoHash = infoHash;
        this.magnetURI = magnetURI;
        this.numPeers = numPeers;
        this.name = name;
        this.dn = dn;
        this.isDone = false;
        this.timeRemaining = timeRemaining;
    }

    print() {
        console.log('************************************');
        console.log(this.length);
        console.log(this.pieceLength);
        console.log(this.lastPieceLength);
        console.log(this.downloaded);
        console.log(this.downloadSpeed);
        console.log(this.uploaded);
        console.log(this.progress);
        console.log(this.infoHash);
        console.log(this.magnetURI);
        console.log(this.numPeers);
        console.log(this.name);
        console.log(this.dn);
        console.log('************************************');
    }

    getLength() {
        return this.length;
    }
    getPieceLength() {
        return this.pieceLength;
    }
    getLastPieceLength() {
        return this.lastPieceLength;
    }
    getDownloaded() {
        return this.downloaded;
    }
    getDownloadSpeed() {
        return this.downloadSpeed;
    }
    getUploaded() {
        return this.uploaded;
    }
    getProgress() {
        return this.progress;
    }
    getInfoHash() {
        return this.infoHash;
    }
    getMagnetURI() {
        return this.magnetURI;
    }
    getNumPeers() {
        return this.numPeers;
    }
    getName() {
        return this.name;
    }
    getDn() {
        return this.dn;
    }
    getIsDone() {
        return this.isDone;
    }
    getTimeRemaining(){
        return this.timeRemaining;
    }

    setLength(length) {
        this.length = length;
    }
    setPieceLength(pieceLength) {
        this.pieceLength = pieceLength;
    }
    setLastPieceLength(lastPieceLength) {
        this.lastPieceLength = lastPieceLength;
    }
    setDownloaded(downloaded) {
        this.downloaded = downloaded;
    }
    setDownloadSpeed(downloadSpeed) {
        this.downloadSpeed = downloadSpeed;
    }
    setUploaded(uploaded) {
        this.uploaded = uploaded;
    }
    setProgress(progress) {
        this.progress = progress;
    }
    setInfoHash(infoHash) {
        this.infoHash = infoHash;
    }
    setMagnetURI(magnetURI) {
        this.magnetURI = magnetURI;
    }
    setNumPeers(numPeers) {
        this.numPeers = numPeers;
    }
    setName(name) {
        this.name = name;
    }
    setDn(dn) {
        this.dn = dn;
    }
    setIsDone(isDone) {
        this.isDone = isDone;
    }
    setTimeRemaining(timeRemaining){
        this.timeRemaining = timeRemaining;
    }
}

module.exports = Torrent;