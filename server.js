const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const User = require('./app/models/user');

const apiRoutes = require('./api');

// settings 

const port = process.env.PORT || 3000

mongoose.connect(config.database, {useNewUrlParser: true});
app.set('superSecret', config.secret);

// middlewares

app.use(bodyParser.urlencoded({extended: false}));     // convierte el cuerpo de las peticiones post
app.use(bodyParser.json());


app.use(morgan('dev'));

// routes

app.get('/', (req, res) => {
    console.log('La APi esta en local host 3000');
    res.send('Hola la api eta esperando');
});


app.get('/setup', (req, res) => {
    const testUser = new User({
        name: 'Jeanpier',
        password: 'password',
        admin: true
    });

    testUser.save(err => {
        if (err) throw err;
        console.log('USer saved ');
        res.json({
            success: true
        })
    })
});

// api

app.use('/api', apiRoutes);

app.listen(3000, () => {
    console.log('server on port 3000');
})