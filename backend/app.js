import express from 'express';
import helmet from 'helmet';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import path from 'path';
import rateLimit from 'express-rate-limit';
import * as userRoutes from './routes/user.js';
import * as comRoutes from './routes/com.js';
import * as db from './database/Db.js';

dotenv.config();
export const app = express();

db.init();

app.use(helmet());
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 1000,
    message: 'Too many requests. Wait for a while before attempting again'
});

app.use(limiter);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
    
app.use(bodyParser.json());


const staticImagesPath = path.join(path.dirname(import.meta.url), "images").replace(/^file:[\\/]+/g, '');
app.use('/images', express.static(staticImagesPath));

app.use('/user', userRoutes.route());
app.use('/com', comRoutes.route());