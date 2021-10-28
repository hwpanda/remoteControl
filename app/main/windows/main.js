const { BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

let win;

function create() {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			//below 2 lines solve the problem of React not working in Electron
			enableRemoteModule: true,
			contextIsolation: false,
		},
	});

	if (isDev) {
		// load the react html file into the window
		win.loadURL('http://localhost:3000');
	} else {
		win.loadFile(
			path.resolve(__dirname, '../../renderer/pages/control/index.html')
		);
	}
}

function send(channel, ...args) {
	win.webContents.send(channel, ...args);
}

module.exports = { create, send };
