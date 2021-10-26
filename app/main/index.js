const { app, BrowserWindow } = require('electron');
//const isDev = require('electron-is-dev');
// const path = require('path');
// const handleIPC = require('./ipc');
// const {create: createWindow, show:showMainWindow, close:closeMainWindow} = require('./windows/main');
// const {create: createControlWindow} = require('./windows/control');
// const gotTheLock = app.requestSingleInstanceLock();

let win;
app.on('ready', () => {
	win = new BrowserWindow({
		width: 600,
		height: 300,
		webPreferences: {
			nodeIntegration: true,
			//below 2 lines solve the problem of React not working in Electron
			enableRemoteModule: true,
			contextIsolation: false,
		},
	});
	win.loadURL('http://localhost:3000');
	// if (isDev) {
	// 	// load the react html file into the window
	// 	win.loadURL('http://localhost:3000');
	// } else {
	// 	win.loadFile(
	// 		path.resolve(__dirname, '../../renderer/pages/main/index.html')
	// 	);
	// }

	// win.on('closed', ()=>{
	//     win = null;
	// });
});
