var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name')) {
    window.location = 'index.html';
    throw new Error('El nombre de usuario es necesario');
}

var user = {
    name: params.get('name')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('loginchat', user, function(res) {
        console.log('usuarios conectados', res);
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'eduardo',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('createMessage', function(res) {

    console.log('Servidor:', res.message);
});
//escucha cuando un usuario entra o sale del chat

socket.on('listPerson', function(persons) {

    console.log(persons);
});