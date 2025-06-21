import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContextProvider } from './context/Appcontext';
import Cart from "./components/Cart";
import Wishlist from './pages/Wishlist';
import CategoryProducts from './pages/CategoryProducts';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <AppContextProvider>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Login />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/email-verify' element={<EmailVerify />} />
          
          {/* Category Pages */}
          <Route path='/category/:categoryName' element={<CategoryProducts />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResults />} />
          
          {/* Additional Routes for Home Page Features */}
          <Route path="/shop-now" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50"><div className="text-center"><h1 className="text-3xl font-bold text-gray-800 mb-4">Shop Now</h1><p className="text-gray-600">Explore our amazing products!</p><button onClick={() => window.history.back()} className="mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300">Go Back</button></div></div>} />
          <Route path="/orders" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50"><div className="text-center"><h1 className="text-3xl font-bold text-gray-800 mb-4">Order Tracking</h1><p className="text-gray-600">Order tracking feature coming soon!</p></div></div>} />
          <Route path="/rewards" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50"><div className="text-center"><h1 className="text-3xl font-bold text-gray-800 mb-4">Rewards Program</h1><p className="text-gray-600">Rewards program coming soon!</p></div></div>} />
          <Route path="/gift-cards" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-red-50"><div className="text-center"><h1 className="text-3xl font-bold text-gray-800 mb-4">Gift Cards</h1><p className="text-gray-600">Gift cards feature coming soon!</p></div></div>} />
          <Route path="/support" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50"><div className="text-center"><h1 className="text-3xl font-bold text-gray-800 mb-4">Customer Support</h1><p className="text-gray-600">24/7 support coming soon!</p></div></div>} />
          <Route path="/account" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50"><div className="text-center"><h1 className="text-3xl font-bold text-gray-800 mb-4">My Account</h1><p className="text-gray-600">Account management coming soon!</p></div></div>} />
          <Route path="/settings" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-slate-50"><div className="text-center"><h1 className="text-3xl font-bold text-gray-800 mb-4">Settings</h1><p className="text-gray-600">Settings page coming soon!</p></div></div>} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </AppContextProvider>
  );
}

export default App;