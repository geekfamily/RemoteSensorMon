module.exports.arduinoconnect = function (socketio) {

    var arduino = require('duino'),
        board = new arduino.Board(),
        led,
        pir;

	board.on('ready', function(){
		console.log('board ready');

        led = new arduino.Led({
            board: board,
            pin: 13
        });

        pir = new arduino.PIR({
            board: board,
            pin: 2
        });

		pir.on('calibrated', function(err, data){
			console.log('pir calibrated');  
			pir.on('motionstart', function(err, data){
                socketio.emit('send:webmotionstart', { data: data });
			}); 
			pir.on('motionend', function(err, data){
                socketio.emit('send:webmotionend', { data: data });
			});  
		});

	});

    socketio.on('connection', function(socket){
        socket.on('send:ledevent', function (data) {
            if (data.led=="on"){
                led.on();
            }else{
                led.off();
            }
        });
    });

};