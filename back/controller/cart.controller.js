const Cart = require('../models/cart.models');
const Product = require('../models/productmodels');

// Helper function to get cart
const getCart = async (userId, guestId) => {
  const query = userId ? { user: userId } : { guestId };
  return await Cart.findOne(query).populate('cartItems.productId', 'name price images countInStock');
};

const getCartHandler = async (req, res) => {
  const userId = req.user?._id; // From protect middleware
  const guestId = req.query.guestId || req.body?.guestId;

  try {
    if (!userId && !guestId) {
      return res.status(400).json({ 
        status: 'fail',
        message: "Either authenticated user or guestId is required" 
      });
    }

    const cart = await getCart(userId, guestId);
    
    if (!cart) {
      return res.status(200).json({ 
        status: 'success',
        data: null,
        message: "No cart found"
      });
    }

    res.status(200).json({
      status: 'success',
      guestId: cart.guestId,
      data: cart
    });

  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch cart',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const addToCart = async (req, res) => {
  const userId = req.user?._id;
  const { productId, quantity = 1, size, color, guestId } = req.body;
  
  try {
    // Validate required fields
    if (!productId) {
      return res.status(400).json({ 
        status: 'fail',
        message: "Product ID is required" 
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        status: 'fail',
        message: "Product not found" 
      });
    }

    // Check stock availability
    if (product.countInStock < quantity) {
      return res.status(400).json({ 
        status: 'fail',
        message: `Only ${product.countInStock} items available in stock`,
        availableStock: product.countInStock
      });
    }

    // Get or create cart
    let cart = await getCart(userId, guestId);
    const productData = {
      productId,
      quantity,
      size,
      color,
      price: product.discountPrice || product.price,
    };

    if (cart) {
      // Check if product variant exists in cart
      const existingItem = cart.cartItems.find(
        item => item.productId.equals(productId) && 
        item.size === size && 
        item.color === color
      );

      if (existingItem) {
        // Update quantity
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.countInStock) {
          return res.status(400).json({
            status: 'fail',
            message: `Cannot add more than available stock (${product.countInStock})`,
            maxQuantity: product.countInStock
          });
        }
        existingItem.quantity = newQuantity;
      } else {
        // Add new item
        cart.cartItems.push(productData);
      }
    } else {
      // Create new cart
      cart = await Cart.create({
        user: userId || undefined,
        guestId: guestId || `guest_${Date.now()}`,
        cartItems: [productData]
      });
    }

    // Recalculate totals
    await calculateCartTotals(cart);
    await cart.save();
    
    res.status(200).json({
      status: 'success',
      guestId: cart.guestId,
      data: cart
    });

  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to add product to cart',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const updateCartItem = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ status: 'fail', message: 'Request body is missing' });
  }
  const { productId, quantity, size, color, guestId } = req.body;

  try {
    if (!productId || quantity === undefined) {
      return res.status(400).json({
        status: 'fail',
        message: "Product ID and quantity are required"
      });
    }

    const cart = await getCart(req.user?._id, guestId);
    if (!cart) {
      return res.status(404).json({
        status: 'fail',
        message: "Cart not found"
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: "Product not found"
      });
    }

    const itemIndex = cart.cartItems.findIndex(
      item => item.productId.equals(productId) &&
      item.size === size &&
      item.color === color
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: "Item not found in cart"
      });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.cartItems.splice(itemIndex, 1);
    } else {
      // Validate stock
      if (quantity > product.countInStock) {
        return res.status(400).json({
          status: 'fail',
          message: `Only ${product.countInStock} items available`,
          maxQuantity: product.countInStock
        });
      }
      cart.cartItems[itemIndex].quantity = quantity;
    }

    await calculateCartTotals(cart);
    await cart.save();

    res.status(200).json({
      status: 'success',
      data: cart
    });

  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update cart',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Helper function to calculate cart totals
const calculateCartTotals = async (cart) => {
  let totalPrice = 0;
  let totalQuantity = 0;

  for (const item of cart.cartItems) {
    const product = await Product.findById(item.productId);
    if (product) {
      item.price = product.discountPrice || product.price;
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;
    }
  }

  cart.totalPrice = totalPrice;
  cart.totalQuantity = totalQuantity;
  return cart;
};

// Remove a specific item from the cart
const removeCartItem = async (req, res) => {
  const userId = req.user?._id;
  const { productId, size, color, guestId } = req.body;

  try {
    if (!productId) {
      return res.status(400).json({
        status: 'fail',
        message: 'Product ID is required',
      });
    }

    const cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cart not found',
      });
    }

    const itemIndex = cart.cartItems.findIndex(
      item => item.productId.equals(productId) &&
        item.size === size &&
        item.color === color
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'Item not found in cart',
      });
    }

    cart.cartItems.splice(itemIndex, 1);
    await calculateCartTotals(cart);
    await cart.save();

    res.status(200).json({
      status: 'success',
      data: cart,
    });
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to remove item from cart',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Clear the entire cart
const clearCart = async (req, res) => {
  const userId = req.user?._id;
  const guestId = req.body.guestId || req.query.guestId;

  try {
    const cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cart not found',
      });
    }

    cart.cartItems = [];
    await calculateCartTotals(cart);
    await cart.save();

    res.status(200).json({
      status: 'success',
      message: 'Cart cleared',
      data: cart,
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to clear cart',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

module.exports = {
  getCart: getCartHandler,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
};