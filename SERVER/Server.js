import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv'
import './Models/Db.js'

const app = express();
const port = 3001;

config();
app.use(cors());
app.use(json());
app.listen(port, () => {
    console.log(`Serveur en cours déxecution sur le port ${port}`);
});
