
export default pubsub = {
    events: {},
    on: (eventName, callback) => {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(callback);
    },
    off:(eventName, callback) => {
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === callback) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    emit: (eventName, data) => {
        if (this.events[eventName]) {
            //loops through all the events 
            this.events[eventName].forEach(function (event) {
                event.cb(data);
            });
        }
    }
}