import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import MovementPad from './component/MovementPad';
import { Socket } from 'socket.io-client';


const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    fetch('/get-ip')
      .then(response => response.json())
      .then(data => {
        const newSocket = io(`http://${data.ip}:3000`);
        setSocket(newSocket);
      })
      .catch(error => {
        console.error('Error fetching IP:', error);
      });
  }, []);
  
  

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
      <h1>Control Pad</h1>
      <MovementPad onDirectionClick={handleDirectionClick} />
    </div>
  );
};

export default App;
