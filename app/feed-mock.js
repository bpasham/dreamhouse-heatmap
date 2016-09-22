let properties,
    callbacks = [];

let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

let ping = () => {
    var timeout = getRandomNumber(200, 3000);
    setTimeout(() => {
        let index = getRandomNumber(0, properties.length - 1);
        let rndm = getRandomNumber(1,10);
        let eventType;
        if (rndm<6) {
            eventType = "view";
        } else if (rndm<8) {
            eventType = "favorite";
        } else {
            eventType = "appointment";
        }
        callbacks.forEach(callback => callback({propertyId: properties[index].id, eventType: eventType, date: new Date()}));
        ping();
    }, timeout);
};

export let on = (topic, callback) => {
    callbacks.push(callback);
};

export let listen = props => {
    properties = props;
    ping();
};

