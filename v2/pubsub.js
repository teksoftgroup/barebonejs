
export default pubsub = {
    events: {},
    on: function(eventName, callback){
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(callback);
    },
    off: function(eventName, callback){
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === callback) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    }

}