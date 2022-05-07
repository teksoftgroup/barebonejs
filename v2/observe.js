export function observe(obj, onChange){
        return new Proxy(obj, {
        set(target, key, value){
            Reflect.set(target, key, value);
            onChange({key, value});
        }
    })
}
