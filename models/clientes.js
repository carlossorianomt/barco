const mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var ClienteSchema = Schema({

    name: String,
    age: String,
    email: String,
    pass: String
    
})

module.exports = mongoose.model("clientes",ClienteSchema);