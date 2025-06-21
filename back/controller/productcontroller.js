const Product = require('../models/productmodels');

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      discountPrice,
      category,
      images,
      countInStock,
      sku,
      brand,
      sizes,
      colors,
      collectionName,
      gender,
      tags
    } = req.body;

    // Validation: Check for required fields
    if (!name || !price || !description || !category || !countInStock || !sku) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check for duplicate SKU
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'Product with this SKU already exists'
      });
    }

    // Ensure req.user is present (should be set by protect middleware)
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: 'User authentication failed'
      });
    }

    // Create product with user reference
    const product = new Product({
      ...req.body,
      user: req.user._id
    });

    const createdProduct = await product.save();

    res.status(201).json({
      success: true,
      product: createdProduct
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      discountPrice,
      category,
      images,
      countInStock,
      sku,
      brand,
      sizes,
      colors,
      collectionName,
      gender,
      tags
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.name = name !== undefined ? name : product.name;
    product.price = price !== undefined ? price : product.price;
    product.description = description !== undefined ? description : product.description;
    product.category = category !== undefined ? category : product.category;
    product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
    product.sku = sku !== undefined ? sku : product.sku;

    // For optional fields - allow null values
    product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice;
    product.brand = brand !== undefined ? brand : product.brand;
    product.collectionName = collectionName !== undefined ? collectionName : product.collectionName;
    product.gender = gender !== undefined ? gender : product.gender;

    // For array fields - only overwrite if new array is provided
    product.images = images !== undefined ? images : product.images;
    product.sizes = sizes !== undefined ? sizes : product.sizes;
    product.colors = colors !== undefined ? colors : product.colors;
    product.tags = tags !== undefined ? tags : product.tags;

    const updatedProduct = await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await Product.deleteOne({ _id: product._id });

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      deletedProduct: {
        id: product._id,
        name: product.name,
        sku: product.sku,
        category: product.category
      }
    });

  } catch (error) {
    console.error('Delete Product Error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

const queryFilter = async (req, res) => {
  try {
    const { 
      collection,  // Filter by collection
      size,        // Filter by size
      color,       // Filter by color
      gender,      // Filter by gender
      minPrice,    // Minimum price filter
      maxPrice,    // Maximum price filter
      sortBt,      // Sorting method (newest, oldest, etc.)
      category,    // Filter by category
      brand,       // Filter by brand
      limit,       // Limit number of results
      search,      // Search term
      skip = 0     // Pagination offset (default 0)
    } = req.query;

    let query = {};
    let sort = { createdAt: -1 }; // Default sort: newest first

    // Collection filter
    if (collection && collection.toLowerCase() !== 'all') {
      query.collection = collection;
    }

    // Category filter
    if (category && category.toLowerCase() !== 'all') {
      query.category = category;
    }

    // Brand filter
    if (brand && brand.toLowerCase() !== 'all') {
      query.brand = brand;
    }

    // Gender filter
    if (gender && gender.toLowerCase() !== 'all') {
      query.gender = gender;
    }

    // Color filter
    if (color && color.toLowerCase() !== 'all') {
      query.color = color;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Size filter
    if (size && size.toLowerCase() !== 'all') {
      query.size = size;
    }

    // Sorting options
    if (sortBt) {
      switch (sortBt.toLowerCase()) {
        case 'newest':
          sort = { createdAt: -1 };
          break;
        case 'oldest':
          sort = { createdAt: 1 };
          break;
        case 'lowest':
          sort = { price: 1 }; // Ascending price
          break;
        case 'highest':
          sort = { price: -1 }; // Descending price
          break;
        case 'popularity':
          sort = { rating: -1 }; // Highest rating first
          break;
        // No default needed as we initialized sort above
      }
    }

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } }, // Case-insensitive name search
        { description: { $regex: search, $options: 'i' } } // Case-insensitive description search
      ];
    }

    // Execute query with pagination and sorting
    const products = await Product.find(query)
      .skip(Number(skip)) // Convert skip to number
      .sort(sort) // Apply sorting
      .limit(Number(limit) || 0); // Convert limit to number or default to 0 (no limit)

    // Return successful response
    res.json({
      status: 'success',
      results: products.length,
      data: {
        products
      }
    });

  } catch (error) {
    // Error handling
    res.status(500).json({
      status: 'fail',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

const bestSeller = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Default to 10 products
    const bestSellerProducts = await Product.find()
      .sort({ numReviews: -1, rating: -1 }) // Sort by reviews then rating
      .limit(limit); // Add pagination

    if (!bestSellerProducts || bestSellerProducts.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No best-selling products found',
        suggestions: [
          'Try expanding your search criteria',
          'Check if any products have reviews'
        ]
      });
    }

    res.status(200).json({
      status: 'success',
      results: bestSellerProducts.length,
      limit,
      data: {
        products: bestSellerProducts // More consistent naming
      }
    });

  } catch (error) {
    console.error('Error fetching best sellers:', error);
    res.status(500).json({
      status: 'error', // More accurate than 'fail' for server errors
      message: 'Failed to retrieve best-selling products',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      timestamp: new Date().toISOString() // Helpful for debugging
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        error: 'Product not found'
      });
    }
    res.json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

const simpleProduct = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Find the main product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
      });
    }

    // Find similar products (excluding the current one)
    const similar = await Product.find({
      _id: { $ne: id },
      category: product.category,
      gender: product.gender
    }).limit(4);

    res.status(200).json({
      status: 'success',
      data: {
        product,
        similar
      }
    });
    
  } catch (error) {
    console.error('Error in simpleProduct:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const newArrivals = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8; // Default to 8 products, support limit parameter
    
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    if (!products || products.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No new arrivals found',
        data: {
          products: []
        }
      });
    }

    res.status(200).json({
      status: 'success',
      results: products.length,
      limit,
      data: {
        products
      }
    });

  } catch (error) {
    console.error('Error in newArrivals:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch new arrivals',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      timestamp: new Date().toISOString()
    });
  }
};

const productController = {
  createProduct,
  updateProduct,
  deleteProduct,
  queryFilter,
  singleProduct,
  simpleProduct,
  bestSeller,
  newArrivals
};

module.exports = productController;