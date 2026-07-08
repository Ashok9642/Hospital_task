const { fork } = require('child_process');
const child = fork('./child.js');
child.send({ name: 'Ashokkk', age: 25 });
child.on('message', (msg) => {
  console.log('Parent Received', msg);
});
