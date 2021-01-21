const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LojistaSchema = new Schema({

    nome: String,

    descricao: String,

    status: String,

    imgPath: String,

    //imgLogo: { data: Buffer, contentType: String }

})

module.exports = mongoose.model('Lojista', LojistaSchema)