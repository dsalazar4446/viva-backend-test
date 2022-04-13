const express = require('express');
const { autentication } = require('../middlewares');

const app = express();

module.exports = app

const Pregunta = require('../models/preguntas')


app.post('/pregunta', autentication.verificaToken, async (req, res) => {
    const { body } = req;

    const pregunta = new Pregunta({ ...body});
    pregunta.save((err, preguntaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!preguntaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            pregunta: preguntaDB
        });

    });
})

app.get('/pregunta', async (req, res) => {

    try {
        const pregunta = await Pregunta.find()
            .populate('cuestionario').exec();
        res.json({
            ok: true,
            pregunta
        })

    } catch (err) {
        res.json({
            ok: false,
            err
        })
    }
});

app.get('/pregunta/:id', async (req, res) => {
    let id = req.params.id
    try {
        const pregunta = await Pregunta.findById(id)
            .populate('cuestionario').exec();
        res.json({
            ok: true,
            pregunta
        })

    } catch (err) {
        res.json({
            ok: false,
            err
        })
    }
});

app.put('/pregunta/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const pregunta = await Pregunta.findByIdAndUpdate(id, body, { new: true });
        res.json({
            ok: true,
            pregunta
        })


    } catch (err) {
        res.json({
            ok: false,
            err
        })
    }
});

app.delete('/pregunta/:id', [autentication.verificaToken, autentication.verificaAdminRole,], async (req, res) => {
    try {
        const id = req.params.id;
        const pregunta = await Pregunta.findByIdAndDelete(id);
        res.json({
            ok: true,
            categoria
        })
    } catch (err) {
        res.json({
            ok: false,
            err
        })
    }
});