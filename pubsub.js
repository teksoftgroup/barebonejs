(function (module) {
    'use strict';
    //events object
    var events = {};

    module.on = function (eventName, callback) {
        events[eventName] = events[eventName] || [];
        events[eventName].push(callback);
    };

    module.off = function (eventName, callback) {
        if (events[eventName]) {
            for (var i = 0; i < events[eventName].length; i++) {
                if (events[eventName][i] === callback) {
                    events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    }

    module.emit = function (eventName, data) {
        if (events[eventName]) {
            //loops through all the events 
            events[eventName].forEach(function (event) {
                event.cb(data);
            });
        }
    }

    return module;
})(window.pubsub = window.pubsub || {});