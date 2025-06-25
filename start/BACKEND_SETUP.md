# Backend Configuration

This project supports both local development and deployed backend environments.

## Backend URLs

### 1. Deployed Backend (Default)
- **URL**: `https://e-commerce-test-2-f4t8.onrender.com`
- **Status**: ✅ Active and deployed
- **Use Case**: Production environment

### 2. Local Backend (Development)
- **URL**: `http://localhost:8080`
- **Status**: ⚠️ Requires local server setup
- **Use Case**: Development and testing

## Configuration

### Automatic Detection
The frontend automatically detects the environment:
- **Development mode**: Uses `http://localhost:8080`
- **Production mode**: Uses deployed URL
- **Environment variable**: Can override with `VITE_BACKEND_URL`

### Manual Configuration

To use a specific backend URL, create a `.env.local` file in the `start` directory:

```bash
# For local development
VITE_BACKEND_URL=http://localhost:8080

# For deployed backend
VITE_BACKEND_URL=https://e-commerce-test-2-f4t8.onrender.com
```

## Testing Backend Connection

Visit `/api-test` in your browser to test the backend connection:
- Tests basic connectivity
- Tests checkout endpoint availability
- Shows detailed error messages

## Local Backend Setup

To run the backend locally:

1. Navigate to the backend directory:
   ```bash
   cd back
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. The server will run on `http://localhost:8080`

## CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:5173` (Vite dev server)
- `https://e-commerce-test-3-start.onrender.com` (Deployed frontend)

## Troubleshooting

### Route Not Found (404)
- Check if the backend server is running
- Verify the backend URL is correct
- Check browser console for detailed error messages

### CORS Errors
- Ensure the frontend URL is in the allowed origins
- Check if `withCredentials: true` is set

### Authentication Errors (401)
- User needs to be logged in for protected routes
- Check if authentication cookies are being sent

## API Endpoints

### Checkout Endpoints
- `POST /api/checkout` - Create checkout
- `GET /api/checkout` - Get user checkouts
- `PUT /api/checkout/:id/pay` - Update payment
- `POST /api/checkout/:id/finalize` - Finalize order

### Order Endpoints
- `GET /api/orders/my-orders` - Get user orders
- `POST /api/orders/:id` - Get order details

### Test Endpoint
- `GET /api/test` - Test backend connectivity

# Backend Setup Guide

## Quick Fix for "One or more products not found" Error

If you're getting the "One or more products not found" error during checkout, it means the products in your cart have different IDs than what exists in the backend database. Here's how to fix it:

### Option 1: Clear Cart and Start Fresh (Recommended)
1. Go to the checkout page
2. You'll see a "Cart Validation Error" message
3. Click "Clear Cart & Start Fresh"
4. This will clear your cart and redirect you to the home page
5. Add products from the catalog again

### Option 2: Reseed the Backend Database
1. Navigate to the backend directory: `cd ../back`
2. Run the seeder script: `node seeder.js`
3. This will clear the database and add fresh products
4. The new products will have different IDs, so you'll need to clear your cart anyway

### Option 3: Manual Cart Reset
1. Open browser developer tools (F12)
2. Go to Application/Storage tab
3. Find "Local Storage" for your domain
4. Delete the cart-related entries
5. Refresh the page

## Backend URL Configuration

The frontend automatically detects the backend URL based on the environment:

- **Development**: `http://localhost:8080`
- **Production**: `https://e-commerce-test-2-f4t8.onrender.com`

You can override this by setting the `VITE_BACKEND_URL` environment variable.

## Local Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ../back
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Seed the database with products:
   ```bash
   node seeder.js
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

## CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative dev server)
- `https://your-deployed-frontend.com` (Production)

## Troubleshooting

### Backend Not Reachable
1. Check if the backend server is running
2. Verify the backend URL in the API test page (`/api-test`)
3. Check CORS settings in the backend

### Checkout Endpoint Error
1. Verify the backend URL and CORS settings
2. Check if the backend routes are properly configured
3. Ensure the database is seeded with products

### Product ID Issues
1. Use the "Clear Cart & Start Fresh" option
2. Reseed the database if needed
3. Check the debug page (`/api-test`) to see cart structure

### Phone Number Validation
- Use format: `1234567890` or `+1234567890`
- Must start with a number (not 0)
- Can optionally start with `+`

### ZIP Code Validation
- Must be 3-10 characters long
- Can contain letters and numbers

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Checkout
- `POST /api/checkout` - Create checkout
- `PUT /api/checkout/:id/pay` - Update payment status
- `POST /api/checkout/:id/finalize` - Finalize order

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

## Debug Tools

Visit `/api-test` in your frontend to:
- Test backend connectivity
- View cart structure
- Validate product IDs
- Configure backend URL
- See detailed error information 