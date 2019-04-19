import axios from 'axios';
import {stringify} from 'flatted';
import express from 'express';
import checkCache, {saveToCache} from './cache';

let router = express.Router();

router.get('/get-data', checkCache(), (req, res) => {
  if(!req.query.endpoint || (req.query.endpoint && typeof req.query.endpoint !== 'string')) {
    return res.status(400).send({
      message: 'Bad request'
    });
  }

  axios.defaults.headers.common['Accept'] = 'application/json';

  axios.get(req.query.endpoint, {params: {api_key: process.env.DISCOURSE_API_KEY}})
    .then(response => {
      let key = 'culturesquad__' + req.originalUrl || req.url;
      saveToCache(key, response.data);
      res.status(200).send(response.data);
    })
    .catch(error => {
      res.status(400).send(stringify(error.response));
    });
});

export default router;
