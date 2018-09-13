const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3003;

let app = express();

// Registered Partials before use
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

// Using middleware
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append file.');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// Registered helper for repeating func
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to my website!'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Abput Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMsg: '404! Bad request'
    });
});

app.listen(port, () => console.log(`Server is up on port ${port}`));