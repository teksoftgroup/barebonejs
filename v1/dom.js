(function(module){
    
    let root = null;
    let data = null;


    let directives = {
        ':text': (el, value) => {
            el.innerText = value;
        },
        'x-text': (el, value) => {
            el.innerText = value;
        },
        ':show': (el, value) => {
            el.style.display = value? 'block' : 'none';
        },
        'x-show': (el, value) => {
            el.style.display = value? 'block' : 'none';
        }
    };

    function handleError (el, expression, error) {
        
        Object.assign(error, {el, expression});
        throw error;
    };
    
    function tryCatch(cb, {el, expression}) {
        try{
            const value = cb();
    
            return value instanceof Promise?
                value.catch(e => handleError(el, expression, e)):
                value;
        }
        catch(e){
            handleError(el, expression, e);
        }
    };

    function evaluate (el, expression, dataContext, variables = {}) {
        return tryCatch(() => {
            if(typeof(expression) === 'function'){
                return expression.call(dataContext);
            }

            return (
                new Function(
                        ['$$data', ...Object.keys(variables)], 
                        `var __dom_result;with($$data){ __dom_result = ${expression}}; return __dom_result;`
                )
            )
            (dataContext, ...Object.values(variables));
        }, { el, expression });
    }; 

    function compile(expression) {
        return eval(expression);
    };

    function walk(el, callback) {
        if(callback(el) === false) 
            return;

        let node = el.firstElementChild;

        while(node){
            walk(node, callback);
            node = node.nextElementSibling;
        }
    };

    function handle (cmd, el, value) {
        directives[cmd](el, value);
    };

    function init() {
        root = document.querySelector('[x-data]');
        let dataString = root.getAttribute('x-data');
        let rawData = compile(`(${dataString})`);

        data = observe(rawData);

        registerListeners();
        refresh();
    };


    function refresh()  {
        walk(root, el => {

            Array.from(el.attributes).forEach(attribute => {
                if(!Object.keys(directives).includes(attribute.name))
                    return;

                directives[attribute.name](el, compile(`with (data) {(${attribute.value})}`));   
                
            });
        });
    };

    function observe(data)  {
        return new Proxy(data, {
            set(target, key, value) {
                target[key] = value;
                refresh();
            }
        })
    };


    function registerListeners(){
        walk(root, el => {

            Array.from(el.attributes).forEach(attribute => {
                if(!attribute.name.startsWith('@')) 
                    return;
            
                let event = attribute.name.replace('@', '');

                el.addEventListener(event, () => {
                    compile(`with (data) {(${attribute.value})}`);
                });
            
            });
        });
    }

    function isReady () {
        return new Promise(resolve => {
            if(document.readyState == 'loading'){
                document.addEventListener("DOMContentLoaded", resolve)
            }
            else{
                resolve();
            }
        });
    };

    module.init = init;

    return module;

})(window.dom = window.dom || {});

window.dom.init();