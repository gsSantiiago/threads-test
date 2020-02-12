const { Worker } = require('worker_threads')
const os = require('os')

const LEADING_ZEROES = 4
const final = []
let finishedWorkers = 0

const cpuCount = os.cpus().length

for (let i = 1; i <= cpuCount; i++ ) {

  const worker = new Worker('./src/worker.js', { env: { LEADING_ZEROES } })

  worker.once('message', (message) => {

    final.push(message);
    finishedWorkers++

    if (finishedWorkers === cpuCount) {
      console.log(final);
    }
  })

  worker.on('error', console.error)

  console.log(`Iniciando worker de ID ${worker.threadId} e enviando o payload "${i}"`)
  worker.postMessage(i)
}