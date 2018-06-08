$(document).ready(function() {
    var socket = io.connect();
    socket.on('updated_message', function(form) {
        $('.card').append(`<div>You emitted the following information to the server: Name - ${form.name}, Dojo - ${form.dojo}, Favorite Language - ${form.language}, Comment - ${form.comment}</div><hr>`);
    });
    socket.on('random_number', function(number) {
        $('.card').append(`<div>Your lucky number emitted by the server is ${number.random}.</div>`);
    });
    $('form').submit(function(e){
        $('.card').html('');
        e.preventDefault();
        var data = $(this).serialize();
        console.log("data:", data);
        socket.emit("submit", data);
    });
});