import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { json as bodyParser } from 'body-parser';

import env from './env';
import kenyanBanks from './controllers/kenyan-banks';
import { debug } from './utilities/debug';
/**
 * This is a middleware example, and helps with debugging by outputing data for each request on the console.
 */
function loggingMiddleware(req: Request, res: Response, next: NextFunction) {
    debug(`${req.method}: ${req.originalUrl}`);
    next();
}

const app = express();

// Middlewares
app.set('port', env.port);
app.use(loggingMiddleware);
app.use(cors());
app.use(bodyParser());
app.use('/logos', express.static('logos'));

// Controllers
app.use(kenyanBanks);

export default app;
