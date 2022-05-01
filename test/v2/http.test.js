const http =  require('../../v2/http');

describe('calling placeholder server should return data', () => { 
    test('call to get one result', () => {
        http.get('https://jsonplaceholder.typicode.com/todos/1')
        .then(result => expect(result).not.toBeNull());
    });
 });