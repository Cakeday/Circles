const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

if (dotenv.error) {
  throw dotenv.error
}



mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

var models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    require(models_path + '/' + file);
   }
})