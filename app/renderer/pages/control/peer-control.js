// p2p control logic
const EventEmitter = require('events');
//import { EventEmitter } from 'events';
const peer = new EventEmitter();

//below should be peer-puppet code
const { ipcRenderer, desktopCapturer } = require('electron');

// siumlate desktop capture
async function getScreenStream() {
	const sources = await desktopCapturer.getSources({ types: ['screen'] });
	//webRTC getusermedia, returns a call back
	navigator.webkitGetUserMedia(
		{
			audio: false,
			video: {
				mandatory: {
					chromeMediaSource: 'desktop',
					chromeMediaSourceId: sources[0].id,
					maxWidth: window.screen.width,
					maxHeight: window.screen.height,
				},
			},
		},
		(stream) => {
			peer.emit('add-stream', stream);
		},
		(err) => {
			//handle err
			console.error(err);
		}
	);
}

getScreenStream();

peer.on('robot', (type, data) => {
	console.log('robot', type, data);
	if (type === 'mouse') {
		data.screen = {
			width: window.screen.width,
			height: window.screen.height,
		};
	}
	setTimeout(() => {
		ipcRenderer.send('robot', type, data);
	}, 2000);
});

module.exports = peer;
