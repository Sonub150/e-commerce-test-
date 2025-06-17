import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import Fashion from './pages/Fashion';
import Electronics from './pages/Electronics';
import Phones from './pages/Phones';
import Laptops from './pages/Laptops';
import Shoes from './pages/Shoes';
import Beauty from './pages/Beauty';
import Sports from './pages/Sports';
import HomeAppliances from './pages/HomeAppliances';
import ProductDetail from './pages/ProductDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContextProvider } from './context/Appcontext';

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
          <Route path='/fashion' element={<Fashion />} />
          <Route path='/electronics' element={<Electronics />} />
          <Route path='/phones' element={<Phones />} />
          <Route path='/laptops' element={<Laptops />} />
          <Route path='/shoes' element={<Shoes />} />
          <Route path='/beauty' element={<Beauty />} />
          <Route path='/sports' element={<Sports />} />
          <Route path='/home-appliances' element={<HomeAppliances />} />
          
          {/* Product Detail Page */}
          <Route path='/:category/:productId' element={<ProductDetail />} />
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