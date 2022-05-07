const WebSockerServer = require('ws').Server;
const Session = require('./session');
const Client = require('./client');

const server = new WebSockerServer({post:9099});
const sessions = new Map;

const createId = (len = 6, chars = 'abcdefghijklmnopqrstuvwxyz') => {
    let id = '';

    while(len--){
        id += chars[Math.random() * chars.length | 0];
    }

    return id;
};

const createClient = (connection, id = createId()) => new Client(connection, id);

const createSession = (id = createId()) => {
    if(sessions.has(id))
        throw new Error(`Session with id (${id}) exists already`);
    
    const session = new Session(id);

    sessions.set(id, session);

    return session;
};

const getSession = (id) => sessions.get(id);

const broadcastSession = (session) => {
    const clients = [...session.clients];

    clients.forEach(client => {
        client.send({
            type:'session-broadcast',
            peers:{
                you: client.id,
                clients: clients.map(client => {
                    return {
                        id:client.id,
                        state: client.state
                    }
                })
            }
        })
    });
};

server.on('connection', connection => {
    const client = createClient(connection);

    connection.on('message', message => {
        const data = JSON.parse(message);
        let session = null;

        switch(data.type){
            case 'create-session':
                session = createSession();
                session.join(client);

                client.state = data.state;
                client.send({
                    type: 'session-created'
                });
            break;
            case 'join-session':
                session = getSession(data.id) || createSession(data.id);
                session.join(client);

                client.state = data.state;
                broadcastSession(session);
            break;
            case 'state-update': 
                const [key, value] = data.state;
                client.state[data.fragment][key] = value;
                client.broadcast(data);
            break;
        }
    });

    connection.on('close', () => {
        const session = client.session;

        if(session){
            session.leave(client);
            if(session.clients.size === 0){
                sessions.delete(session.id);
            }
        }

        broadcastSession(session);

    });

});