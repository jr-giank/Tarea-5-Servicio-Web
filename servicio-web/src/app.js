const express = require('express');
const app = express();

const morgan = require('morgan');
// const handlebars = require('express-handlebars');
const path = require('path');

// settings
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
// app.engine('.hbs', engine({
//     defaultLayout: 'main',
//     extname: '.hbs'
// }));

// app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// routes
app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, './views/main.html'))
});

// static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;