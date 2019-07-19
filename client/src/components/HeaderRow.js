import React, { Component } from 'react';
import './HeaderRow.css';

class HeaderRow extends Component {

  constructor(props) {
    super();
    this.state = {
      isLoading: true,
      downloads: {}
    }
  }

  componentDidMount() {

  }
  


  render() {
    return (
      <div className="row header HeaderRow">
        <div className="col-1">
          <input type="checkbox" aria-label="Checkbox for following text input"></input>
        </div>
        <div className="col-1">

        </div>
        <div className="col-3">
          Name
      </div>
        <div className="col-3">
          Status
      </div>
        <div className="col-1">
          Speed
      </div>
        <div className="col-1">
          Size
      </div>
        <div className="col-1">
          Time
      </div>
        <div className="col-1">
        </div>
      </div>
    );
  }
}

export default HeaderRow;