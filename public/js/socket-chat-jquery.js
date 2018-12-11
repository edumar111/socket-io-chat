//funciones para renderizar user
var params = new URLSearchParams(window.location.search);
var divUsers = $('#divUsers');
var formSend = $('#formSend');
var txtMessage = $('#txtMessage');
var room = params.get('room');
var divChatbox = $('#divChatbox');

//=======render==================================//
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

function renderMessages(data, origin) {
    var html = '';
    var date = new Date(data.date);
    var hour = date.getHours() + ':' + date.getMinutes();
    var adminClass = 'info';
    if (data.name === 'Admin') {
        adminClass = 'danger';
    }
    if (origin) {
        html += '<li class="reverse">'
        html += '    <div class="chat-content">'
        html += '        <h5>' + data.name + '</h5>'
        html += '        <div class="box bg-light-inverse">' + data.message + '</div>'
        html += '    </div>'
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>'
        html += '   <div class="chat-time">' + hour + '</div>'
        html += '</li>'
    } else {
        html += '<li class="animated fadeIn">'
        if (data.name !== 'Admin') {
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
        }

        html += '<div class="chat-content">'
        html += '<h5>' + data.name + '</h5>'
        html += '<div class="box bg-light-' + adminClass + '">' + data.message + '</div>'
        html += '</div>'
        html += '<div class="chat-time">' + hour + '</div>'
        html += '</li>'
    }

    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}
//=========actions=================================//

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
        renderMessages(message, true);
        scrollBottom();
    });
});