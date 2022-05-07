class Client {
    constructor(connection, id){
        this.connection = connection;
        this.id = id;
        this.session = null;
        this.state = {};//client state
    }

    broadcast(data){
        if(!this.session){
            throw new Error("Client can't broadcast without a session");
        }

        data.clientId = this.id;

        [...this.session.clients]
            .filter(client => client !== this)
            .forEach(client => client.send(data));
    }

    send(data){
        const message = JSON.stringify(data);

        this.connection.send(message,  (err) => {
            if(err)console.log(`Error sending message ${message}`, err);
        })
    }

}

module.exports = Client;