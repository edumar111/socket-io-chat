//funciones para renderizar user
var params = new URLSearchParams(window.location.search);
var divUsers = $('#divUsers');

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

divUsers.on('click', 'a', function() {
    var id = $(this).data('id');
    if (id) {
        console.log(id)
    }
})