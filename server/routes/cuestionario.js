const express = require('express');
const { autentication } = require('../middlewares');

const app = express();

module.exports = app

const Cuestionario = require('../models/cuestionarios')


app.post('/cuestionario', autentication.verificaToken, async (req, res) => {
    const { body, usuario } = req;
    
    const cuestionario = new Cuestionario({ ...body, usuario: usuario._id });
    cuestionario.save((err, cuestionarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!cuestionarioDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            cuestionario: cuestionarioDB
        });

    });
})

app.get('/cuestionario', async (req, res) => {

    try {
        const cuestionario = await Cuestionario.find()
            .sort('description')
            .populate('usuario', 'nombre email').exec();
        res.json({
            ok: true,
            cuestionario
        })

    } catch (err) {
        res.json({
            ok: false,
            err
        })
    }
});

app.get('/cuestionario/:id', async (req, res) => {
    let id = req.params.id
    try {
        const cuestionario = await Cuestionario.findById(id)
            .populate('usuario', 'nombre').exec();
        res.json({
            ok: true,
            cuestionario
        })

    } catch (err) {
        res.json({
            ok: false,
            err
        })
    }
});

app.put('/cuestionario/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const cuestionario = await Cuestionario.findByIdAndUpdate(id, body, { new: true });
        res.json({
            ok: true,
            cuestionario
        })


    } catch (err) {
        res.json({
            ok: false,
            err
        })
    }
});

app.delete('/cuestionario/:id', [autentication.verificaToken, autentication.verificaAdminRole,], async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const cuestionario = await Cuestionario.findByIdAndDelete(id);
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