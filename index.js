var confi 	= require('./confi.json');
var request 	= require('request');
var SerialPort 	= require('serialport');

var port = new SerialPort("/dev/ttyUSB0", {
	baudRate: 115200,
	parser: SerialPort.parsers.readline('\r\n')
});

port.on('data', function (data) {
	var valores = data.split('#');

	if ( valores[0] == "E" ) {
		console.log('conectado');
	} else {
		var losvalores = {};
		losvalores.concentracion = valores[0];
		losvalores.temperatura = valores[1];
		losvalores.fecha = new Date();
		console.log(losvalores);

		var options = {
        		url: confi.url,
        		auth: {
                		user: confi.usuario,
                		password: confi.contrasena
        		},
        		method: 'POST',
        		form: {
                		status: 'Concentración: '+ losvalores.concentracion +' ppm Temperatura: '+ losvalores.temperatura +' ºC'
        		}
		};

		request(options, function (err, res, body) {
        		if (err) {
                		console.dir(err)
        		}
		});

	}	

});
