import express, { Request, Response } from 'express';
import router from './routes';
const path = require('path');

const cors = require('cors');
const app = express();
const PORT = 3001;


app.use('/uploads',express.static('uploads'));

app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type','Authorization'],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
// app.use(express.urlencoded({extended:true}))
app.use('/api', router);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
