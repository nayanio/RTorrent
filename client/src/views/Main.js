import React, { Component } from 'react';
import './Main.css';

import HeaderRow from '../components/HeaderRow';
import Row from '../components/Row';

class Main extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            downloads: {
                '08ada5a7a6183aae1e09d831df6748d566095a10': {
                    "length": 129302391,
                    "pieceLength": 131072,
                    "lastPieceLength": 65399,
                    "downloaded": 0,
                    "downloadSpeed": 0,
                    "uploaded": 0,
                    "progress": 0.39,
                    "infoHash": "08ada5a7a6183aae1e09d831df6748d566095a10",
                    "magnetURI": "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F",
                    "numPeers": 11,
                    "name": "Sintel",
                    "dn": "Sintel",
                    "isDone": true,
                    "timeRemaining": 10500000
                },
                '18ada5a7a6183aae1e09d831df6748d566095a10': {
                    "length": 129302391,
                    "pieceLength": 131072,
                    "lastPieceLength": 65399,
                    "downloaded": 0,
                    "downloadSpeed": 0,
                    "uploaded": 0,
                    "progress": 0.86,
                    "infoHash": "18ada5a7a6183aae1e09d831df6748d566095a10",
                    "magnetURI": "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F",
                    "numPeers": 11,
                    "name": "Sintel",
                    "dn": "Sintel",
                    "isDone": false,
                    "timeRemaining": 5940000
                }
            }
        }
    }

    componentDidMount() {
        // Call our fetch function below once the component mounts
        // const downloads = {};
        // this.callBackendAPI()
        //     .then(res => {
        //         res.forEach(r => {
        //             downloads[r.infoHash] = r;
        //         });
        //         this.setState({ downloads });
        //     })
        //     .catch(err => console.log(err));
    }
    // this.setState({ data: res.express })
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/api/torrents');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    render() {
        const downloads = [];
        for (const hash in this.state.downloads) {
            downloads.push(this.state.downloads[hash]);
        }
        return (
            <div className="Main container-fluid">
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                            <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Cras justo odio
                                    <span className="badge badge-primary badge-pill">14</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Dapibus ac facilisis in
                                    <span className="badge badge-primary badge-pill">2</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Morbi leo risus
                                    <span className="badge badge-primary badge-pill">1</span>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                        <div className="row">
                            <div className="col-8">
                                <h1>Currently downloading</h1>
                            </div>
                            <div className="col-4">
                                <div className="row">
                                    <button type="button" className="col btn btn-primary btn-sm"><i className="material-icons">delete_outline</i></button>
                                    <button type="button" className="col btn btn-secondary btn-sm"><i className="material-icons"> pause_circle_outline </i></button>
                                    <button type="button" className="col btn btn-secondary btn-sm"><i className="material-icons"> pause_circle_outline </i></button>
                                    <button type="button" className="col btn btn-secondary btn-sm"><i className="material-icons"> pause_circle_outline </i></button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <HeaderRow />
                                {downloads.map((server, i) => <Row data={server} key={i} />)}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Main;