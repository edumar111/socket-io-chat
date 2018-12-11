const { io } = require('../server');
const { Users } = require('../classes/users')
const users = new Users();
io.on('connection', (client) => {

    console.log('Usuario conectado');
    // Escuchar el cliente
    client.on('loginchat', (user, callback) => {
        if (!user.name) {
            return callback({
                error: true,
                message: 'el nombre es necesario'
            })
        }
        console.log(user);
        let persons = users.addPerson(client.id, user.name);

        client.broadcast.emit('listPerson', users.getAllPerson());

        return callback(persons);
    });


    client.on('disconnect', () => {
        console.log('Usuario desconectado');
        let personRemove = users.removePerson(client.id);
        client.broadcast.emit('createMessage', { user: 'Administrador', message: `${personRemove.name} abandonó el chat` });
        client.broadcast.emit('listPerson', users.getAllPerson());
    });



});