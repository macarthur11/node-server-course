const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
var ip = process.env.IP 
var port = process.env.PORT;

hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
    var now = new Date().toString();
    
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append file.');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Site Under Maintenance'
    })
})

app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
     return text.toUpperCase();
});

app.get('/',(req, res) => {
    //res.send('Hola!');
    res.render('home.hbs', {
        pageTitle: 'Landing Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to the landing page!'
    });
});

app.get('/about', (req,res) => {
    //res.send('About page here.');
    res.render('about.hbs',{
    pageTitle: 'About Page'
        
    }
    );
})

//app.get('/help')

app.get('/bad', (req,res) => {
    res.send({
     errorMessage: 'Bad request.'   
    })
})

app.listen(port, () => {
    console.log('Server is up on port', port);
});
