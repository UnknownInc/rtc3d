import express from 'express';
import morgan from 'morgan';
import config from './config.js'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import signaling from './signaling.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.config = config;
app.log = console;

app.set('isPrivate', config.mode == "private");
if (config.logging !== "none") {
  app.use(morgan(config.logging));
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/signaling', signaling);
app.get('/config', (req, res) => res.json({ useWebSocket: config.websocket, startupMode: config.mode, logging: config.logging }));

app.use(express.static(join(__dirname, '../public')));

  
export default app;