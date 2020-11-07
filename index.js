'use strict'

var mongoose = require('mongoose');
var app = require('./app'); 
var port = 3000;



const mongoConnector = require('./bd/mongo.db')

// Conexión a la base de datos

try {
    
    app.listen(port, () => {
        console.log('Servidor corriendo correctamente en la url: localhost:3000');
    });

} catch (error) {

    console.log(error);
    
}



