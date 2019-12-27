const express = require('express');
const apiRoutes = express.Router();
const jwt = require('jsonwebtoken');

const User = require('./app/models/user');


apiRoutes.post('/authenticate', (req, res) => {
    User.findOne({
        name: req.body.name
    }, (err, user) => {
        if (err) throw err;
    
        if (!user){
            res.json({success: true, message: 'Autenticaion fallida'})
        }
        else if (user){
            if (user.password != req.body.password){
                res.json({success: false, message: 'Autenticacion fallida'})
            }else {
                const token = jwt.sign({user}, req.app.get('superSecret'));     // para acceder a una variable desde otro archivo se accede a traves de las peticiones 
                res.json({
                    success: true,
                    message: 'ahita el token :v',
                    token
                })
            }
        }
    })
})

apiRoutes.get('/', (req, res) => {
    res.json({
        message: 'Welcome to my API'
    })
});

apiRoutes.get('/users', (req, res) => {
    User.find({},(err, users) => {
        if (err) throw err;
        res.json({users});
    });
});

module.exports = apiRoutes;