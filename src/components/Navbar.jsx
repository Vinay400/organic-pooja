import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { IconHome, IconBook, IconApps, IconMenu4, IconX, IconShoppingCart, IconUserCircle, IconBrandGoogle, IconArrowRight, IconServicemark, IconLogout } from '@tabler/icons-react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ position }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [OTP, setotp] = useState('');
  const [telephone, setTelephone] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserName(user.displayName || 'User');
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google login successful:', user);
      setUserName(user.displayName || 'User');
      closeLoginModal();
    } catch (error) {
      console.error('Google login error:', error);
      setError('Google login failed. Please try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, OTP);
      const user = userCredential.user;
      console.log('Login successful:', user);
      setUserName(user.displayName || 'User');
      closeLoginModal();
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Logout successful');
      setUserName('');
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const UserMenu = ({ isMobile }) => (
    <div ref={userMenuRef} className={isMobile ? "" : "relative"}>
      <button
        onClick={toggleUserMenu}
        className={`flex items-center px-4 py-2 text-sm font-semibold text-gray-800 transition-all duration-300 ease-in-out ${
          isMobile ? "w-full justify-start" : "rounded-full hover:bg-emerald-100"
        }`}
      >
        <IconUserCircle size={24} className="mr-2 text-emerald-600" />
        <span className="truncate max-w-[100px]">{isLoggedIn ? userName : 'Guest'}</span>
      </button>
      <AnimatePresence>
        {isUserMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 0 : -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isMobile ? 0 : -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`${
              isMobile ? "mt-2" : "absolute right-0 z-20 w-56 mt-2 bg-white rounded-lg shadow-xl border border-gray-200"
            }`}
          >
            <div className="p-4 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">Hello, {isLoggedIn ? userName : 'Guest'}</p>
              <p className="text-xs text-gray-500">{isLoggedIn ? 'Manage your account' : 'Sign in to your account'}</p>
            </div>
            <div className="py-2">
              <NavLink to="/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-emerald-50 hover:text-emerald-600">
                Orders
              </NavLink>
              <NavLink to="/wishlist" className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-emerald-50 hover:text-emerald-600">
                Wishlist
              </NavLink>
              <NavLink to='/help-center' className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-emerald-50 hover:text-emerald-600">
                Help Center
              </NavLink>
            </div>
            <div className="pt-2 border-t border-gray-200">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 transition-colors duration-150 hover:bg-red-50"
                >
                  <IconLogout size={18} className="mr-2" />
                  Logout
                </button>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="flex items-center w-full px-4 py-2 text-sm text-left transition-colors duration-150 text-emerald-600 hover:bg-emerald-50"
                >
                  {/* <IconLogin size={18} className="mr-2" /> */}
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 transform origin-left transition-all duration-300 scale-x-0 group-hover:scale-x-100"></div>
    </div>
  );
  const desktopNavItems = position === 'left' ? (
    <ul className="items-center hidden space-x-10 lg:flex">
      {['Home', 'Products', 'Services'].map((item) => (
        <li key={item}>
          <NavLink
            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            className="relative py-2 group"
          >
            <span className="text-lg font-medium text-gray-800 transition-all duration-300 group-hover:text-emerald-600">
              {item}
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 transform origin-left transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </NavLink>
        </li>
      ))}
    </ul>
  ) : (
    <ul className="items-center hidden space-x-8 lg:flex">
      <li>
        <UserMenu isMobile={false} />
      </li>
      <li>
        <NavLink
          to="/Cart"
          className="relative flex items-center text-gray-800 transition-all duration-300 group hover:text-emerald-600"
        >
          <IconShoppingCart size={24} className="transition-transform duration-300 group-hover:scale-110" />
          <span className="ml-2 text-sm font-medium">Cart</span>
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-600 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/book"
          className="relative overflow-hidden px-6 py-3 text-sm font-bold text-white bg-emerald-600 rounded-md transition-all duration-300 ease-in-out hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <span className="relative z-10">Book Appointment</span>
          <span className="absolute inset-0 transition-opacity duration-300 ease-in-out bg-white opacity-0 group-hover:opacity-20"></span>
        </NavLink>
      </li>
    </ul>
  );
  const mobileNavItems = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 overflow-hidden text-white bg-emerald-900"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="white" strokeWidth="0.5">
            <animate attributeName="d" dur="20s" repeatCount="indefinite"
              values="M0,0 Q50,0 100,0 L100,100 Q50,100 0,100 Z;
                      M0,0 Q50,50 100,0 L100,100 Q50,50 0,100 Z;
                      M0,0 Q50,0 100,0 L100,100 Q50,100 0,100 Z" />
          </path>
        </svg>
      </div>
  
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-center justify-between mb-10"
        >
          <div className="text-2xl font-bold tracking-tight">Organic Pooja</div>
          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 transition-colors duration-200 text-emerald-300 hover:text-white"
            onClick={toggleMenu}
          >
            <IconX size={28} strokeWidth={2} />
          </motion.button>
        </motion.div>
  
        {/* UserMenu */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-10"
        >
          <div className="p-4 rounded-lg shadow-lg bg-emerald-800">
            <UserMenu isMobile={true} />
          </div>
        </motion.div>
  
        {/* Navigation Links */}
        <nav className="flex-grow mb-8 space-y-2">
          {[
            { to: "/", label: "Home", icon: IconHome },
            { to: "/services", label: "Services", icon: IconServicemark },
            { to: "/products", label: "Products", icon: IconApps },
          ].map(({ to, label, icon: Icon }, index) => (
            <motion.div
              key={to}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
            >
              <NavLink
                to={to}
                className="flex items-center p-3 transition-all duration-200 rounded-lg hover:bg-emerald-800 group"
                onClick={toggleMenu}
              >
                <div className="flex items-center justify-center w-10 h-10 mr-4 transition-all duration-200 rounded-lg bg-emerald-700 text-emerald-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon size={20} />
                </div>
                <span className="text-lg font-medium transition-transform duration-200 group-hover:translate-x-1">
                  {label}
                </span>
              </NavLink>
            </motion.div>
          ))}
        </nav>
  
        {/* Book Appointment Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mb-8"
        >
          <NavLink
            to="/book"
            className="flex items-center justify-center w-full p-4 transition-all duration-200 rounded-lg shadow-lg bg-emerald-500 hover:bg-emerald-400 group"
            onClick={toggleMenu}
          >
            <IconBook size={24} className="mr-2 transition-transform duration-200 group-hover:scale-110" />
            <span className="text-lg font-semibold transition-all duration-200 group-hover:tracking-wider">
              Book Appointment
            </span>
          </NavLink>
        </motion.div>
  
        {/* Footer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="text-center"
        >
          <div className="text-sm transition-colors duration-200 text-emerald-300 hover:text-white">
            © 2023 Organic Pooja. All rights reserved.
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
  return (
    <nav className="relative">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          {desktopNavItems}
        </div>

        <div className="flex items-center space-x-4 lg:hidden">
          <NavLink
            to="/Cart"
            className="flex items-center p-2 text-black"
          >
            <IconShoppingCart size={28} />
          </NavLink>

          <button
            className="p-2"
            onClick={toggleMenu}
          >
            {isOpen ? <IconX size={24} /> : <IconMenu4 size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white"
          >
            {mobileNavItems}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoginModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md p-8 bg-white shadow-2xl bg-opacity-20 rounded-2xl backdrop-filter backdrop-blur-lg animate-fadeIn"
            >
              <button
                className="absolute p-2 text-white transition-transform transform cursor-pointer top-4 right-4 hover:scale-110"
                onClick={closeLoginModal}
              >
                <IconX size={24} />
              </button>
              <div className="relative z-10">
                <h2 className="mb-6 text-4xl font-bold text-white">Welcome Back</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-white">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 text-white placeholder-gray-300 transition-all duration-300 bg-white rounded-lg bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white animate-slideInFromLeft"
                      value={telephone}
                      onChange={(e) => {
                        if (e.target.value.length <= 10) setTelephone(e.target.value);
                      }}
                      required
                      maxLength="10"
                      placeholder="Enter your 10-digit phone number"
                      pattern="\d{10}"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="otp" className="block text-sm font-medium text-white">
                      OTP
                    </label>
                    <input
                      type="tel"
                      id="otp"
                      className="w-full px-4 py-3 text-white placeholder-gray-300 transition-all duration-300 bg-white rounded-lg bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white animate-slideInFromRight"
                      value={OTP}
                      onChange={(e) => {
                        if (e.target.value.length <= 6) setotp(e.target.value);
                      }}
                      required
                      maxLength="6"
                      placeholder="Enter 6-digit OTP"
                      pattern="\d{6}"
                    />
                  </div>
                  {error && <p className="text-sm text-red-300 animate-pulse">{error}</p>}
                  <button
                    type="submit"
                    className="w-full px-6 py-3 font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-lg bg-opacity-20 hover:bg-opacity-30 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                  >
                    Verify & Login
                  </button>
                </form>
                <div className="mt-6">
                  <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center w-full px-6 py-3 font-semibold text-white transition-all duration-300 bg-white rounded-lg shadow-md bg-opacity-10 hover:bg-opacity-20 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 animate-fadeIn"
                  >
                    <IconBrandGoogle size={20} className="mr-2" />
                    Login with Google
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    );
    };
    
    export default Navbar;