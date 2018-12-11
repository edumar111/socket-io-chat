//funciones para renderizar user
var params = new URLSearchParams(window.location.search);
var divUsers = $('#divUsers');
var formSend = $('#formSend');
var txtMessage = $('#txtMessage');
var room = params.get('room');
var divChatbox = $('#divChatbox');

function renderUsers(person) {
    console.log(person);
    var html = '';
    html += '<li>'
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('room') + '</span></a>'
    html += '</li>'

    for (var i = 0; i < person.length; i++) {
        html += '<li>'
        html += '<a data-id="' + person[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + person[i].name + ' <small class="text-success">online</small></span></a>'
        html += '</li>'
    }
    divUsers.html(html);
}

function renderMessages(data) {
    var html = '';
    html += '<li class="animated fadeIn">'
    html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
    html += '<div class="chat-content">'
    html += '<h5>' + data.name + '</h5>'
    html += '<div class="box bg-light-info">' + data.message + '</div>'
    html += '</div>'
    html += '<div class="chat-time">10:56 am</div>'
    html += '</li>'
    divChatbox.append(html);
}

divUsers.on('click', 'a', function() {
    var id = $(this).data('id');
    if (id) {
        console.log(id)
    }
})

formSend.on('submit', function(e) {
    e.preventDefault();
    if (txtMessage.val().trim().length === 0) {
        return
    }
    // Enviar información
    socket.emit('createMessage', {
        message: txtMessage.val().trim()
    }, function(message) {
        txtMessage.val('').focus();
        renderMessages(message);
    });
});