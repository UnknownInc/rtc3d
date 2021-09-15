import app from './app.js'
import os from 'os';
import WSSignaling from './websocket.js';

function getIPAddress() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const k in interfaces) {
    for (const k2 in interfaces[k]) {
      const address = interfaces[k][k2];
      if (address.family === 'IPv4') {
        addresses.push(address.address);
      }
    }
  }
  return addresses;
}

;(async ()=>{
  const server = app.listen(app.config.PORT, async () => {
    app.log.info(`RTC Wep App server listening at port ${app.config.PORT}`);
  });

  if (app.config.websocket) {
    app.log.info(`start websocket signaling server ws://${getIPAddress()[0]}`)
    //Start Websocket Signaling server
    new WSSignaling(server, app.config.mode);
  }

  function onSIGHUP(signal) {
    app.log.warn(`*^!@4=> Received event: ${signal}`);
  }

  function closeGracefully(signal) {
    app.log.warn(`*^!@4=> Received event: ${signal}`);
    // app.db.pool.end();
    server.close(async ()=>{
      process.exit();
    });
  }

  process.on('SIGHUP', onSIGHUP)
  process.on('SIGINT', closeGracefully)
  process.on('SIGTERM', closeGracefully)

})().catch(err => console.log(err.stack))