import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
//import { ipcRenderer } from 'electron';
const { ipcRenderer } = window.require('electron');

function App() {
	const [remoteCode, setRemoteCode] = useState('');
	const [localCode, setLocalCode] = useState('');
	// 0: not connected, 1: controlling, 2: being controlled
	const [controlText, setControlText] = useState('');
	// login
	const login = async () => {
		let code = await ipcRenderer.invoke('login');
		setLocalCode(code);
	};
	//startControl
	const startControl = (remoteCode) => {
		// send request that we want to control the client with remoteCode
		ipcRenderer.send('control', remoteCode);
	};

	// handleControlState
	const handleControlState = (e, name, type) => {
		let text = '';
		if (type === '1') {
			text = `remotely controlling ${name}`;
		} else if (type === '2') {
			text = `being controlled by ${name}`;
		} else {
			text = '';
		}
		setControlText(text);
	};

	useEffect(() => {
		login();
		ipcRenderer.on('control-state-change', handleControlState);
		//remove event listener on unmount
		return () => {
			ipcRenderer.removeListener('control-state-change', handleControlState);
		};
	}, []);
	return (
		<div className='App'>
			{controlText === '' ? (
				<>
					<div>Your Local Code {localCode}</div>
					<input
						type='text'
						value={remoteCode}
						onChange={(e) => setRemoteCode(e.target.value)}
					/>
					<button
						onClick={() => {
							startControl(remoteCode);
						}}
					>
						confirm
					</button>
				</>
			) : (
				<div>{controlText}</div>
			)}
		</div>
	);
}

export default App;
