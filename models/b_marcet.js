var {mongoose} = require('../libs/mongoose');

var MarcetSchema = mongoose.Schema({ 
    nfirm: String,
    nmisto: String,
    nstreet: String,      
    nhouse: Number,    
    znizka: Number,
 
    owners: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    torgoviy: mongoose.Schema.Types.ObjectId
    
});

var Marcet = module.exports = mongoose.model('Marcet', MarcetSchema);

module.exports.createMarcet = function(newMarcet, callback) {
    newMarcet.save(callback);
}