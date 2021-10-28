const { app, BrowserWindow } = require('electron');
const path = require('path');
const handleIPC = require('./ipc');
const { create: createMainWindow } = require('./windows/main');
const { create: createControlWindow } = require('./windows/control');

app.on('ready', () => {
	createControlWindow();
	//createMainWindow();
	handleIPC();
	//robotjs only runs in main process
	require('./robot.js')();
});
app.allowRendererProcessReuse = false;
