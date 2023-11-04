import express, { Request, Response } from 'express';
import router from './routes';
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type'],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
// app.use(express.urlencoded({extended:true}))
app.use('/api', router);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
