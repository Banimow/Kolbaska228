const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);



mongoose.set('useFindAndModify', false);
mongoose
  .connect('mongodb+srv://boruskmp:1425727Pp@cluster0-9jtrd.mongodb.net/test?retryWrites=true&w=majority', {useCreateIndex: true, useNewUrlParser: true })
  .then(() => console.log("MongoDb connected..."))
  .catch(err => console.error(err));

module.exports = { mongoose, AutoIncrement }
