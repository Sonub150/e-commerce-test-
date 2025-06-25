import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContextProvider } from './context/Appcontext';
import { CartProvider } from './context/CartContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import Cart from "./components/Cart";
import Wishlist from './pages/Wishlist';
import CategoryProducts from './pages/CategoryProducts';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/pages/Dashboard';
import AdminCoupons from './admin/pages/Coupons';
import AdminUsers from './admin/pages/Users';
import AdminProducts from './admin/pages/Products';
import AdminAnalytics from './admin/pages/Analytics';
import AdminSettings from './admin/pages/Settings';
import AdminLogin from './admin/pages/AdminLogin';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import Address from './pages/Address';
import OrderSuccess from './pages/OrderSuccess';
import APITest from './components/APITest';

function App() {
  const { adminUser } = useAdminAuth();

  return (
    <AppContextProvider>
      <CartProvider>
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
            <Route path="/address" element={<Address />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/api-test" element={<APITest />} />

            {/* Admin Panel Routes */}
            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin' element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path='coupons' element={<AdminCoupons />} />
              <Route path='users' element={<AdminUsers />} />
              <Route path='products' element={<AdminProducts />} />
              <Route path='analytics' element={<AdminAnalytics />} />
              <Route path='settings' element={<AdminSettings />} />
            </Route>
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
      </CartProvider>
    </AppContextProvider>
  );
}

export default App;