import bodyParser from 'body-parser' ;
import express from 'express'
import mongoose from 'mongoose';
import { router } from './routes/routes';
import dotenv from 'dotenv'
dotenv.config();

const mongoURI = process.env.MONGO_URI as string

const app = express();

app.use(express.static('src/public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//banco de dados
connectMongo();
async function connectMongo() { 
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB Connected.");
    } catch (error) {
        console.log(error)
    }
}

app.use('/', router);

app.listen(3000, () => {
    console.log("---PROJETO RODANDO EM http://localhost:3000 ----");
})