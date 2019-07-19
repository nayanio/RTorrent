import React, { Component } from 'react';
import './Main.css';
import CONFIG from '../config';
import HeaderRow from '../components/HeaderRow';
import Row from '../components/Row';

import { onTorrentDone, onTorrentUpdate, onTorrentError } from '../services/socker';

class Main extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            downloads: {},
            new_uri: ''
        }

        onTorrentDone(torrent => {
            const downloads = this.state.downloads;
            downloads[torrent.infoHash] = torrent;
            this.setState({
                downloads
            });
        });

        onTorrentUpdate(torrent => {
            const downloads = this.state.downloads;
            downloads[torrent.infoHash] = torrent;
            this.setState({
                downloads
            });
        });

        onTorrentError(torrent => {
            const downloads = this.state.downloads;
            downloads[torrent.infoHash] = torrent;
            this.setState({
                downloads
            });
        });

        this.addNew = this.addNew.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addNew() {
        console.log('Add New clieck', this.state.new_uri);
        if (this.state.new_uri.length > 0) {
            fetch(`/api/torrents/new`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ magnetURI: this.state.new_uri })
            }).then(response => {
                // const body = await response.json();
                if (response.status === 200) {
                    this.setState({ new_uri: '' });
                    const downloads = {};
                    this.callBackendAPI(`${CONFIG.base_path}/api/torrents`)
                        .then(res => {
                            res.forEach(r => {
                                downloads[r.infoHash] = r;
                            });
                            this.setState({ downloads });
                        })
                        .catch(err => console.log(err));
                }
            }).catch(err => console.log(err));
        }
    }

    handleChange(event) {
        this.setState({ new_uri: event.target.value });
    }

    componentDidMount() {
        // Call our fetch function below once the component mounts
        const downloads = {};
        this.callBackendAPI(`${CONFIG.base_path}/api/torrents`)
            .then(res => {
                res.forEach(r => {
                    downloads[r.infoHash] = r;
                });
                this.setState({ downloads });
            })
            .catch(err => console.log(err));
    }
    // this.setState({ data: res.express })
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async (path) => {
        const response = await fetch(path);
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
                                    <h6>Downloading</h6>
                                    <span className="badge badge-primary badge-pill">14</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <h6>Finished</h6>
                                    <span className="badge badge-primary badge-pill">2</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <h6>Unfinished</h6>
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
                <div className="fixed-bottom bottom-bar row">
                    <div className="col-10 offset-2">
                        <div className="form-row">
                            <div className="col-11">
                                <input type="text" value={this.state.new_uri} onChange={this.handleChange} className="form-control" placeholder="Enter magnetURI" id="magnetURI"></input>
                            </div>
                            <div className="col-1">
                                <button onClick={this.addNew} className="col btn btn-success">ADD</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Main;