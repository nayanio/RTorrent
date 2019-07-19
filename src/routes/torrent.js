const router = require('express').Router();
const webt = require('../actions/torrent');
const CONFIG = require('../config');
router.get('/', function (req, res, next) {
    return res.json([]);
});

router.post('/torrents/new', function (req, res, next) {
    const torrentId = req.body.magnetURI;
    if (torrentId) {
        webt.add(torrentId, CONFIG.download_path)
            .then(torrent => res.send(torrent))
            .catch(err => res.send({ message: err }));
    } else res.status(400).send({ message: 'err' });
});

router.get('/torrents', function (req, res, next) {
    res.send(webt.getAllTorrents());
});

router.get('/:action/:torrentId', function (req, res, next) {
    const action = req.params.action;
    const torrentId = req.params.torrentId;
    const torrent = webt.getByTorrentObjId(torrentId);
    switch (action) {
        case 'pause':
            if (torrent) {
                torrent.pause();
                res.send({ message: `Pause sucessfully` });
            } else {
                res.status(400).send({ message: `Unable to Pause` });
            }
            break;

        case 'resume':
            if (torrent) {
                torrent.resume()
                res.send({ message: `Resume sucessfully` });
            } else {
                res.send({ message: `Unable to Resume` });
            }
            break;

        case 'delete':
            webt.removeByTorrentId(torrentId)
                .then(result => res.send(result))
                .catch(err => res.status(400).send(err));
            break;

        default:
            res.send({ message: `No action found.` });
            break;
    }
});

module.exports = router;