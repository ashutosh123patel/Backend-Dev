console.log("start");

setTimeout(() => {
    console.log("setTimeout");
}, 0);

setImmediate(() => {
    console.log("setImmediate");
});

process.nextTick(() => {
    console.log("process.nextTick");
});

Promise.resolve().then(() => {
    console.log("promise");
});

console.log("end");
