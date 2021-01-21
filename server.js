const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const cors = require('cors')
    // const multer = require('multer')
    // const fs = require("fs")

const Lojista = require('./app/models/lojista')

mongoose.Promise = global.Promise;

const uri = "mongodb+srv://rpaiva:842912ap@projetos.wu2jf.mongodb.net/lojistas?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//mongoose.connect('mongodb://localhost:27017/lojistas')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

let port = process.env.port || 3000

//ROTAS
let router = express.Router()

app.use('/api', router)

router.use((req, res, next) => {
    console.log("Algo acontece aqui...!")
    next()
})

//SUBIR IMAGENS
// const path = require('path');
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({
//     storage: storage
// });

router.route('/lojista')
    .post((req, res) => {

        const lojista = new Lojista({
            nome: req.body.nome,
            descricao: req.body.descricao,
            //imgLogo: fs.readFileSync(req.file.path),
            status: req.body.status
        });

        lojista.save((error) => {
            if (error)
                res.status(400).send('Erro ao cadastrar lojista! ' + error)
            res.send("Lojista cadastrado com sucesso!")
        })
    })
    .get((req, res) => {
        Lojista.find((error, lojistas) => {
            if (error)
                res.send('Erro ao tentar Selecionar os lojistas...: ' + error);

            res.send(lojistas);
        });
    });

router.route('/lojista/:id')
    .put((req, res) => {
        Lojista.findById(req.params.id, (error, lojista) => {
            if (error)
                res.send("Id do Lojista não encontrado....: " + error);

            lojista.nome = req.body.nome;
            lojista.link = req.body.link;
            lojista.descricao = req.body.descricao;
            lojista.status = req.body.status

            lojista.save((error) => {
                if (error)
                    res.send('Erro ao atualizar o lojista....: ' + error);

                res.json({ message: 'Lojista atualizado com sucesso!' });
            });
        });
    })
    .get((req, res) => {
        Lojista.findById(req.params.id, (error, lojista) => {
            if (error)
                res.send("Lojista não encontrado... " + error)
            res.json(lojista)
        })
    })
    .delete((req, res) => {
        Lojista.deleteOne({
            _id: mongodb.ObjectID(req.params.id)
        }, (error) => {
            if (error)
                res.send("Id do Lojista não encontrado... " + error)
            res.json({ message: 'Lojista excluído com sucesso!' })
        })
    })

app.listen(port)
console.log("iniciando na porta " + port)