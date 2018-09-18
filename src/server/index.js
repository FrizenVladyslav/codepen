var app = require('http').createServer();
var io = require('socket.io')(app);

app.listen(3333);

io.on('connection', function (socket) {
	console.log('connected');

	socket.on('JOIN_ROOM', (room) => {
		socket.join(room);//Подкл к комнате
	});
	
	socket.on('CHANGE_CLIENT', function (data) {
		console.log(data);
		
		socket.broadcast.to(data.room).emit('CHANGE_SERVER', data.code); //broadcast, emit - только без отправки самому себе

	});
});