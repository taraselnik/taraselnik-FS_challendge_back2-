'use strict';
import express, { Router } from 'express';
import { join } from 'path';
import serverless from 'serverless-http';
const app = express();
// import { json } from 'body-parser';

const router = Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

router.get('/api', (req, res) => {
  res.send('Hello World!')
});


router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(express.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(join(__dirname, '../index.html')));

export default app;
export const handler = serverless(app);
