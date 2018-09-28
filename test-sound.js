const lame = require('lame');
const fs = require("fs");
const AudioContext = require("web-audio-engine").RenderingAudioContext;
const context = new AudioContext();
const wae = require("web-audio-engine");
const audioData = context.exportAsAudioData();

const encoder = new lame.Encoder({
    // input
    channels: 2, // 2 channels (left and right)
    bitDepth: 16, // 16-bit samples
    sampleRate: 44100, // 44,100 Hz sample rate

    // output
    bitRate: 128,
    outSampleRate: 22050,
    mode: lame.STEREO // STEREO (default), JOINTSTEREO, DUALCHANNEL or MONO
});

wae.encoder.set("mp3", encoder);

jugador.load(fs.readFileSync('./public/chords-1538053321666-.mid'));
jugador.on('progress', function(value) {
    console.log('Progreso: ' + value + '%');
});

context.encodeAudioData(audioData, wae).then((arrayBuffer) => {
    fs.writeFile("output.mp3", new Buffer(arrayBuffer), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});