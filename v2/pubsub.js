
export function eventify(object){

    let eventListeners = new Map();
    
    Object.assign(object, {
        on, off, emit
    });

    function on(eventName, handler){
        let handlers = eventListeners.get(eventName);
        if(!handlers){
            handlers = new Set();
            eventListeners.set(eventName, handlers);
        }
        handlers.add(handler);
    }

    function off(eventName, handler){
        let handlers = eventListeners.get(eventName);
        if(!handlers)return;

        handlers.delete(handler);
    }

    function emit(eventName, ...args){
        let handlers = eventListeners.get(eventName);
        if(!handlers)return;
        handlers.forEach(handler => handler.apply(this, args));
    }
}