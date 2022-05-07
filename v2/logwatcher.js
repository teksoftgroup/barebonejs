export function logwatcher(obj){
    return new Proxy(obj, {
        get(target, key) {
            console.log('Accessed key', key);
            return Reflect.get(target, key);
        },
        set(target, key, value){
            console.log('Updated key', key, ' to ', value);
            Reflect.set(target, key, value);
        }
    })
}