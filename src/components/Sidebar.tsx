import React, { useState } from 'react';
import { Home, Search, Library, Plus, Heart, Music4, Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 right-4 z-50 text-white p-2 bg-black bg-opacity-50 rounded-full"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div className={`
        fixed top-0 left-0 w-64 bg-black h-full flex flex-col z-40
        transform transition-transform duration-300 ease-in-out
        md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <div className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Music4 className="w-5 h-5 text-black" />
            </div>
            Spotify
          </div>
          
          <nav className="space-y-4">
            <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white transition">
              <Home className="w-6 h-6" />
              <span className="font-semibold">Home</span>
            </a>
            <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white transition">
              <Search className="w-6 h-6" />
              <span className="font-semibold">Search</span>
            </a>
            <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-white transition">
              <Library className="w-6 h-6" />
              <span className="font-semibold">Your Library</span>
            </a>
          </nav>

          <div className="mt-8 space-y-4">
            <button className="flex items-center gap-4 text-gray-300 hover:text-white transition w-full">
              <div className="w-6 h-6 bg-gray-300 rounded-sm flex items-center justify-center">
                <Plus className="w-4 h-4 text-black" />
              </div>
              <span className="font-semibold">Create Playlist</span>
            </button>
            <button className="flex items-center gap-4 text-gray-300 hover:text-white transition w-full">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-300 rounded-sm flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">Liked Songs</span>
            </button>
          </div>
        </div>

        <div className="px-6 mt-4 overflow-y-auto flex-1">
          <div className="border-t border-gray-800 pt-4">
            <div className="text-xs text-gray-400 hover:text-white cursor-pointer">
              Your Playlist #1
            </div>
            <div className="text-xs text-gray-400 hover:text-white cursor-pointer mt-2">
              Your Playlist #2
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;