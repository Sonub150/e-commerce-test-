const express = require('express');
const cartController = require('../controller/cart.controller');
const { protect } = require('../middleware/userauth');

const router = express.Router();

// GET /cart - Get user's or guest's cart
router.get('/', cartController.getCart);

// PUT /cart - Update cart item
router.put('/', cartController.updateCartItem);

// POST /cart/add - Add item to cart
router.post('/add', cartController.addToCart);

// DELETE /cart/item - Remove item from cart
router.delete('/item', cartController.removeCartItem);

// DELETE /cart/clear - Clear the entire cart
router.delete('/clear', cartController.clearCart);

module.exports = router;