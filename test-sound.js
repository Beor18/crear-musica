const fs = require("fs");
const scribble = require('scribbletune');
const path = require('path');
const AudioContext = require("web-audio-engine").RenderingAudioContext;
const context = new AudioContext();

const lame = require('lame');
const OPL3 = require('opl3').OPL3;
const LAA = require('opl3').format.LAA;
const Player = require('opl3').Player
var WAV = require('opl3').WAV;

let clip = scribble.clip({
    notes: 'F#m C#m DM Bm EM AM DM C#m AM',
    pattern: '[xx][x-]'.repeat(8)
});
let arch = path.join('chords-' + Date.now() + '-.mid');
scribble.midi(clip, './public/' + arch);

const oscillator1 = context.createOscillator();
const delay = context.createDelay();
const gain1 = context.createGain();
const oscillator2 = context.createOscillator();
const gain2 = context.createGain();

oscillator1.type = "sine";
oscillator1.frequency.value = 880;
oscillator1.start();
oscillator1.connect(delay);

delay.delayTime.value = 0.5;
delay.connect(gain1);

gain1.gain.value = 0.25;
gain1.connect(context.destination);

oscillator2.type = "sine";
oscillator2.frequency.value = 20;
oscillator2.start();
oscillator2.connect(gain2);

gain2.gain.value = 0.005;
gain2.connect(delay.delayTime);

context.resume();
context.processTo("00:00:10.000");

const audioData = context.exportAsAudioData();

let player = new Player(LAA, {
    normalization: true
});
let link = './public/yamaha-' + Date.now() + '-.wav';
// let file = fs.createWriteStream('./public/' + link);

// context.encodeAudioData(audioData).then((arrayBuffer) => {
//     fs.writeFile('./public/f.wav', new Buffer(arrayBuffer), (err) => {
//         if (err) throw err;
//         console.log('Archivo guardado!');
//     });
// });

player.load(fs.readFileSync('./public/' + arch), function(err, result) {
    if (err) return console.log(err);
    context.encodeAudioData(audioData).then((arrayBuffer) => {
        fs.writeFileSync(link, new Buffer(WAV(result, {
            sampleRate: 49700,
            bitDepth: 16,
            channels: 2
        })));
        console.log('done!');
    });
});

// let encoder = new lame.Encoder({
//     // Input/Entrada
//     channels: 2, // 2 channels (left and right)
//     bitDepth: 16, // 16-bit samples
//     sampleRate: 49700 // 49,700 Hz sample rate
// });

// player.pipe(encoder);
// encoder.pipe(file);


// player.load(fs.readFileSync('./public/' + arch));

player.on('normalization', function(perc) {
    console.log('Normalization ' + perc + '%');
});

player.on('gain', function(gain) {
    console.log('Normalization gain x' + (Math.floor(gain * 2) / 30));
});
player.on('progress', function(value) {
    console.log('Progreso: ' + value + '%');
});