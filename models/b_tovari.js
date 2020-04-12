/*
1. Назва товару
2. Тип
3. Виробник
n. Постачальник
n. Колір
n. Літраж
4. Закупівельна ціна
5. Оптова ціна
6. Роздрібна ціна

*/


var {mongoose} = require('../libs/mongoose');

var TovarSchema = mongoose.Schema({ 
    namet: String,
    ntip: String,
    nvir: String,
    npos: String,
    ncolor: String,
    nlitr: Number,
    nzak: Number,
    nopt: Number,
    nrozd: Number,
    nkil: Number,
 
        
});

var Tovar = module.exports = mongoose.model('Tovar', TovarSchema);

module.exports.createTovar = function(newTovar, callback) {
    newTovar.save(callback);
}



