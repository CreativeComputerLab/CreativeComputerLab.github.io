(function(ext) {
 	console.log("Loading iiConnect2Scratch extension...");
	var dataURL = 'ws://127.0.0.1:8181/';

    var ws = null;
    var wiiArray = new Array (20);
    var balBoardArray = new Array (3);
	
	var wsOnmessage = function (evt) {
	   var wiimoteData = JSON.parse(evt.data);
	   if ( wiimoteData.deviceType == "Wiimote")
	   {
			wiiArray[wiimoteData.devNum] = wiimoteData;
	   }
	   if ( wiimoteData.deviceType == "BalanceBoard")
	   {
			balBoardArray[wiimoteData.devNum] = wiimoteData;
	   }
	};
	
	// Cleanup function when the extension is unloaded
	ext._shutdown = function() { if (ws.socket.connected) {ws.socket.disconnect();}};

	// Status reporting code
	// Use this to report missing hardware, plugin or unsupported browser
	ext._getStatus = function() {
		if (ws.readyState == 1) {
			return {status: 2, msg: 'Connected'};
		}else	{return {status: 1, msg: 'Not connected'};}
	};
   
	//-- Wii Accelerator Data X,Y,Z -------------
	ext.getAccel = function (coordXYZ, wiimote) {
		var wiiNum = wiimote.replace(/[^0-9]/g,'');
		switch (coordXYZ) {
			case 'x' : return wiiArray[wiiNum].accelX.toFixed(4);
			case 'y' : return wiiArray[wiiNum].accelY.toFixed(4);
			case 'z' : return wiiArray[wiiNum].accelZ.toFixed(4);
		}
	}
	
	//-- Wii Buttons EVENTS-------------
	ext.wmoteButtonPress = function (button, wiimote) {
		var wiiNum = wiimote.replace(/[^0-9]/g,'');
		switch (button) {
			case 'A' : return wiiArray[wiiNum].btnA; 
			case 'B' : return wiiArray[wiiNum].btnB; 
			case '-' : return wiiArray[wiiNum].btnMinus; 
			case 'home' : return wiiArray[wiiNum].btnHome; 
			case '+' : return wiiArray[wiiNum].btnPlus; 
			case '1' : return wiiArray[wiiNum].btnOne; 
			case '2' : return wiiArray[wiiNum].btnTwo; 
			case 'up' : return wiiArray[wiiNum].btnUp; 
			case 'down' : return wiiArray[wiiNum].btnDown; 
			case 'left' : return wiiArray[wiiNum].btnLeft; 
			case 'right' : return wiiArray[wiiNum].btnRight; 
		}
	} 
	
	//-- Wii Buttons EVENTS-------------
	ext.wmoteButtonPress1 = function (button, wiimote) {
		var wiiNum = wiimote.replace(/[^0-9]/g,'');
		switch (button) {
			case 'A' : return wiiArray[wiiNum].btnA; 
			case 'B' : return wiiArray[wiiNum].btnB; 
			case '-' : return wiiArray[wiiNum].btnMinus; 
			case 'home' : return wiiArray[wiiNum].btnHome; 
			case '+' : return wiiArray[wiiNum].btnPlus; 
			case '1' : return wiiArray[wiiNum].btnOne; 
			case '2' : return wiiArray[wiiNum].btnTwo; 
			case 'up' : return wiiArray[wiiNum].btnUp; 
			case 'down' : return wiiArray[wiiNum].btnDown; 
			case 'left' : return wiiArray[wiiNum].btnLeft; 
			case 'right' : return wiiArray[wiiNum].btnRight; 
		}
	} 

	//-- Wii LEDs -------------
	ext.setLED = function (state, light, wiimote) {
		var wiiNum = wiimote.replace(/[^0-9]/g,'');
		var thisState;
		if (state == 'on')
			thisState = "true";
		else
			thisState = "false";

		var request = {
				request: "setLED",
				deviceType : "Wiimote",
				devNum : wiiNum,
				state : thisState,
				LED : light
			};
		ws.send( JSON.stringify(request));
	}

	//-- Wii Rumble -------------
	ext.setRumble = function (state, wiimote) {
		var wiiNum = wiimote.replace(/[^0-9]/g,'');
		var thisState;
		if (state == 'on')
			thisState = "true";
		else
			thisState = "false";

		var request = {
				request: "setRumble",
				deviceType : "Wiimote",
				devNum : wiiNum,
				state : thisState,
				LED : 0
			};	 
		ws.send( JSON.stringify(request));
	}
	
	ext.wiimoteBatteryState = function (wiimote) {
		var wiiNum = wiimote.replace(/[^0-9]/g,'');
		return wiiArray[wiiNum].battery;
	}
	
		//-- Nunchuck Buttons -------------
	ext.nunchuckButtonPress = function (button, wiimote) {
		var wiiNum = wiimote.replace(/[^0-9]/g,'');
		switch (button) {
			case 'C' : return wiiArray[wiiNum].nunchuck.btnC; 
			case 'Z' : return wiiArray[wiiNum].nunchuck.btnZ; 
		}
	} 
	
	//-- Nunchuck Buttons -------------
	ext.nunchuckButtonPress1 = function (button, wiimote) {
		var wiiNum = wiimote.replace(/[^0-9]/g,'');
		switch (button) {
			case 'C' : return wiiArray[wiiNum].nunchuck.btnC; 
			case 'Z' : return wiiArray[wiiNum].nunchuck.btnZ; 
		}
	} 
	
	//-- Nunchuck Accelerator Data X,Y,Z -------------
	ext.nGetAccel = function (coordXYZ, wiimote) {
		var wiiNum = wiimote.replace(/[^0-9]/g,'');
		switch (coordXYZ) {
			case 'x' : return wiiArray[wiiNum].nunchuck.accelX.toFixed(4);
			case 'y' : return wiiArray[wiiNum].nunchuck.accelY.toFixed(4);
			case 'z' : return wiiArray[wiiNum].nunchuck.accelZ.toFixed(4);
		}
	}

	//-- Nunchuck Joystick Data X,Y -------------
	ext.getJoy = function (coordXY, wiimote) {
		var wiiNum = wiimote.replace(/[^0-9]/g,'');
		switch (coordXY) {
			case 'x' : return wiiArray[wiiNum].nunchuck.joyX.toFixed(4);
			case 'y' : return wiiArray[wiiNum].nunchuck.joyY.toFixed(4);
		}
	};
	
	//Balance Board Functions
	ext.getTopLeft = function (board) {
		var boardNum = board.replace(/[^0-9]/g,'');
		return balBoardArray[boardNum].topLeft.toFixed(4);
	}
	
	ext.getTopRight = function (board) {
		var boardNum = board.replace(/[^0-9]/g,'');
		return balBoardArray[boardNum].topRight.toFixed(4);
	}

	ext.getBottomLeft = function (board) {
		var boardNum = board.replace(/[^0-9]/g,'');
		return balBoardArray[boardNum].btmLeft.toFixed(4);
	}
	
	ext.getBottomRight = function (board) {
		var boardNum = board.replace(/[^0-9]/g,'');
		return balBoardArray[boardNum].btmRight.toFixed(4);
	}

	ext.setBbLED = function (board, state) {
		var deviceNum = board.replace(/[^0-9]/g,'');
		var thisState;
		if (state == 'on')
			thisState = "true";
		else
			thisState = "false";

		var request = {
				request: "setLED",
				deviceType : "BalanceBoard",
				devNum : deviceNum,
				state : thisState,
				LED : 1
			};
		ws.send( JSON.stringify(request));
	}
	ext.bBoardBatteryState = function (board) {
		var boardNum = board.replace(/[^0-9]/g,'');
		return balBoardArray[boardNum].battery;
	}
	
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
	}
	
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
			// Block type, block name, function name
			//Wiimote
			['r', 'button %m.button on %m.wiimote', 'wmoteButtonPress1', 'A', 'wiimote 1'], 
			[' ', 'turn %m.state light %m.light on %m.wiimote', 'setLED', 'off', '1', 'wiimote 1'], 
			[' ', 'turn rumble %m.state on %m.wiimote', 'setRumble', 'off', 'wiimote 1'], 
			['r', 'accel %m.coordXYZ on %m.wiimote', 'getAccel', 'x', 'wiimote 1'], 
			['h', 'When button %m.button pressed on %m.wiimote', 'wmoteButtonPress', 'A', 'wiimote 1'],
			['r', '%m.wiimote battery', 'wiimoteBatteryState', 'wiimote 1'], 
			//Nunchuck
			['r', 'nunchuck button %m.nButton pressed on %m.wiimote', 'nunchuckButtonPress1', 'C', 'wiimote 1'],
			['r', 'nunchuck accel %m.coordXYZ on %m.wiimote', 'nGetAccel', 'x', 'wiimote 1'], 
			['r', 'nunchuck joystick  %m.coordXY on %m.wiimote', 'getJoy', 'x', 'wiimote 1'], 
			['h', 'When nunchuck button %m.nButton pressed on %m.wiimote', 'nunchuckButtonPress', 'C', 'wiimote 1'],
			//BalanceBoard
			['r', 'topLeft %m.board', 'getTopLeft', 'balanceBoard 1'],
			['r', 'topRight %m.board', 'getTopRight', 'balanceBoard 1'],
			['r', 'bottomLeft %m.board', 'getBottomLeft', 'balanceBoard 1'],
			['r', 'bottomRight %m.board', 'getBottomRight', 'balanceBoard 1'],
			[' ', 'turn %m.board light %m.state', 'setBbLED', 'balanceBoard 1', 'off'],
			['r', '%m.board battery', 'bBoardBatteryState', 'balanceBoard 1'], 
			//Connection			
			[' ', 'connect to wii', 'Connect'],
			[' ', 'disconnect from wii', 'Disconnect']
		],
        menus: {
            wiimote: ['wiimote 1', 'wiimote 2'],
			button: ['A', 'B', '-', 'home', '+', '1', '2', 'up', 'down', 'left', 'right'],
			light: ['1', '2', '3', '4'],
			coordXYZ: ['x', 'y', 'z'],
			state: ['on', 'off'],
			//Nunchuck
			coordXY: ['x', 'y'],
			nButton: ['C', 'Z'],
			//BalanceBoard
			board: ['balanceBoard 1', 'balanceBoard 2'],


        },
	url: 'http://creativecomputerlab.com/iiConnect2Scratch.html'
    };	

	// Register the extension
	ScratchExtensions.register('iiConnect2Scratch', descriptor, ext);

})({});

