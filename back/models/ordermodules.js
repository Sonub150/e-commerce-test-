const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    size: String,
    color: String
}, {_id: false});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, {timestamps: true});

// Pre-save middleware to ensure consistency
orderSchema.pre('save', function(next) {
    // If payment status is 'paid', ensure isPaid is true
    if (this.paymentStatus === 'paid' && !this.isPaid) {
        this.isPaid = true;
    }
    
    // If isPaid is true but no paidAt, set it
    if (this.isPaid && !this.paidAt) {
        this.paidAt = new Date();
    }
    
    // If payment status is not 'paid', ensure isPaid is false
    if (this.paymentStatus !== 'paid' && this.isPaid) {
        this.isPaid = false;
        this.paidAt = undefined;
    }
    
    next();
});

module.exports = mongoose.model('Order', orderSchema);