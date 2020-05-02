const express = require('express')
const app = express()

const path = require('path')

// POST DATA SETTINGS
app.use(express.json())

const dotenv = require('dotenv').config()



// PORT SETTINGS
app.listen(process.env.PORT, () => console.log("listening on port 8000"));


// SESSION SETTINGS (Keep them in server.js)
// const session = require('express-session');
// app.use(session({
//     secret: 'keyboardkitteh',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 }
//   }))


// FLASH SETTINGS (Keep them here too)
// const flash = require('express-flash');
// app.use(flash());


// VIEWS AND STATIC SETTINGS
app.use(express.static(__dirname + "/public/dist/public"));

// ROUTES
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);