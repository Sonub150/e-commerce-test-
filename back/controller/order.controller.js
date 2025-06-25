const Order = require('../models/ordermodules');

const Orders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId }).sort({
            createdAt: -1
        });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "server error" });
    }
}

const orderDetail = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'firstName lastName email');
        if (!order) {
            return res.status(404).json({ msg: "order not found" });
        }
        
        // Check if user owns this order
        if (order.user._id.toString() !== req.userId.toString()) {
            return res.status(403).json({ msg: "Not authorized to view this order" });
        }
        
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "server error" });
    }
}

const Ordercontroller = { Orders, orderDetail };

module.exports = Ordercontroller;