//Imports
const express = require('express');
const app = express();

const morgan = require('morgan');
const path = require('path');

// settings
app.set('port', process.env.PORT || 5000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// Base de Datos -> firebase
const service = require('./firebase/servicio-web-f899f-firebase-adminsdk-ahv6u-ff5b837038.json');
const firebase = require('firebase-admin');

firebase.initializeApp({
    credential: firebase.credential.cert(service),
    databaseURL: 'https://servicio-web-f899f-default-rtdb.firebaseio.com/'
});

const db = firebase.database();

// routes
app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, './views/main.html'))
});

app.post('/new-contact', (request, response) => {
    const contacto = {
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        telefono: request.body.telefono
    };
    db.ref('contactos').push(contacto);
    response.send('Datos recibidos');
});

// static files
app.use(express.static(path.join(__dirname, '/public')));

module.exports = app;