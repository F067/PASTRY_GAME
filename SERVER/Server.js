import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv'
import './Models/Db.js'

import UserRoute from './Routes/User.routes.js'
import PastryRoute from './Routes/Pastry.routes.js'


const app = express();
const port = 3001;

config();
app.use(cors());
app.use(json());
app.use('/users', UserRoute);
app.use('/pastry', PastryRoute);
app.listen(port, () => {
    console.log(`Serveur en cours déxecution sur le port ${port}`);
});
