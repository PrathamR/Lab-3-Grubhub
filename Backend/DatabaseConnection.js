const mongoose = require('mongoose');
var Schema = mongoose.Schema;//issue coming

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Grubhub',
{useNewUrlParser: true})
.then(() => console.log("Mongo Connected"))
.catch(err => console.log(err));