var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('newMessage', function(message) {
    console.log('new message: ', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    
    if (jQuery('[name=message').val().length > 0) {
        socket.emit('createMessage', {
            from: 'User',
            text: jQuery('[name=message]').val()
        }, function(data) {
            console.log('Message sent', data);
        });
    } else {
        alert('Please enter a message');
    }
    
    this.reset();
});

var locationButton = jQuery('#sendLocation');

locationButton.on('click', function(e) {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        console.log('position: ', position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function(data) {
            console.log(data);
        });
    }, function() {
        alert('Unable to fetch location');
    });
});

socket.on('newLocationMessage', function(newLocationMessage) {
    var li = jQuery('<li></li>');
    let a = jQuery(`<a target="_blank">My current location</a>`);
    
    li.text(`${newLocationMessage.from} `);
    a.attr('href', newLocationMessage.url);
    li.append(a);
    jQuery('#messages').append(li);
});

socket.on('disconnect', function() {
    console.log('Disconnected from server')
});