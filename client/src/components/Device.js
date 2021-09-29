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
    console.log('clicked!');
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
    return (
      <div className='device'>
        <p>{this.props.device.name}</p>
        <Button
          onClick={this.clickButton}
          isPoweredOn={isPoweredOn}
          isOnline={isOnline}
        />
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

const Button = (props) => {
  const isOnline = props.isOnline ?? false;
  const isPoweredOn = props.isPoweredOn ?? false;
  const spanClass = isOnline
    ? (isPoweredOn ? 'indicator indicate-on' : 'indicator indicate-off')
    : 'indicator indicate-disabled';
  return (
    <div onClick={props.onClick}>
      <button className='power'><i className="fas fa-power-off"></i></button>
      <span className={spanClass}></span>
    </div>
  );
};

export default Device;
