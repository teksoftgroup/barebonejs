

(function(module){
    'use strict';
    let directives = {
        ':text': (el, value) => {
            el.innerText = value;
        },
        ':show': (el, value) => {
            el.style.display = value? 'block' : 'none';
        }
    };

    const handleError = (el, expression, error) => {
        
        Object.assign(error, {el, expression});
        throw error;
    };
    
    const tryCatch = (cb, {el, expression}) => {
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


    module.isReady = function(){
        return new Promise(resolve => {
            if(document.readyState == 'loading'){
                document.addEventListener("DOMContentLoaded", resolve)
            }
            else{
                resolve();
            }
        });
    };

    module.walk = function(el, callback){
        if(callback(el) === false) 
            return;

        let node = el.firstElementChild;

        while(node){
            this.scan(node, callback);
            node = node.nextElementSibling;
        }
    };


    module.eval = function(el, expression, dataContext, variables = {}){
        return tryCatch(() => {
            if(typeof(expression === 'function')){
                return expression.call(dataContext);
            }

            return (new Function(['$data', ...Object.keys(variables)], 
            `var __dom_result;with($data){ __dom_result = ${expression}}; return __dom_result;`))
            (dataContext, ...Object.value(variables));
        }, { el, expression });
    }; 

    return module;

})(window.dom = window.dom || {});