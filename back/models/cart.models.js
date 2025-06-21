const mongoose = require('mongoose');

// Define a schema for individual cart items
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  productId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Product',
  required: true,
},
  name: String,
  image: String,
  price: Number, // Should be a number
  size: String,
  color: String,
  quantity: {
    type: Number,
    default: 1,
  }
}, { _id: false }); // Prevents automatic _id for subdocuments

// Define the main cart schema
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  guestId: {
    type: String,
  },
  cartItems: [cartItemSchema],
  totalQuantity: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);