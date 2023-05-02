import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { DataSource } from 'typeorm';
import passport from 'passport';
import config from './config/passport';

import login from './routes/login';
import signup from './routes/signup';

const dbConfig = require('./ormconfig.json');

// Setting up port
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // For body parser
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());

const AppDataSource = new DataSource(dbConfig);

config(AppDataSource);

// wire up all the routes
app.use(login(passport));
app.use(signup(AppDataSource));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (_req, res) => {
  res.send('hello world');
});

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => console.log('Example app listening on port 3000!'));
});
