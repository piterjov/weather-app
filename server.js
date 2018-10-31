const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log!');
        }
    });

    next();
});

app.use((req, res, next) => {

    res.render('maintenance.hbs');
});
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (request, response) => {
    response.send({
        name: 'Peter',
        likes: [
            'Biking',
            'Cities'

        ]
    });
});
app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page'
    })
});

app.get('/home', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my web app!'
    })
});

app.get('/bad', (request, response) => {
   response.send({
       errorMessage: 'Unable to handle request'
   });
});
app.listen(port, () => {
    console.log('Server is up on port: ', port);

    }
);
