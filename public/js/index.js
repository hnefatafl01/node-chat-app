var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    let messageTextbox = jQuery('[name=message]');

    if (messageTextbox.length > 0) {
        socket.emit('createMessage', {
            from: 'User',
            text: messageTextbox.val()
        }, function(data) {
            messageTextbox.val('');
        });
    } else {
        alert('Please enter a message');
    }
});

var locationButton = jQuery('#sendLocation');

locationButton.on('click', function(e) {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});

socket.on('newLocationMessage', function(newLocationMessage) {
    var formattedTime = moment(newLocationMessage.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: newLocationMessage.from,
        url: newLocationMessage.url
    });

    jQuery('#messages').append(html);
});

socket.on('disconnect', function() {
    console.log('Disconnected from server')
});