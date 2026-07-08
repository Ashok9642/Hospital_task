process.on('message', (msg) => {
  console.log('Child Received', msg);
  process.send({ age: 20 });
});
