import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import session from 'express-session';
import { DataSource } from 'typeorm';
import passport from 'passport';
import config from './config/passport';

import login from './routes/login';
import todos from './routes/todos';

const dbConfig = require('./ormconfig.json');

// Setting up port
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false })); // For body parser
app.use(bodyParser.json());
app.use(session({
  secret: 'mysession',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.session());
app.use(passport.initialize());

const AppDataSource = new DataSource(dbConfig);

config(AppDataSource);

// wire up all the routes
app.use(login(passport));
app.use(todos(AppDataSource));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (_req, res) => {
  res.send('hello world');
});

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => console.log('Example app listening on port 3000!'));
});
