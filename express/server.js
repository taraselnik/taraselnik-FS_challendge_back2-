import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import { errorHandler } from './middlewares/error.js';

dotenv.config({path: '../.env'});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// set up your routes here

app.get('/.netlify/functions/api', (req, res) => {
  res.send('Welcome')
});

mongoose
  .connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });


