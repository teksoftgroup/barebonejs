(function(module){
    'use strict';
    
    function ajax(verb, url, data, type, headers) {
        var promise = new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            var responseType = type || 'json';

            xhr.onload = () => {
                if (xhr.status === 200 && xhr.readyState === 4)
                {
                    if(responseType == 'json')
                        resolve(xhr.responseText);
                    else
                        resolve(xhr.responseXML);
                }
                else
                    reject(Error(xhr.statusText));
            };

            xhr.onerror = () => {
                reject(Error("Network Error"));
            };

            xhr.open(verb, url);

            for(var key in headers){
                xhr.setRequestHeader(key, headers[key]);
            }

            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            xhr.send(data);
        });

        return promise;
    }

    module.get = function(url){
        return ajax('GET', url); 
    };

    module.post = function(url, data){
        return ajax('POST', url, data);
    };

    module.http = function(config){
        return ajax(config.verb, config.url, config.data, config.type, config.headers);
    }

    return module;
})(window.pajax = window.pajax || {})