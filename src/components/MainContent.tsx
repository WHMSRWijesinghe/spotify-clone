import React, { useState } from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { usePlayerContext } from '../contexts/PlayerContext';

const MainContent = () => {
  const { setCurrentTrack, currentTrack, isPlaying, togglePlay } = usePlayerContext();
  const [likedPlaylists, setLikedPlaylists] = useState<Set<number>>(new Set());

  const featuredPlaylists = [
    {
      id: 1,
      title: "Today's Top Hits",
      description: "Jung Kook is on top of the Hottest 50!",
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      artist: "Various Artists"
    },
    {
      id: 2,
      title: "RapCaviar",
      description: "New music from Drake, Travis Scott and more",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      artist: "Various Artists"
    },
    {
      id: 3,
      title: "All Out 2010s",
      description: "The biggest songs of the 2010s",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
      artist: "Various Artists"
    },
    {
      id: 4,
      title: "Rock Classics",
      description: "Rock legends & epic songs",
      imageUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&h=300&fit=crop",
      artist: "Various Artists"
    }
  ];

  const toggleLike = (id: number) => {
    setLikedPlaylists(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handlePlayClick = (playlist: typeof featuredPlaylists[0]) => {
    if (currentTrack?.id === playlist.id) {
      togglePlay();
    } else {
      setCurrentTrack(playlist);
    }
  };

  return (
    <div className="ml-0 md:ml-64 p-4 md:p-8 bg-gradient-to-b from-purple-900 to-black min-h-screen text-white pb-24">
      <header className="flex items-center justify-between mb-8 md:mb-8 mt-12 md:mt-0">
        <h1 className="text-2xl md:text-3xl font-bold">Good evening</h1>
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-white transition">
            <Heart className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {featuredPlaylists.slice(0, 6).map((playlist) => (
          <div
            key={playlist.id}
            className="flex items-center bg-white bg-opacity-10 rounded-md hover:bg-opacity-20 transition cursor-pointer group"
          >
            <img
              src={playlist.imageUrl}
              alt={playlist.title}
              className="w-16 h-16 rounded-l-md"
            />
            <span className="font-semibold px-4 truncate">{playlist.title}</span>
            <button 
              onClick={() => handlePlayClick(playlist)}
              className="ml-auto mr-4 w-10 h-10 bg-spotify-green rounded-full items-center justify-center hidden group-hover:flex transition hover:scale-105"
            >
              {currentTrack?.id === playlist.id && isPlaying ? (
                <Pause className="w-6 h-6 text-black" />
              ) : (
                <Play className="w-6 h-6 text-black" />
              )}
            </button>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-bold mb-4">Made for You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {featuredPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-white bg-opacity-5 p-4 rounded-md hover:bg-opacity-10 transition cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={playlist.imageUrl}
                  alt={playlist.title}
                  className="w-full aspect-square object-cover rounded-md mb-4"
                />
                <button 
                  onClick={() => handlePlayClick(playlist)}
                  className="absolute bottom-2 right-2 w-10 h-10 bg-spotify-green rounded-full items-center justify-center hidden group-hover:flex transition shadow-lg hover:scale-105"
                >
                  {currentTrack?.id === playlist.id && isPlaying ? (
                    <Pause className="w-6 h-6 text-black" />
                  ) : (
                    <Play className="w-6 h-6 text-black" />
                  )}
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(playlist.id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full items-center justify-center hidden group-hover:flex transition"
                >
                  <Heart 
                    className={`w-5 h-5 ${likedPlaylists.has(playlist.id) ? 'text-spotify-green fill-spotify-green' : 'text-white'}`}
                  />
                </button>
              </div>
              <h3 className="font-semibold mb-1 truncate">{playlist.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainContent;