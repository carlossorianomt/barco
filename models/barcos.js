const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategoriaSchema = Schema({
    descripcion: String,
    nombre:String,
    });

var Categoria = mongoose.model("Categoria", CategoriaSchema);


var BarcoSchema = Schema({
    capacidad:String,
    descripcion:String,
    nombre:String,
    objetivo:String,
    categoria_id:[CategoriaSchema]
})

module.exports = mongoose.model("barcos",BarcoSchema);