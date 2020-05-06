const express = require('express')
const app = express();
const mongoose = require('mongoose')


const path = require('path')

// POST DATA SETTINGS
app.use(express.json())

const dotenv = require('dotenv').config()



// PORT SETTINGS
const server = app.listen(process.env.PORT, (server) => {
  console.log("listening on port 8000")
});




// FLASH SETTINGS (Keep them here too)
// const flash = require('express-flash');
// app.use(flash());


// VIEWS AND STATIC SETTINGS
app.use(express.static(__dirname + "/public/dist/public"));


// SESSION SETTINGS (Keep them in server.js)
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }))


// ROUTES
const mongooseConfig = require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

const ws = require('./server/websocket/socket').init(server)
ws.on('connection', socket => {console.log('Socket connection established')})