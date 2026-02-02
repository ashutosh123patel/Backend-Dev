// creating a read stream.
// const fs = require('fs');
// const readStream = fs.createReadStream('notes.txt', {
// encoding: 'utf8',
// highWaterMark: 64 * 1024 
// });
// readStream.on('data', (chunk) => {
// console.log('Received the chunk of data:', chunk.length, 'bytes');
// });
// readStream.on('end', () => {
// console.log('completed the reading of file');
// });

//write stream
// const fs = require('fs');
// const writeStream = fs.createWriteStream('fileSystem.txt');
// writeStream.write('Hai i am Ashutosh_Patel\n');
// writeStream.write('Hello Ashutosh\n');
// writeStream.write('How are you?\n');
// writeStream.write('hai i am a b.tech 3rd year student');
// writeStream.end(); 
// writeStream.on(' streamiing finish', () => {
// console.log('completed the writing of the file');
// });


//Transform Stream
// const fs = require("fs");
// const { Transform } = require("stream");

// const upperCaseTransform = new Transform({
//   transform(chunk, encoding, callback) {
//     const modifiedData = chunk.toString().toUpperCase();
//     this.push(modifiedData);
//     callback();
//   }
// });
// //pipe flow 
// fs.createReadStream("notes.txt")
//   .pipe(upperCaseTransform)
//   .pipe(fs.createWriteStream("fileSystem.txt"));




  //file copy using stream
  //input.txt esko output.txt may store karo

//File copy using stream.
const fs = require('fs');
const readStream = fs.createReadStream('notes.txt', {
encoding: 'utf8',
highWaterMark: 64 * 1024 
});
const writeStream = fs.createWriteStream('fileSystem.txt', {
encoding: 'utf8',
highWaterMark: 64 * 1024 
});
readStream.pipe(writeStream);