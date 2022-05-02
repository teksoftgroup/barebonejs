class Http {
    
    request(verb, url, data, headers, cachemode = 'default'){

        return fetch(url, {
            method: verb,
            headers: headers,
            cache: cachemode,
            mode: 'cors',
            body: JSON.stringify(data)
        });
    }

    get(url,headers = {}){
        return fetch(url, {
            method: 'GET',
            headers: headers,
            mode:'cors'
        });
    }

    post(url, headers = {}, data) {
        return fetch(url, {
            method: 'POST',
            headers: headers,
            mode: 'cors',
            body: JSON.stringify(data)
        })
    }

    upload(url, fileInputSelector = 'input[type="file"]'){
        const formData = new FormData();
        const fileField = document.querySelector(fileInputSelector);
        formData.append('file_to_upload', fileField.files[0]);

        return fetch(url, {
            method: 'PUT',
            body: formData
        });
    }

    uploadMany(url, fileInputSelector = 'input[type="file"][multiple]'){
        const formData = new FormData();
        const filesField = document.querySelector(fileInputSelector);

        for(let i = 0; i < filesField.files.length; i++){
            formData.append(`file_${i}`, filesField.files[i]);
        }

        return fetch(url, {
            method: 'POST',
            body: formData
        })
    }
}

module.exports = Http;
