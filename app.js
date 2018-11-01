const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

app.set('view engine','hbs');
// middleware
hbs.registerPartials(__dirname + '/views/partials');


//middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err) {
            console.log('unable to append to server.log.');
        }
    });
    next();
});
app.use((req, res, next) => {
  res.render('maintainence.hbs', {
    pageTitle:'Maintainence Page',
    msg: 'Sorry we are under Maintainance',
    currentYear: new Date().getFullYear()
  });
});
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',( ) => {
 return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.get('/', ( req , res ) => {
    //res.send('<h1>Hello Express</h1>');
    res.render('home.hbs',{
        pageTitle:'Home page',
        msg: 'Welcome! ',
        currentYear: new Date().getFullYear()
    });   
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
       pageTitle: 'About Page',
       currentYear: new Date().getFullYear()
    });
});
app.get('/bad',(req, res) =>{
   res.send({
    errorMsg: 'unable to handle request'
   });
});
app.listen(3000,() => {
    console.log('server is up on port 3000')
});