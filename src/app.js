import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './route';
import {netlifyRebuildCron} from './cron-jobs';

const app = express();
const netlifyBuildHookUrlRegex = /^https:\/\/api\.netlify\.com\/build_hooks\/[a-z0-9]{24}$/i;

dotenv.config();

if(process.env.NETLIFY_REBUILD_WEBHOOK_URL && process.env.NETLIFY_REBUILD_WEBHOOK_URL.match(netlifyBuildHookUrlRegex) && process.env.NETLIFY_REBUILD_CRON_SCHEDULE_MINUTES){
  netlifyRebuildCron.start();
}

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);


export default app;
