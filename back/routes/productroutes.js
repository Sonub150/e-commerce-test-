const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/userauth');
const productController = require('../controller/productcontroller');

// POST /api/products
router.post('/', protect, admin, productController.createProduct);
// PUT /api/products/:id
router.put('/:id', protect, admin, productController.updateProduct);
// DELETE /api/products/:id
router.delete('/:id', protect, admin, productController.deleteProduct);
// GET /api/products (filtered)
router.get('/', productController.queryFilter);
// GET /api/products/best-seller (best seller products)
router.get('/best-seller', productController.bestSeller);

router.get('/new-arrivals', productController.newArrivals)
// GET /api/products/:id (single product)
router.get('/:id', productController.singleProduct);
router.get('/similar/:id', productController.simpleProduct)

module.exports = router;