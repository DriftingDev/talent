const kill = require('kill-port')
const { port } = require('./server')

kill(3004, 'tcp')
  .then(console.log)
  .catch(console.log)


