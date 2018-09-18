const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArchivoSchema = new Schema({
    notes: { type: String },
    pattern: { type: String },
    arch: { type: String }

});

const Archivo = mongoose.model('archivos', ArchivoSchema);

module.exports = Archivo;