const fs = require('fs');
const lame = require('lame');
const OPL3 = require('opl3').OPL3;
const LAA = require('opl3').format.LAA;
const Player = require('opl3').Player;

const player = new Player(LAA);
const file = fs.createWriteStream('./public/testing.mp3');
const encoder = new lame.Encoder({
    // input
    channels: 2, // 2 channels (left and right)
    bitDepth: 16, // 16-bit samples
    sampleRate: 49700 // 49,700 Hz sample rate
});

player.pipe(encoder);
encoder.pipe(file);

player.load(fs.readFileSync('./public/chords-1537485160216-.mid'));
player.on('progress', function(value) {
    process.stdout.write('Bien!');
});