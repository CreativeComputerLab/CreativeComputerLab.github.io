(function(ext) {
 	console.log("Loading Mantis Scratch extension version 1.0...");
	var dataURL = 'ws://127.0.0.1:30061/scratch/';
    var ws = null;	
    var mantisData = null;
	
	var wsOnmessage = function (evt) {
	   //console.log("raw data");
	   //console.log(evt.data);
	   mantisData = JSON.parse(evt.data);
	   //console.log("Json Parsed data");
		//console.log(mantisData);
	};
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() { if (ws.socket.connected) {ws.socket.disconnect();}};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function()  {
		if (ws.readyState == 1) {
			return {status: 2, msg: 'Connected'};
		}else	{return {status: 1, msg: 'Not connected'};}
	};
	
	ext.getAmbTemp = function () {
		return mantisData.TempC;
	};
	
	ext.getSurfTemp = function () {
		return mantisData.SI7020_Temp;
	};
	
	ext.getHumidity = function () {
		return mantisData.SI7020_Hum;
	};
	
	ext.getPressure = function () {
		return mantisData.BarPressure;
	};

	ext.getDewPoint = function () {
		return 0;
	};
	
	ext.getLight = function () {
		console.log(mantisData.AmbLight);
		return mantisData.AmbLight;
	};
	
    //Connection
	ext.Connect = function () {
		/* first time connecton */
		if (ws === null) {
			console.log("connecting to server");
			ws = new WebSocket(dataURL);
			ws.onmessage = wsOnmessage;
			console.log(ws);
		} else if (!(ws.readyState == 1)) {
			console.log("connecting to server");
			ws = new WebSocket(dataURL);
			ws.onmessage = wsOnmessage;
			console.log(ws);
		} else { console.log ("Connect: socket already connected");}
	};
	
	ext.Disconnect = function (callback) {
		if (!(ws === null)) {		
			if (ws.readyState == 1) {
				console.log("disconnecting from server");
				ws.close();
			} else { console.log ("Disconnect: socket already disconnected");}
		}
	};	   

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name, param1 default value, param2 default value
            ['r', 'ambient temperature', 'getAmbTemp'],
			['r', 'surface temperature', 'getSurfTemp'],
            ['r', 'humidity', 'getHumidity'],
            ['r', 'pressure', 'getPressure'],
            ['r', 'dew point', 'getDewPoint'],
            ['r', 'ambient light', 'getLight'],
 			//Connection			
			[' ', 'connect to Mantis', 'Connect'],
			[' ', 'disconnect from Mantis', 'Disconnect']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Mantis', descriptor, ext);
})({});
