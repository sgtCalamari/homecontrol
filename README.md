# Home Control Application
## Introduction
Node JS application using React to interface with the SmartThings API for smart
device (IoT) control. Project is divided into two parts:
### Server
Communicates to SmartThings API and serves data to Client app.
### Client
React App front-end that calls to Server for data from SmartThings API.
### Notes
#### Samsung SmartThings
This is the "smart hub" that's communicating with all the smart devices.
Different manufacturers devices may return different responses or implement
fewer components.
* [SmartThings API Docs](https://developer.smartthings.com/docs/api/public/)

## Getting Started
To host the application, make sure the following are installed on the machine:
* [NodeJS](https://nodejs.org/en/download/): web server and build tool
(*Version 14.18.0 is confirmed to build properly*)

## Build Steps
1. Download repository to desired location
2. Build React app by running `npm run build` in the client directory
3. Serve the app by running `node server.js` in the server directory
