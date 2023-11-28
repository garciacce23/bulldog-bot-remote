import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

import MovementPad from './component/MovementPad';

const socket = io('http://129.8.203.113:3000');

const App: React.FC = () => {
  const handleDirectionClick = (direction: string) => {
    console.log(`Direction clicked: ${direction}`);
    socket.emit('keypress', direction);
  };

  return (
    <div>
      <h1>Control Pad</h1>
      <MovementPad onDirectionClick={handleDirectionClick} />
    </div>
  );
}

export default App;