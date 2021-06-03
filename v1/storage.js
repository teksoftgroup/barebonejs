(function (module) {
    'use strict';
    //private method
    //test if we have either localStorage OR sessionStorage
    function isWebAPIStorageSupported() {
        return isLocalStorageSupported() || isSessionStorageSupported();
    }

    function isLocalStorageSupported() {
        try {
            localStorage.setItem('pa', 'pa');
            localStorage.removeItem('pa');
            return true;
        } catch (e) {
            return false;
        }
    }

    function isSessionStorageSupported() {
        try {
            sessionStorage.setItem('pa', 'pa');
            sessionStorage.removeItem('pa');
            return true;
        } catch (e) {
            return false;
        }
    }

    //return the storage based on the type. Initially it will return the session storage        
    function getStorageType(type) {
        let storageType;

        if (!isWebAPIStorageSupported()) {
            storageType = cookieStorage;
        } else {
            if (type === undefined)
                storageType = sessionStorage; //session only last until the browser closes.
            else if (type.toUpperCase() === 'L')
                storageType = localStorage; //locals stays even after the browser closes.
        }

        //we should never reach this decision but just in case
        if (typeof storageType === 'undefined')
            storageType = cookieStorage;
        return storageType; //return the storage type
    }


     // fallback if localStorage/sessionStorage is not supported
     var cookieStorage = {
        getItem: function getItem(name) {
            //name,value,coo,kies <- get all the cookies
            var n, v, cookies = document.cookie.split(";");
            //loop through all the cookies
            for (var i = 0; i < cookies.length; i++) {
                //get the name before the equal sign
                n = (cookies[i].substr(0, cookies[i].indexOf("="))).trim();
                //get the value after the equal sign
                v = cookies[i].substr(cookies[i].indexOf("=") + 1);
                //if we have a match return the cookie value
                if (name === n) {
                    return unescape(v);
                }
            }
        },
        setItem: function setItem(name, value, options) {           
            options = options || {}; //set default option if not provided
            if (!value) {
                value = "";
                options.expires = -365;
            }
            else {
                value = escape(value);
            }            
            if (options.expires) {
                var d = new Date();
                d.setDate(d.getDate() + options.expires);
                value += "; expires=" + d.toUTCString();
            }
            if (options.domain) {
                value += "; domain=" + options.domain;
            }
            if (options.path) {
                value += "; path=" + options.path;
            }
            //and the actual cookie is set
            document.cookie = name + "=" + value;
        },
        removeItem: function removeItem(name) {
            this.set(name);//no value is passed so expire immediately
        },
        clear: function clear() {
            // name, cookies <- get all the cookies
            var n, cookies = document.cookie.split(";");
            //loop through all the cookies and expire every name found
            for (var i = 0; i < cookies.length; i++) {
                n = (cookies[i].substr(0, cookies[i].indexOf("="))).trim();
                this.set(n);
            }
        }
    };

    //public API for the storage service
    module.get = function (key, type) {
        return getStorageType(type).getItem(key);
    };
    module.set = function (key, data, type) {
        return getStorageType(type).setItem(key, data);
    };

    module.remove = function (key, type) {
        return getStorageType(type).removeItem(key);
    };

    module.clear = function (type) {
        return getStorageType(type).clear();
    };

    return module;
})(window.storage = widow.storage || {})