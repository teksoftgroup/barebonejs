class Session {

    constructor(id){
        this.id = id;
        this.clients = new Set;
    }

    join(client){
        if(client.session)
            throw new Error("Client is already in session");

        this.clients.add(client);
        client.session = this;
    }

    leave(client){
        if(client.session !== this)
            throw new Error(`Client is not in this session (${this.id})`);

        this.clients.delete(client);
        client.session = null;
    }
}

module.exports = Session;