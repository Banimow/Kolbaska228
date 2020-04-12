/*
1.ПІП
2.Дата народження
3.Особовий ID
4.Наявність автомобіля
5.Попереднє місце роботи
6.Отримана освіта 
7.Примітки

*/

var {mongoose} = require('../libs/mongoose');

var TorgoviySchema = mongoose.Schema({
    name: {
        fName: String,
        mName: String,
        lName: String
    },
    birth: Date,
    idcode: Number,
    avtomobil: Boolean,
    work: String,
    study: String,
    prumitka: String,
    torgNumber: mongoose.Schema.Types.ObjectId,
    
   });

var Torgoviy = module.exports = mongoose.model('Torgoviy', TorgoviySchema);

module.exports.createTorgoviy = function(newTorgoviy, callback) {
    newTorgoviy.save(callback);
}