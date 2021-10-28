//simulate IPC response
const { ipcMain } = require('electron');
const { create: createControlWindow } = require('./windows/control');
const { send: sendMainWindow } = require('./windows/main');

module.exports = function () {
	ipcMain.handle('login', async () => {
		//create a random code first
		let code = Math.floor(Math.random() * (999999 - 100000)) + 100000;
		return code;
	}); // end of ipcMain.handle

	//response to control event
	ipcMain.on('control', async (e, remoteCode) => {
		// 这里是跟服务端的交互，成功后我们会唤起面板
		createControlWindow();
		//tell the server that the control window is created
		sendMainWindow('control-state-change', remoteCode, 1);
	});
}; // end of module.exports
