const express = require('express');
const Checkout = require('../models/checkout');
const Cart = require('../models/cart.models');
const User = require('../models/user.models');
const Products = require('../models/productmodels');
const Order = require('../models/ordermodules');

const { protect } = require('../middleware/userauth');

const router = express.Router();

router.post('/', protect, async (req, res) => {
    const { checkoutItems, shippingAddress, city, postalCode, country, phone, paymentMethod, totalPrice, itemsPrice, taxPrice } = req.body;

    // Validate required fields
    if (!checkoutItems || !Array.isArray(checkoutItems) || checkoutItems.length === 0) {
        return res.status(400).json({ message: 'Checkout items are required and must be an array' });
    }

    if (!shippingAddress || !city || !postalCode || !country || !phone || !paymentMethod || !totalPrice || !itemsPrice || !taxPrice) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    // Validate checkout items structure and always calculate totals
    for (let item of checkoutItems) {
        if (!item.productId || !item.name || !item.price || !item.quantity || !item.image) {
            return res.status(400).json({ message: 'Invalid checkout item structure' });
        }
        if (item.quantity <= 0 || item.price <= 0) {
            return res.status(400).json({ message: 'Invalid quantity or price' });
        }
        // Always calculate total
        item.total = item.price * item.quantity;
    }

    // Validate phone number format
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: 'Invalid phone number format' });
    }

    // Validate postal code format (basic validation)
    if (postalCode.length < 3 || postalCode.length > 10) {
        return res.status(400).json({ message: 'Invalid postal code format' });
    }

    try {
        // Verify that all products exist
        const productIds = checkoutItems.map(item => item.productId);
        const products = await Products.find({ _id: { $in: productIds } });
        
        if (products.length !== productIds.length) {
            return res.status(400).json({ message: 'One or more products not found' });
        }

        const newCheckout = await Checkout.create({
            user: req.userId,
            checkoutItems,
            shippingAddress,
            city,
            postalCode,
            country,
            phone,
            paymentMethod,
            totalPrice,
            itemsPrice,
            taxPrice,
            paymentStatus: 'pending',
            isPaid: false,
        });
        
        res.status(201).json(newCheckout);

    } catch (error) {
        console.error('Checkout error:', error.message);
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id/pay', protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    if (!paymentStatus || !['paid', 'pending', 'failed'].includes(paymentStatus)) {
        return res.status(400).json({ message: 'Invalid payment status' });
    }

    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }

        console.log('Debug - Checkout user:', checkout.user.toString());
        console.log('Debug - Request user:', req.userId.toString());

        // Verify the user owns this checkout
        if (checkout.user.toString() !== req.userId.toString()) {
            return res.status(403).json({ 
                message: 'Not authorized',
                checkoutUserId: checkout.user.toString(),
                requestUserId: req.userId.toString()
            });
        }

        if (checkout.isFinalized) {
            return res.status(400).json({ message: 'Cannot modify a finalized checkout' });
        }

        if (paymentStatus === 'paid') {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paidAt = Date.now();
            checkout.paymentDetails = paymentDetails;
            
            await checkout.save();
            return res.status(200).json({ message: 'Checkout paid successfully', checkout });
        } else {
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            await checkout.save();
            return res.status(200).json({ message: 'Payment status updated', checkout });
        }

    } catch (error) {
        console.error('Payment error:', error.message);
        console.error('Payment error stack:', error.stack);
        res.status(500).json({ 
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

router.post('/:id/finalize', protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }

        // Verify the user owns this checkout
        if (checkout.user.toString() !== req.userId.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        if (checkout.isFinalized) {
            return res.status(400).json({ message: "Checkout is already finalized" });
        }

        if (!checkout.isPaid) {
            return res.status(400).json({ message: "Checkout is not paid" });
        }

        // Validate checkout items
        if (!checkout.checkoutItems || checkout.checkoutItems.length === 0) {
            return res.status(400).json({ message: "Checkout has no items" });
        }

        // Transform checkout items to order items format
        const orderItems = checkout.checkoutItems.map(item => ({
            product: item.productId,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity
        }));

        // Validate shipping address
        if (!checkout.shippingAddress || !checkout.city || !checkout.postalCode || !checkout.country) {
            return res.status(400).json({ message: "Incomplete shipping address" });
        }

        // Transform shipping address to order format
        const orderShippingAddress = {
            address: checkout.shippingAddress,
            city: checkout.city,
            postalCode: checkout.postalCode,
            country: checkout.country
        };

        // Create order with proper validation
        const orderData = {
            user: checkout.user,
            orderItems: orderItems,
            shippingAddress: orderShippingAddress,
            paymentMethod: checkout.paymentMethod,
            total: checkout.totalPrice,
            paymentStatus: "paid",
            isPaid: true,
            paidAt: checkout.paidAt || new Date(),
            isDelivered: false,
            paymentDetails: checkout.paymentDetails,
        };

        const finalOrder = await Order.create(orderData);

        // Mark checkout as finalized
        checkout.isFinalized = true;
        checkout.finalizedAt = Date.now();
        await checkout.save();

        // Clear the user's cart after successful order
        await Cart.findOneAndDelete({ user: checkout.user });

        return res.status(200).json({
            message: 'Order finalized successfully',
            order: finalOrder
        });

    } catch (error) {
        console.error('Finalize error:', error.message);
        console.error('Finalize error stack:', error.stack);
        res.status(500).json({ 
            message: 'Server error',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// Get checkout by ID
router.get('/:id', protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }

        // Verify the user owns this checkout
        if (checkout.user.toString() !== req.userId.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.status(200).json(checkout);

    } catch (error) {
        console.error('Get checkout error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user's checkouts
router.get('/', protect, async (req, res) => {
    try {
        const checkouts = await Checkout.find({ user: req.userId }).sort({ createdAt: -1 });
        res.status(200).json(checkouts);

    } catch (error) {
        console.error('Get checkouts error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;