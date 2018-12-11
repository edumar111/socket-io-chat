const { io } = require('../server');
const { Users } = require('../classes/users')
const { createMessage } = require('../utils/utils')
const users = new Users();
io.on('connection', (client) => {

    console.log('Usuario conectado');
    // Escuchar el cliente
    client.on('loginchat', (user, callback) => {
        console.log(user)
        if (!user.name || !user.room) {
            return callback({
                error: true,
                message: 'el nombre y sala es necesario'
            })
        }

        //uniendo a una sala
        client.join(user.room);

        let persons = users.addPerson(client.id, user.name, user.room);

        client.broadcast.emit('listPerson', users.getAllPerson());

        return callback(persons);
    });
    //cuando un cliente envia un mensaje
    client.on('createMessage', (data) => {
        let person = users.getPerson(client.id);
        let message = createMessage(person.name, data.message);
        client.broadcast.emit('createMessage', message);
    });

    //cuando un cliente se desconecta
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
        let personRemove = users.removePerson(client.id);
        client.broadcast.emit('createMessage', createMessage('Admin', `${personRemove.name} salió`));
        client.broadcast.emit('listPerson', users.getAllPerson());
    });

    //escuchando message private
    client.on('messagePrivate', (data) => {
        let person = users.getPerson(client.id);
        client.broadcast.to(data.to).emit('messagePrivate', createMessage(person.name, data.message));
    });

});