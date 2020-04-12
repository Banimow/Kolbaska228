var { mongoose, AutoIncrement } = require('../libs/mongoose');

var ZamovleniaSchema = mongoose.Schema({ 
    number: { type: Number, default: 0 },
    tochka: mongoose.Schema.Types.ObjectId,
    masivtov: [{ tovaID: mongoose.Schema.Types.ObjectId, count: Number }],
    torgo: mongoose.Schema.Types.ObjectId,

        
});

ZamovleniaSchema.plugin(AutoIncrement, {inc_field: 'number'});

var Zamovlenia = mongoose.model('Zamovlenia', ZamovleniaSchema);




module.exports =  Zamovlenia;

module.exports.createZamovlenia = function(newZamovlenia, callback) {
    newZamovlenia.save(callback);
}