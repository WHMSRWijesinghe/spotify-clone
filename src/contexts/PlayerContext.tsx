import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  imageUrl: string;
}

interface PlayerContextType {
  currentTrack: Track | null;
  setCurrentTrack: (track: Track) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const togglePlay = () => setIsPlaying(prev => !prev);

  return (
    <PlayerContext.Provider 
      value={{ 
        currentTrack, 
        setCurrentTrack, 
        isPlaying, 
        togglePlay,
        volume,
        setVolume
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};