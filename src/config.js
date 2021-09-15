

const config = {
  PORT: process.env.PORT || 3600,
  secure: process.env.SECURR || false,
  keyfile: process.env.KEYFILE || 'server.key',
  certfile: process.env.CERTFILE || 'server.cert',
  websocket: process.env.WEBSOCKET?true:false,
  mode: process.env.MODE || 'public',
  logging: process.env.LOGGING || 'dev',
}

console.debug(config);

export default config;