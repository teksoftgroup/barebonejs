const Http =  require('../../v2/http');

describe('calling placeholder server should return data', () => { 

    test('call to get one result', async () => {

        // Arrange
        const http = new Http();
        const fetchMock = jest
            .spyOn(http, 'get')
            .mockImplementation(() =>
                Promise.resolve({ result: [] })
            );

        // Act
        let result = await http.get('https://jsonplaceholder.typicode.com/posts')
        
        // Assert
        expect(fetchMock).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
        console.log(result);
        expect(Array.isArray(result)).toEqual(true)
        expect(result.length).toEqual(0)

    });
 });