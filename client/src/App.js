import axios from 'axios';
import React from 'react';
import './App.css';

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
      <div className="App">
        <div>
          <h1>Home Control</h1>
          <hr/>
          {rooms.map(r => (
            <>
            <h2 key={r.roomId}>{r.name}</h2>
            <ul>
              {devices.filter(d => d.roomId === r.roomId).map(d => (
                <p key={d.deviceId}>
                  {d.name}
                  <button onClick={() => this.switch('turnOff', d.deviceId)}>Off</button>
                  <button onClick={() => this.switch('turnOn', d.deviceId)}>On</button>
                </p>
              ))}
            </ul>
            </>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
