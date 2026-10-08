const fs = require('fs');
const readline = require('readline');

const readable = fs.createReadStream('errors.txt');
const writable = fs.createWriteStream('final.txt');

const rl = readline.createInterface({
    input: readable,
    crlfDelay: Infinity // Handles all line break formats (\n, \r\n)
});

rl.on('line', (line) => {
    // Check if the line contains the word "ERROR"
    if (line.includes('ERROR')) {
        writable.write(line + '\n');
    }
});

rl.on('close', () => {
    console.log('Finished filtering and writing errors!');
    writable.end();
});

writable.on('error', (err) => {
    console.error('An error occurred:', err);
});