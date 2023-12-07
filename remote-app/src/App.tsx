import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import MovementPad from './component/MovementPad';
import { Socket } from 'socket.io-client';
import Joystick from './component/Joystick';


const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    fetch('/get-ip')
      .then(response => response.json())
      .then(data => {
        const newSocket = io(`http://${data.ip}:3000`);
        newSocket.on('connect', () => console.log('Connected to server'));
        setSocket(newSocket);
      })
      .catch(error => {
        console.error('Error fetching IP:', error);
      });
}, []);

  
  const handleJoystickMove = (angle: number, force: number) => {
    console.log(`Joystick Angle: ${angle}, Force: ${force}`); // Confirm event data
    let direction = '';

    if (force === 0) {
        direction = 'k'; // 'center'; // No movement
    } else if (angle >= 22.5 && angle < 67.5) {
        direction = 'o'; //'up-right';
    } else if (angle >= 67.5 && angle < 112.5) {
        direction = 'i'; // 'up';
    } else if (angle >= 112.5 && angle < 157.5) {
        direction = 'u'; //'up-left';
    } else if (angle >= 157.5 && angle < 202.5) {
        direction = 'j' //'left';
    } else if (angle >= 202.5 && angle < 247.5) {
        direction = 'm'; //'down-left';
    } else if (angle >= 247.5 && angle < 292.5) {
        direction = 'comma'; //'down';
    } else if (angle >= 292.5 && angle < 337.5) {
        direction = 'period'; //'down-right';
    } else {
        direction = 'l'; //right
    }

    // Assuming you have a socket instance
    if (socket) {
      console.log(`Direction clicked: ${direction}`);
      socket.emit('keypress', direction);
    } else {
      console.log("Socket not initialized");
    }
};


  const handleDirectionClick = (direction: string) => {
    if (socket) {
      console.log(`Direction clicked: ${direction}`);
      socket.emit('keypress', direction);
    } else {
      console.log("Socket not initialized");
    }
  };

  return (
    <div>
      {/* <h1>Control Pad</h1>
      <MovementPad onDirectionClick={handleDirectionClick} /> */}

      <h1>Joystick</h1>
      <Joystick onJoystickMove={handleJoystickMove} />
    </div>
  );
};

export default App;
