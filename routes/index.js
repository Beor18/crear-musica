const express = require('express');
const router = express.Router();
const scribble = require('scribbletune');
const Archivo = require('../models/Archivo');

router.get('/', async(req, res, next) => {
    const musica = await Archivo.find();
    res.render('index', { title: 'Express', musica });
});

router.post('/', async(req, res) => {
    // Se crea el archivo MIDI
    let clip = scribble.clip({
        notes: req.body.notas,
        pattern: req.body.patterns.repeat(8)
    });
    let arch = './public/chords-' + Date.now() + '-.mid';
    scribble.midi(clip, arch);

    // Se guarda en la base de datos las notas
    let mid = new Archivo({
        notes: req.body.notas,
        pattern: req.body.patterns,
        arch: arch
    });

    await mid.save(() => {
        res.send("Archivo guardado con éxito en la DB!");
        console.log("Archivo guardado con éxito en la DB!");
    });
});

module.exports = router;