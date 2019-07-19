import React, { Component } from 'react';
import './Row.css';
import CONFIG from '../config';

class Row extends Component {

  constructor(props) {
    super();
    this.state = {
      isPause: false,
    }

    this.deleteClick = this.deleteClick.bind(this);
    this.pauseClick = this.pauseClick.bind(this);
  }

  deleteClick() {
    this.callBackendAPI(`${CONFIG.base_path}/api/delete/${this.props.data.infoHash}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  pauseClick() {
    this.setState(state => ({
      isPause: !state.isPause
    }));
    if (this.state.isPause) {
      this.callBackendAPI(`${CONFIG.base_path}/api/resume/${this.props.data.infoHash}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    } else {
      this.callBackendAPI(`${CONFIG.base_path}/api/pause/${this.props.data.infoHash}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }

  componentDidMount() {

  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async (path) => {
    const response = await fetch(path);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  byteToMb(byte) {
    return parseFloat((byte / (1024 * 1024)).toFixed(2));
  }

  millisecondToHrt(millisecond) {
    let delim = " ";
    let hours = Math.floor(millisecond / (1000 * 60 * 60) % 60);
    let minutes = Math.floor(millisecond / (1000 * 60) % 60);
    let seconds = Math.floor(millisecond / 1000 % 60);
    hours = hours > 0 ? hours < 10 ? `0${hours}h` : `${hours}h` : '';
    minutes = minutes > 0 ? minutes < 10 ? `0${minutes}m` : `${minutes}m` : '';
    seconds = seconds > 0 ? seconds < 10 ? `0${seconds}s` : `${seconds}s` : '';
    return hours + '' + delim + minutes + '' + delim + seconds + '';
  }

  render() {
    const pb = {
      width: `${parseFloat((this.props.data.progress * 100).toFixed(2))}%`
    }
    return (
      <div className="row">
        <div className="col-1">
          <input type="checkbox" aria-label="Checkbox for following text input"></input>
        </div>
        <div className="col-1">
          <img src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png" className="rounded img" alt="No"></img>
        </div>
        <div className="col-3">
          <h5>{this.props.data.name}</h5>
        </div>
        <div className="col-3">
          <div className="progress">
            <div className="progress-bar" style={pb} role="progressbar" aria-valuenow={this.props.data.progress} aria-valuemin="0" aria-valuemax="100">{this.props.data.progress * 100}%</div>
          </div>
        </div>
        <div className="col-1">
          <small>{this.byteToMb(this.props.data.downloadSpeed)} MB/s</small>
        </div>
        <div className="col-1">
          <small>{this.byteToMb(this.props.data.downloaded)}/{this.byteToMb(this.props.data.length)} MB</small>
        </div>
        <div className="col-1">
          <small>{this.millisecondToHrt(this.props.data.timeRemaining)}</small>
        </div>
        <div className="col-1">
          <button type="button" className="btn btn-primary btn-sm" onClick={this.deleteClick}><i className="material-icons">delete_outline</i></button>
          <button type="button" className={`btn btn-primary btn-sm ${this.props.data.isDone ? 'disabled' : ''}`} onClick={this.pauseClick}><i className="material-icons">{this.state.isPause ? 'play_circle_outline' : 'pause_circle_outline'} </i></button>
        </div>
      </div>
    );
  }
}

export default Row;