const express = require('express');
const PORT = process.env.PORT || 3000;
const public_route = require('./controllers/public_routes');
const private_route = require('./controllers/private_routes');
const auth_route = require('./controllers/auth_routes');
const db = require('./config/connection');
const session = require('express-session');
const {engine} = require('express-handlebars');

const app = express(); 

// Setup handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    runtimeOptions:{
        allowedProtoMethods: true
    }
}));

app.set('view engine', 'hbs');
// Set the views folder for all of our handlebar template files
app.set('views', './views');


// Allow the client to send through json
app.use(express.json());

// Allow the client to send through standard form data
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));


app.use(session({
    // Required to be used to validate the client cookie matches the session secret
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));

//Load all of our routes at the root
app.use('/', [public_route,private_route,auth_route]);

db.sync().then(()=>{
    app.listen(PORT, ()=> console.log('Server start on port %s', PORT));
});
