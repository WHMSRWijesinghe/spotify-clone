import React, { useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle } from 'lucide-react';
import { usePlayerContext } from '../contexts/PlayerContext';

const Player = () => {
  const { currentTrack, isPlaying, togglePlay, volume, setVolume } = usePlayerContext();
  const volumeBarRef = useRef<HTMLDivElement>(null);

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (volumeBarRef.current) {
      const rect = volumeBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const newVolume = Math.max(0, Math.min(1, x / width));
      setVolume(newVolume);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-95 text-white h-20 md:h-16 flex flex-col md:flex-row items-center justify-between px-4 border-t border-gray-800 z-50">
      <div className="flex items-center w-full md:w-1/3 justify-start">
        {currentTrack ? (
          <>
            <img
              src={currentTrack.imageUrl}
              alt={currentTrack.title}
              className="w-12 h-12 rounded"
            />
            <div className="ml-4 truncate">
              <div className="text-sm font-semibold">{currentTrack.title}</div>
              <div className="text-xs text-gray-400">{currentTrack.artist}</div>
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-400">No track selected</div>
        )}
      </div>

      <div className="flex flex-col items-center w-full md:w-1/3 my-2 md:my-0">
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition">
            <Shuffle className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <SkipBack className="w-5 h-5" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-black" />
            ) : (
              <Play className="w-5 h-5 text-black ml-1" />
            )}
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <SkipForward className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-white transition">
            <Repeat className="w-4 h-4" />
          </button>
        </div>
        <div className="w-full max-w-md flex items-center gap-2 mt-2">
          <span className="text-xs text-gray-400">0:00</span>
          <div className="h-1 flex-1 bg-gray-600 rounded-full">
            <div className="h-1 w-0 bg-white rounded-full"></div>
          </div>
          <span className="text-xs text-gray-400">0:00</span>
        </div>
      </div>

      <div className="flex items-center justify-end w-full md:w-1/3 gap-2">
        <button onClick={() => setVolume(volume > 0 ? 0 : 1)} className="text-gray-400 hover:text-white">
          {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <div 
          ref={volumeBarRef}
          onClick={handleVolumeClick}
          className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer"
        >
          <div 
            className="h-1 bg-white rounded-full transition-all"
            style={{ width: `${volume * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Player;