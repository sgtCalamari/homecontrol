import React from 'react';
import axios from 'axios';
import './Device.css';

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.clickButton = this.clickButton.bind(this);
    this.state = {
      isOnline: false,
      isPoweredOn: false
    };
  }

  componentDidMount() {
    this.getDeviceStatus();
    this.interval = setInterval(() => this.getDeviceStatus(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  clickButton() {
    const isOnline = this.state.isOnline;
    if (!isOnline) { return; }
    const isPoweredOn = this.state.isPoweredOn;
    const action = isPoweredOn ? 'turnOff' : 'turnOn';
    this.controlDevice(action, () => {
      this.getDeviceStatus();
      this.forceUpdate();
    });
  }

  render() {
    const isOnline = this.state.isOnline;
    const isPoweredOn = this.state.isPoweredOn;
    const buttonText = isPoweredOn ? 'ON' : 'OFF';
    const buttonClass = isOnline ? (isPoweredOn ? 'on' : 'off') : 'offline'
    return (
      <div className='device'>
        <p>{this.props.device.name}</p>
        <button
          className={buttonClass}
          disabled={!isOnline}
          onClick={this.clickButton}
        >
          {buttonText}
        </button>
      </div>
    );
  }

  getDeviceStatus() {
    console.log('getting device status');
    const deviceId = this.props.device.deviceId;
    axios.get(`${process.env.REACT_APP_API_URL}/devices/${deviceId}/status`)
      .then(status => this.setState({
        isOnline: status.data.isOnline ?? false,
        isPoweredOn: status.data.isPoweredOn ?? false
      }))
      .catch(err => console.log(err));
  }

  // actionOptions: ['turnOff', 'turnOn']
  controlDevice(action, cb) {
    const deviceId = this.props.device.deviceId;
    axios.post(`${process.env.REACT_APP_API_URL}/devices/${deviceId}/${action}`)
      .then(r => {
        console.log(r);
        cb();
      })
      .catch(err => console.log(err));
  }
}

export default Device;
