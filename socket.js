module.exports = function (server) {

    var io = require('socket.io').listen(server);
    io.sockets.on('connection', function (socket) {

        socket.on('new message', function (message) {
            var nm = emo(message.body);
            io.sockets.emit('message', {
                main: message.from + " : " + nm,
                from: message.from
            });
        });
        socket.on('join', function (user) {
            var mes = 'Welcome ' + user.name + ' ! <br />';
            var ou = 'Online Users : ';
            online.push(user.name);
            online.forEach(function (d) {
                ou += d + ", ";
            })
            io.sockets.emit('joined', mes + ou);
        });
        socket.on('leave', function (user) {
            online.splice(online.indexOf(user), 1);
            io.sockets.emit('left', user + ' left..');
        });
        socket.on('disconnect', function () {
            console.log('Disconnected Client..');

        });
    });
};