#!/usr/bin/env node

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const path = require('path');
const debug = require('debug')('app');
const morgan = require('morgan');

const homeRouter = require('./routes/home-router');
const passportRouter = require('./routes/passport-route');

const app = express();
const port = process.env.PORT || 3000;

// debug middleware
app.use(morgan('tiny'));

// authentication middleware
app.use(cookieParser());
app.use(session({ secret: 'someRandomSecret1101011' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// passportRouter(app);

// static files middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'jquery-ui-dist')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'highcharts', 'css')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap-tokenfield', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'jquery-ui-dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'highcharts')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap-tokenfield', 'dist')));

// express options
app.engine('hbs', handlebars({
  extname       : 'hbs',
  defaultLayout : 'main',
  layoutsDir    : path.join(__dirname, 'views', 'layouts'),
  partialsDir   : path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'hbs');
app.set('views', process.env.VIEWS_DIR);

app.use('/', homeRouter);

app.listen(port, 'localhost', () => {
  debug(`listening on port ${chalk.green(`${port}`)}`);
});
