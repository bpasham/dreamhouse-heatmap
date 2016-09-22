console.log("initializing socket");
var socket = io.connect("https://dreamhouse-kafka-consumer-ws.herokuapp.com");
console.log("connected");

export let listen = () => {};

export let on = (topic, callback) => socket.on(topic, callback);