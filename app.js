const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();
const app =express();
const port=5000;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.engine('hbs', exphbs.engine({extname: '.hbs'}))
app.set('view engine','hbs');

const routes=require('./server/router/user');
app.use('/',routes);
app.listen(port, ()=>console.log('listening to the port ${port}'));
