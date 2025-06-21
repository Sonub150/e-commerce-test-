import React, { createContext, useContext, useState, useEffect } from 'react';

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

// Wishlist Context
const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

// Search Context
const SearchContext = createContext();
export const useSearch = () => useContext(SearchContext);

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  
  // Wishlist state with localStorage persistence
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  const value = {
    backendUrl,
    isLoggedIn,
    setisLoggedIn,
    userData,
    setUserData
  };

  return (
    <AppContext.Provider value={value}>
      <WishlistContext.Provider value={{ wishlist, setWishlist }}>
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
          {children}
        </SearchContext.Provider>
      </WishlistContext.Provider>
    </AppContext.Provider>
  );
};
    
