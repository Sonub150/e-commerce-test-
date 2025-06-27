# LuxeCart Project Documentation

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Frontend Information](#frontend-information)
3. [Backend Setup & Configuration](#backend-setup--configuration)
4. [API Endpoints Reference](#api-endpoints-reference)
5. [Troubleshooting & Debugging](#troubleshooting--debugging)

---

## Project Overview
LuxeCart is a modern e-commerce platform with a React + Vite frontend and a Node.js/Express + MongoDB backend. It supports user and admin roles, product management, coupons, orders, analytics, and more.

---

## Frontend Information
- **Framework:** React (with Vite for fast development)
- **State Management:** React Context API
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Features:**
  - Responsive design
  - Product search, filtering, and categories
  - Cart and wishlist management
  - User authentication and profile
  - Admin dashboard for managing products, users, coupons, and analytics

### Structure & Features
- **Pages:** Each route (Home, Login, Cart, Wishlist, Category, Search, etc.) is a React component in `src/pages/`.
- **Components:** Reusable UI elements (Navbar, Footer, Sliders, Product Modals, etc.) are in `src/components/`.
- **Admin Panel:** Separate admin dashboard and management pages in `src/admin/pages/`.
- **Context:** State management for cart, authentication, wishlist, and app-wide state using React Context API in `src/context/`.
- **API Services:** All backend communication is handled via `src/services/api.js` using Axios, with organized service objects for products, users, coupons, orders, analytics, etc.

#### Key Components
- **Navbar:** Responsive navigation bar with search, cart, wishlist, and user menu.
- **Homeslider:** Animated hero slider with keyboard navigation and category links.
- **Cart:** Full-featured cart with quantity management, coupon application, and validation.
- **Wishlist:** Save favorite products for later.
- **CategoryProducts:** Dynamic product listing by category, with filtering and sorting.
- **SpecialOffersSlider, NewArrivalsSlider, SpecialDeals, FeaturedCategories:** Highlighted product carousels and sections.
- **ProductModal:** Quick product view and add-to-cart from anywhere.
- **Sidebar:** For navigation and filtering on larger screens.
- **Footer:** Responsive site footer with links and info.

#### Pages
- **Home:** Landing page with sliders, featured categories, and deals.
- **Login/Register:** User authentication with email/password and OTP flows.
- **EmailVerify, ResetPassword:** Secure flows for account verification and password reset.
- **Cart, Wishlist, Address, OrderSuccess:** Full e-commerce flow from cart to checkout and order confirmation.
- **CategoryProducts, SearchResults:** Product discovery by category or search.
- **Admin Panel:** Dashboard, analytics, product/user/coupon management, and settings.

#### State Management
- **CartContext:** Manages cart state, add/remove/update, and syncs with backend.
- **AppContext:** Global app state (user, backend URL, etc.).
- **AdminAuthContext:** Admin authentication and session management.
- **Wishlist & Search Contexts:** For wishlist and search query state.

#### API Integration
- **All API calls** are centralized in `src/services/api.js` using Axios.
- **Automatic backend URL detection** based on environment.
- **Request/response interceptors** for authentication and error handling.
- **Service objects** for each resource (products, users, coupons, orders, analytics, etc.).

#### Styling & UX
- **Tailwind CSS** for utility-first, responsive design.
- **Framer Motion** for smooth animations and transitions.
- **Toast notifications** for user feedback (success, error, etc.).
- **Accessibility:** Keyboard navigation, focus management, and ARIA roles where appropriate.

#### Development & Customization
- **Hot Module Reloading** with Vite for fast development.
- **Easy theming** and customization via Tailwind and component props.
- **Component-based architecture** for rapid feature development and code reuse.

### Running the Frontend
```bash
cd start
npm install
npm run dev
```
- The frontend will run on `http://localhost:5173` by default.

---

## Backend Setup & Configuration
- **Backend:** Node.js, Express, MongoDB
- **Deployed URL:** `https://e-commerce-test-2-f4t8.onrender.com`
- **Local URL:** `http://localhost:8080`

### Configuration
- The frontend auto-detects the backend URL based on environment.
- To override, set `VITE_BACKEND_URL` in `start/.env.local`:
  ```bash
  VITE_BACKEND_URL=http://localhost:8080 # or your deployed backend
  ```

### Local Backend Setup
```bash
cd back
npm install
# Create .env with your MongoDB URI and JWT secret
node seeder.js   # Seed the database
npm start        # Start the backend server
```

### CORS
- Backend allows requests from Vite dev server and deployed frontend.

### Debugging
- Visit `/api-test` in the frontend to test backend connectivity and see detailed error messages.

---

## API Endpoints Reference
> **Base URL:** `${VITE_BACKEND_URL}` (e.g. `https://e-commerce-test-2-f4t8.onrender.com`)

### Authentication
| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| POST   | `/api/auth/login`       | User/Admin login           |
| POST   | `/api/auth/logout`      | User/Admin logout          |
| POST   | `/api/auth/register`    | User registration          |
| POST   | `/api/auth/send-reset-otp` | Send password reset OTP |
| POST   | `/api/auth/forgot-password` | Forgot password         |
| POST   | `/api/auth/send-otp`    | Send OTP (alt)             |

### Admin
| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| GET    | `/api/admin/profile`    | Get admin profile          |
| GET    | `/api/admin/dashboard`  | Get dashboard stats        |
| GET    | `/api/admin/settings`   | Get settings               |
| PUT    | `/api/admin/settings`   | Update settings            |

### Products
| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| GET    | `/api/products`         | Get all products           |
| GET    | `/api/products/:id`     | Get product by ID          |
| POST   | `/api/products`         | Create product             |
| PUT    | `/api/products/:id`     | Update product             |
| DELETE | `/api/products/:id`     | Delete product             |
| GET    | `/api/products/stats`   | Get product stats          |

### Coupons
| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| GET    | `/api/admin/coupons`    | Get all coupons            |
| GET    | `/api/admin/coupons/:id`| Get coupon by ID           |
| POST   | `/api/admin/coupons`    | Create coupon              |
| PUT    | `/api/admin/coupons/:id`| Update coupon              |
| DELETE | `/api/admin/coupons/:id`| Delete coupon              |
| PUT    | `/api/admin/coupons/:id/toggle` | Toggle coupon status |
| GET    | `/api/admin/coupons/stats` | Get coupon stats         |
| POST   | `/api/coupons/validate` | Validate coupon (public)   |
| POST   | `/api/coupons/apply`    | Apply coupon (public)      |

### Users
| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| GET    | `/api/admin/users`      | Get all users              |
| GET    | `/api/admin/users/:id`  | Get user by ID             |
| PUT    | `/api/admin/users/:id`  | Update user                |
| DELETE | `/api/admin/users/:id`  | Delete user                |
| GET    | `/api/admin/users/stats`| Get user stats             |

### Orders
| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| GET    | `/api/admin/orders`     | Get all orders             |
| GET    | `/api/admin/orders/:id` | Get order by ID            |
| PUT    | `/api/admin/orders/:id/status` | Update order status   |
| GET    | `/api/admin/orders/stats`| Get order stats            |
| GET    | `/api/orders/my-orders` | Get current user's orders  |
| POST   | `/api/orders/:id`       | Get order details by ID    |

### Checkout
| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| POST   | `/api/checkout`         | Create checkout            |
| GET    | `/api/checkout`         | Get user checkouts         |
| GET    | `/api/checkout/:id`     | Get checkout by ID         |
| PUT    | `/api/checkout/:id/pay` | Update payment status      |
| POST   | `/api/checkout/:id/finalize` | Finalize checkout (create order) |

### Analytics
| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| GET    | `/api/admin/analytics/sales`   | Get sales data      |
| GET    | `/api/admin/analytics/users`   | Get user analytics  |
| GET    | `/api/admin/analytics/products`| Get product analytics|
| GET    | `/api/admin/analytics/revenue` | Get revenue data    |

### Test & Utility
| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| GET    | `/api/test`             | Test backend connectivity  |

---

## Troubleshooting & Debugging

### Common Issues
- **Route Not Found (404):** Ensure backend is running and URL is correct.
- **CORS Errors:** Check allowed origins and credentials settings.
- **Authentication Errors (401):** User must be logged in for protected routes.
- **Product ID Issues:** Clear cart and reseed database if needed.
- **Backend Not Reachable:** Check server status and CORS settings.

### Debug Tools
- Visit `/api-test` in the frontend to:
  - Test backend connectivity
  - View cart structure
  - Validate product IDs
  - Configure backend URL
  - See detailed error information

### Validation


---

**For more details, see the codebase or contact the project maintainer.** 
