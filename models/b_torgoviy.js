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