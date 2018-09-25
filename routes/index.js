const express = require('express');
const router = express.Router();
const scribble = require('scribbletune');
const Archivo = require('../models/Archivo');
const path = require('path');

const fs = require('fs');
const lame = require('lame');
const OPL3 = require('opl3').OPL3;
const LAA = require('opl3').format.LAA;
const Player = require('opl3').Player

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
    let arch = path.join('chords-' + Date.now() + '-.mid');
    scribble.midi(clip, './public/' + arch);

    // Procesamos archivo mid y convertimos a mp3 utilizando los sonidos del emulador Yamaha Opl3
    let player = new Player(LAA);
    let link = 'yamaha-' + Date.now() + '-.mp3';
    let file = fs.createWriteStream('./public/' + link);
    let encoder = new lame.Encoder({
        // Input/Entrada
        channels: 2, // 2 channels (left and right)
        bitDepth: 16, // 16-bit samples
        sampleRate: req.body.sampleRate // 49,700 Hz sample rate
    });

    player.pipe(encoder);
    encoder.pipe(file);

    player.load(fs.readFileSync('./public/' + arch));
    player.on('progress', function(value) {
        console.log('Progreso: ' + value + '%');
    });

    // Se guarda en la base de datos las notas
    let mid = new Archivo({
        notes: req.body.notas,
        pattern: req.body.patterns,
        arch: arch,
        link: link
    });

    await mid.save(() => {
        res.send("Archivo guardado con éxito en la DB!");
        console.log("Archivo guardado con éxito en la DB!");
    });

});

router.get('/delete/:id', async(req, res) => {
    let p = await Archivo.findById({ _id: req.params.id, arch: req.body.arch, link: req.body.link });

    fs.unlink('./public/' + p.arch, (err) => {
        if (err) throw err;
        console.log('Borrado MIDI OK!');
    });

    fs.unlink('./public/' + p.link, (err) => {
        if (err) throw err;
        console.log('Borrado MP3 OK!');
    });

    await Archivo.findByIdAndRemove(req.params.id, (err) => {

        if (err) {
            return res.send(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;