const { Worker } = require('worker_threads');
const worker = new Worker('./worker.js');
worker.on('message', (result) => {
  console.log('result', result);
});
console.log('Main threading running');
