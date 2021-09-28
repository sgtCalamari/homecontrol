import axios from 'axios';
import React from 'react';
import './App.css';

import Device from './components/Device';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.switch = this.switch.bind(this);
    this.state = {
      rooms: [],
      devices: []
    }
  }

  componentDidMount() {
    this.getRooms();
    this.getDevices();
  }

  getRooms() {
    axios.get(`${process.env.REACT_APP_API_URL}/rooms`)
      .then(r => this.setState({rooms: r.data}))
      .catch(err => console.log(err));
  }

  getDevices() {
    axios.get(`${process.env.REACT_APP_API_URL}/devices`)
      .then(d => this.setState({devices: d.data.filter(d => d.isLight)}))
      .catch(err => console.log(err));
  }

  switch(action, deviceId) {
    axios.post(`${process.env.REACT_APP_API_URL}/devices/${deviceId}/${action}`)
      .then(r => console.log(r))
      .catch(err => console.log(err));
  }

  render() {
    const rooms = this.state.rooms;
    const devices = this.state.devices;
    return (
      <div className='App'>
        <header>
          <h1>Home Control</h1>
          <hr/>
        </header>
        <div className="contents">
          <div>
            {rooms.map(r => (<>
              <h2 key={r.roomId}>{r.name}</h2>
              {devices.filter(d => d.roomId === r.roomId).map(d => (
                <Device key={d.deviceId} device={d} />
              ))}
            </>))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
