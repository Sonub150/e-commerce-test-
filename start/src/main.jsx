import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from "./context/CartContext";
import { AdminAuthProvider } from './context/AdminAuthContext';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminAuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AdminAuthProvider>
  </BrowserRouter>,
)
