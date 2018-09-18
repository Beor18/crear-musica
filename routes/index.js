const express = require('express');
const router = express.Router();
const scribble = require('scribbletune');

router.get('/', (req, res, next) => {

    res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
    let clip = scribble.clip({
        notes: req.body.notas,
        pattern: req.body.patterns.repeat(8)
    });

    scribble.midi(clip, './public/chords-' + Date.now() + '-.mid');
    res.redirect('/');
});

module.exports = router;