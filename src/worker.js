const { parentPort } = require('worker_threads');

const list = []

parentPort.once('message', (message) => {

    for (let i = 1; i <= 1000000; i++ ) {
        list.push(i);
    }

    parentPort.postMessage({ payload: message, list });
})