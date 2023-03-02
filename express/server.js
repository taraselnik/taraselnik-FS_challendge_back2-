'use strict';
import * as dotenv from 'dotenv';
dotenv.config({path: '.env'});

import express, { Router } from 'express';
// import { join } from 'path';
import serverless from 'serverless-http';
import mongoose from 'mongoose';

const app = express();

const URI = `${process.env.DATABASE_URL}`;

mongoose.set("strictQuery", false);
mongoose.connect(URI);

const db = mongoose.connection;
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('DataBase connected...'))


const router = Router();
router.get('/', async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

router.get('/api', async (req, res) => {
  res.send('Hello World!')
});


router.get('/another', async (req, res) => res.json({ route: req.originalUrl }));
router.post('/', async (req, res) => res.json({ postBody: req.body }));

app.use(express.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
// app.use('/', (req, res) => res.sendFile(join(__dirname, '../index.html')));

export default app;

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
