import React from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import MainContent from './components/MainContent';
import { PlayerProvider } from './contexts/PlayerContext';

function App() {
  return (
    <PlayerProvider>
      <div className="h-screen bg-black">
        <Sidebar />
        <MainContent />
        <Player />
      </div>
    </PlayerProvider>
  );
}

export default App;