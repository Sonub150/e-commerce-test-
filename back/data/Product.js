const products = [
  {
    name: "Nike Air Max 270",
    description: "The Nike Air Max 270 delivers unrivaled comfort with the tallest Air unit yet. Perfect for everyday wear and casual activities.",
    price: 150.00,
    discountPrice: 120.00,
    countInStock: 50,
    sku: "NIKE-AIR-MAX-270-001",
    category: "Footwear",
    brand: "Nike",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Red", "Blue"],
    collectionName: "Athletic Footwear",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", altText: "Nike Air Max 270 Side View" },
      { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", altText: "Nike Air Max 270 Top View" }
    ],
    rating: 4.5,
    numReviews: 89
  },
  {
    name: "Adidas Ultraboost 22",
    description: "The Adidas Ultraboost 22 features responsive Boost midsole technology and a Primeknit+ upper for a sock-like fit.",
    price: 180.00,
    discountPrice: 150.00,
    countInStock: 40,
    sku: "ADIDAS-ULTRABOOST-22-001",
    category: "Footwear",
    brand: "Adidas",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Gray", "Blue"],
    collectionName: "Athletic Footwear",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", altText: "Adidas Ultraboost 22 Side View" },
      { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", altText: "Adidas Ultraboost 22 Top View" }
    ],
    rating: 4.7,
    numReviews: 56
  },
  {
    name: "Jordan Air 1 Retro High",
    description: "The iconic Jordan Air 1 Retro High combines classic style with modern comfort. Features Air-Sole unit and premium leather upper.",
    price: 170.00,
    discountPrice: 145.00,
    countInStock: 35,
    sku: "JORDAN-AIR-1-001",
    category: "Footwear",
    brand: "Jordan",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Red", "Black", "White", "Blue"],
    collectionName: "Basketball Footwear",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop", altText: "Jordan Air 1 Retro High Side View" },
      { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", altText: "Jordan Air 1 Retro High Top View" }
    ],
    rating: 4.8,
    numReviews: 78
  },
  {
    name: "Converse Chuck Taylor All Star",
    description: "The timeless Converse Chuck Taylor All Star features a canvas upper and vulcanized rubber sole. A classic that never goes out of style.",
    price: 60.00,
    discountPrice: 45.00,
    countInStock: 60,
    sku: "CONVERSE-CHUCK-001",
    category: "Footwear",
    brand: "Converse",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black", "White", "Navy", "Red"],
    collectionName: "Casual Footwear",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop", altText: "Converse Chuck Taylor All Star Side View" },
      { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", altText: "Converse Chuck Taylor All Star Top View" }
    ],
    rating: 4.6,
    numReviews: 123
  },
  {
    name: "Vans Old Skool Classic",
    description: "The Vans Old Skool features the iconic side stripe and durable canvas upper. Perfect for skating and casual wear.",
    price: 65.00,
    discountPrice: 50.00,
    countInStock: 45,
    sku: "VANS-OLD-SKOOL-001",
    category: "Footwear",
    brand: "Vans",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black", "White", "Checkerboard", "Navy"],
    collectionName: "Skate Footwear",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", altText: "Vans Old Skool Classic Side View" },
      { url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop", altText: "Vans Old Skool Classic Top View" }
    ],
    rating: 4.5,
    numReviews: 98
  },
  {
    name: "New Balance 990v5",
    description: "The New Balance 990v5 features ENCAP midsole technology and premium suede upper. Made in the USA for superior quality, perfect for running and everyday comfort.",
    price: 190.00,
    discountPrice: 160.00,
    countInStock: 30,
    sku: "NEW-BALANCE-990V5-001",
    category: "Footwear",
    brand: "New Balance",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Grey", "Navy", "Black", "White"],
    collectionName: "Running Footwear",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop", altText: "New Balance 990v5 Side View" },
      { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", altText: "New Balance 990v5 Top View" }
    ],
    rating: 4.8,
    numReviews: 167
  },
  {
    name: "Puma RS-X",
    description: "The Puma RS-X features bold retro styling with enhanced cushioning. Perfect for making a statement with your outfit.",
    price: 99.99,
    discountPrice: 79.99,
    countInStock: 22,
    sku: "PUMA-RSX-001",
    category: "Footwear",
    brand: "Puma",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Red", "Blue"],
    collectionName: "Sneakers",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop", altText: "Puma RS-X Side View" },
      { url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop", altText: "Puma RS-X Top View" }
    ],
    rating: 4.4,
    numReviews: 145
  },
  {
    name: "Reebok Classic Leather",
    description: "The Reebok Classic features a leather upper and soft foam midsole. A timeless design that's comfortable for everyday wear.",
    price: 69.99,
    discountPrice: 54.99,
    countInStock: 25,
    sku: "REEBOK-CLASSIC-001",
    category: "Footwear",
    brand: "Reebok",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["White", "Black", "Navy", "Grey"],
    collectionName: "Casual Footwear",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", altText: "Reebok Classic Leather Side View" },
      { url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop", altText: "Reebok Classic Leather Top View" }
    ],
    rating: 4.3,
    numReviews: 134
  },
  {
    name: "ASICS Gel-Kayano 28",
    description: "The ASICS Gel-Kayano 28 offers stability and comfort for long-distance runners, featuring advanced cushioning technology.",
    price: 160.00,
    discountPrice: 135.00,
    countInStock: 18,
    sku: "ASICS-GEL-KAYANO-28-001",
    category: "Footwear",
    brand: "ASICS",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Blue", "Black", "White", "Orange"],
    collectionName: "Running Footwear",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop", altText: "ASICS Gel-Kayano 28 Side View" },
      { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", altText: "ASICS Gel-Kayano 28 Top View" }
    ],
    rating: 4.6,
    numReviews: 98
  },
  {
    name: "Saucony Endorphin Speed 3",
    description: "The Saucony Endorphin Speed 3 is a lightweight, responsive running shoe designed for speed and comfort.",
    price: 160.00,
    discountPrice: 140.00,
    countInStock: 20,
    sku: "SAUCONY-ENDORPHIN-3-001",
    category: "Footwear",
    brand: "Saucony",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White", "Blue", "Yellow", "Black"],
    collectionName: "Running Footwear",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", altText: "Saucony Endorphin Speed 3 Side View" },
      { url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop", altText: "Saucony Endorphin Speed 3 Top View" }
    ],
    rating: 4.7,
    numReviews: 77
  },
  {
    name: "Brooks Ghost 14",
    description: "The Brooks Ghost 14 is a neutral running shoe with soft cushioning and a smooth ride for daily training.",
    price: 130.00,
    discountPrice: 110.00,
    countInStock: 28,
    sku: "BROOKS-GHOST-14-001",
    category: "Footwear",
    brand: "Brooks",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Blue", "Red"],
    collectionName: "Running Footwear",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", altText: "Brooks Ghost 14 Side View" },
      { url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop", altText: "Brooks Ghost 14 Top View" }
    ],
    rating: 4.5,
    numReviews: 112
  },
  {
    name: "Hoka One One Clifton 8",
    description: "The Hoka Clifton 8 is known for its plush cushioning and lightweight feel, ideal for long runs and recovery days.",
    price: 140.00,
    discountPrice: 120.00,
    countInStock: 22,
    sku: "HOKA-CLIFTON-8-001",
    category: "Footwear",
    brand: "Hoka One One",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Blue", "Black", "White", "Green"],
    collectionName: "Running Footwear",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", altText: "Hoka Clifton 8 Side View" },
      { url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop", altText: "Hoka Clifton 8 Top View" }
    ],
    rating: 4.6,
    numReviews: 90
  },
  {
    name: "Mizuno Wave Rider 25",
    description: "The Mizuno Wave Rider 25 offers a responsive ride and durable construction for daily training and races.",
    price: 130.00,
    discountPrice: 110.00,
    countInStock: 18,
    sku: "MIZUNO-WAVE-RIDER-25-001",
    category: "Footwear",
    brand: "Mizuno",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Blue", "White", "Black", "Red"],
    collectionName: "Running Footwear",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", altText: "Mizuno Wave Rider 25 Side View" },
      { url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop", altText: "Mizuno Wave Rider 25 Top View" }
    ],
    rating: 4.4,
    numReviews: 85
  },
  {
    name: "Under Armour HOVR Phantom 2",
    description: "The UA HOVR Phantom 2 offers a sock-like fit and responsive cushioning for both running and training.",
    price: 140.00,
    discountPrice: 115.00,
    countInStock: 20,
    sku: "UA-HOVR-PHANTOM-2-001",
    category: "Footwear",
    brand: "Under Armour",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Red", "Blue"],
    collectionName: "Training Footwear",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", altText: "UA HOVR Phantom 2 Side View" },
      { url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop", altText: "UA HOVR Phantom 2 Top View" }
    ],
    rating: 4.5,
    numReviews: 73
  },
  {
    name: "Salomon Speedcross 5",
    description: "The Salomon Speedcross 5 is a trail running shoe with aggressive grip and precise foothold for off-road adventures.",
    price: 130.00,
    discountPrice: 110.00,
    countInStock: 15,
    sku: "SALOMON-SPEEDCROSS-5-001",
    category: "Footwear",
    brand: "Salomon",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "Red", "Blue", "Green"],
    collectionName: "Trail Footwear",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", altText: "Salomon Speedcross 5 Side View" },
      { url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop", altText: "Salomon Speedcross 5 Top View" }
    ],
    rating: 4.7,
    numReviews: 61
  },
  {
    name: "Merrell Moab 2 Ventilator",
    description: "The Merrell Moab 2 Ventilator is a hiking shoe with breathable mesh and durable suede for all-day comfort on the trails.",
    price: 110.00,
    discountPrice: 95.00,
    countInStock: 17,
    sku: "MERRELL-MOAB-2-001",
    category: "Footwear",
    brand: "Merrell",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Brown", "Black", "Gray"],
    collectionName: "Hiking Footwear",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", altText: "Merrell Moab 2 Side View" },
      { url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop", altText: "Merrell Moab 2 Top View" }
    ],
    rating: 4.6,
    numReviews: 54
  },
  {
    name: "Timberland 6-Inch Premium Boots",
    description: "The Timberland 6-Inch Premium Boots are waterproof and durable, perfect for work or outdoor adventures.",
    price: 198.00,
    discountPrice: 170.00,
    countInStock: 12,
    sku: "TIMBERLAND-6IN-001",
    category: "Footwear",
    brand: "Timberland",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Wheat", "Black", "Brown"],
    collectionName: "Boots",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", altText: "Timberland 6-Inch Premium Boots Side View" },
      { url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop", altText: "Timberland 6-Inch Premium Boots Top View" }
    ],
    rating: 4.8,
    numReviews: 102
  },
  {
    name: "Dr. Martens 1460",
    description: "The Dr. Martens 1460 is an iconic 8-eye boot with durable leather and signature yellow stitching.",
    price: 150.00,
    discountPrice: 130.00,
    countInStock: 20,
    sku: "DRMARTENS-1460-001",
    category: "Footwear",
    brand: "Dr. Martens",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black", "Cherry Red", "White"],
    collectionName: "Boots",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", altText: "Dr. Martens 1460 Side View" },
      { url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop", altText: "Dr. Martens 1460 Top View" }
    ],
    rating: 4.7,
    numReviews: 88
  },
  {
    name: "Birkenstock Arizona Sandals",
    description: "The Birkenstock Arizona features two adjustable straps and a contoured cork footbed for all-day comfort.",
    price: 99.95,
    discountPrice: 85.00,
    countInStock: 30,
    sku: "BIRKENSTOCK-ARIZONA-001",
    category: "Footwear",
    brand: "Birkenstock",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Brown", "Black", "White", "Blue"],
    collectionName: "Sandals",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", altText: "Birkenstock Arizona Side View" },
      { url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop", altText: "Birkenstock Arizona Top View" }
    ],
    rating: 4.5,
    numReviews: 77
  },
  {
    name: "Crocs Classic Clog",
    description: "The Crocs Classic Clog is lightweight, comfortable, and water-friendly, perfect for casual wear and outdoor activities.",
    price: 44.99,
    discountPrice: 35.00,
    countInStock: 60,
    sku: "CROCS-CLASSIC-001",
    category: "Footwear",
    brand: "Crocs",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Blue", "Pink"],
    collectionName: "Clogs",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", altText: "Crocs Classic Clog Side View" },
      { url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop", altText: "Crocs Classic Clog Top View" }
    ],
    rating: 4.3,
    numReviews: 120
  },
  {
    name: "UGG Classic Short II Boots",
    description: "The UGG Classic Short II Boots are crafted from sheepskin and suede for warmth and comfort in cold weather.",
    price: 170.00,
    discountPrice: 150.00,
    countInStock: 18,
    sku: "UGG-CLASSIC-SHORT-001",
    category: "Footwear",
    brand: "UGG",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Chestnut", "Black", "Grey", "Navy"],
    collectionName: "Boots",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", altText: "UGG Classic Short II Boots Side View" },
      { url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop", altText: "UGG Classic Short II Boots Top View" }
    ],
    rating: 4.6,
    numReviews: 65
  },
  {
    name: "Skechers D'Lites",
    description: "The Skechers D'Lites are lightweight, sporty sneakers with memory foam insoles for all-day comfort.",
    price: 69.99,
    discountPrice: 55.00,
    countInStock: 35,
    sku: "SKECHERS-DLITES-001",
    category: "Footwear",
    brand: "Skechers",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black", "White", "Pink", "Blue"],
    collectionName: "Sneakers",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", altText: "Skechers D'Lites Side View" },
      { url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop", altText: "Skechers D'Lites Top View" }
    ],
    rating: 4.4,
    numReviews: 88
  },
  {
    name: "Fila Disruptor II",
    description: "The Fila Disruptor II is a chunky sneaker with a retro vibe and comfortable EVA midsole.",
    price: 65.00,
    discountPrice: 52.00,
    countInStock: 28,
    sku: "FILA-DISRUPTOR-II-001",
    category: "Footwear",
    brand: "Fila",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["White", "Black", "Pink", "Blue"],
    collectionName: "Sneakers",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", altText: "Fila Disruptor II Side View" },
      { url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop", altText: "Fila Disruptor II Top View" }
    ],
    rating: 4.3,
    numReviews: 74
  },
  {
    name: "On Cloud X",
    description: "The On Cloud X is a versatile training shoe with responsive cushioning and a lightweight, breathable upper.",
    price: 140.00,
    discountPrice: 120.00,
    countInStock: 20,
    sku: "ON-CLOUD-X-001",
    category: "Footwear",
    brand: "On",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Blue", "Red"],
    collectionName: "Training Footwear",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", altText: "On Cloud X Side View" },
      { url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop", altText: "On Cloud X Top View" }
    ],
    rating: 4.5,
    numReviews: 59
  },
  {
    name: "Allbirds Wool Runner",
    description: "The Allbirds Wool Runner is made from sustainable merino wool for comfort and breathability.",
    price: 98.00,
    discountPrice: 85.00,
    countInStock: 25,
    sku: "ALLBIRDS-WOOL-RUNNER-001",
    category: "Footwear",
    brand: "Allbirds",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Gray", "Black", "White", "Blue"],
    collectionName: "Sneakers",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", altText: "Allbirds Wool Runner Side View" },
      { url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop", altText: "Allbirds Wool Runner Top View" }
    ],
    rating: 4.6,
    numReviews: 81
  },
  // ===== SMARTPHONES CATEGORY =====
  {
    name: "iPhone 15 Pro",
    description: "The iPhone 15 Pro features the most advanced camera system ever on iPhone, A17 Pro chip for gaming, and a stunning 6.1-inch Super Retina XDR display.",
    price: 999.99,
    discountPrice: 899.99,
    countInStock: 25,
    sku: "IPHONE-15-PRO-001",
    category: "Smartphones",
    brand: "Apple",
    sizes: ["128GB", "256GB", "512GB", "1TB"],
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    collectionName: "Premium Smartphones",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "iPhone 15 Pro Front View" },
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "iPhone 15 Pro Back View" }
    ],
    rating: 4.8,
    numReviews: 45
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "The Samsung Galaxy S24 Ultra features an advanced AI system, S Pen integration, and a professional-grade camera system for ultimate productivity.",
    price: 1299.99,
    discountPrice: 1199.99,
    countInStock: 20,
    sku: "GALAXY-S24-ULTRA-001",
    category: "Smartphones",
    brand: "Samsung",
    sizes: ["256GB", "512GB", "1TB"],
    colors: ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow"],
    collectionName: "Premium Smartphones",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Samsung Galaxy S24 Ultra Front View" },
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Samsung Galaxy S24 Ultra Back View" }
    ],
    rating: 4.7,
    numReviews: 28
  },
  {
    name: "Google Pixel 8 Pro",
    description: "The Google Pixel 8 Pro features advanced AI capabilities, exceptional camera system, and pure Android experience.",
    price: 899.99,
    discountPrice: 799.99,
    countInStock: 15,
    sku: "GOOGLE-PIXEL-8-PRO-001",
    category: "Smartphones",
    brand: "Google",
    sizes: ["128GB", "256GB", "512GB"],
    colors: ["Obsidian", "Porcelain", "Bay"],
    collectionName: "Premium Smartphones",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Google Pixel 8 Pro Front View" },
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Google Pixel 8 Pro Back View" }
    ],
    rating: 4.7,
    numReviews: 34
  },
  {
    name: "OnePlus 12",
    description: "The OnePlus 12 delivers flagship performance with Hasselblad camera system and fast charging technology.",
    price: 799.99,
    discountPrice: 699.99,
    countInStock: 18,
    sku: "ONEPLUS-12-001",
    category: "Smartphones",
    brand: "OnePlus",
    sizes: ["256GB", "512GB"],
    colors: ["Silk Black", "Silk White", "Flowy Emerald"],
    collectionName: "Premium Smartphones",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "OnePlus 12 Front View" },
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "OnePlus 12 Back View" }
    ],
    rating: 4.6,
    numReviews: 42
  },
  {
    name: "Xiaomi 14 Ultra",
    description: "The Xiaomi 14 Ultra features a Leica camera system, Snapdragon 8 Gen 3, and premium design with exceptional performance.",
    price: 899.99,
    discountPrice: 799.99,
    countInStock: 12,
    sku: "XIAOMI-14-ULTRA-001",
    category: "Smartphones",
    brand: "Xiaomi",
    sizes: ["256GB", "512GB", "1TB"],
    colors: ["Black", "White", "Green"],
    collectionName: "Premium Smartphones",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Xiaomi 14 Ultra Front View" },
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Xiaomi 14 Ultra Back View" }
    ],
    rating: 4.5,
    numReviews: 23
  },
  {
    name: "iPhone 15",
    description: "The iPhone 15 features a stunning 6.1-inch Super Retina XDR display, A16 Bionic chip, and advanced camera system.",
    price: 799.99,
    discountPrice: 699.99,
    countInStock: 30,
    sku: "IPHONE-15-001",
    category: "Smartphones",
    brand: "Apple",
    sizes: ["128GB", "256GB", "512GB"],
    colors: ["Black", "Blue", "Green", "Yellow", "Pink"],
    collectionName: "Premium Smartphones",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "iPhone 15 Front View" },
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "iPhone 15 Back View" }
    ],
    rating: 4.6,
    numReviews: 67
  },
  {
    name: "Samsung Galaxy S24+",
    description: "The Samsung Galaxy S24+ offers premium features with a large 6.7-inch display, advanced AI capabilities, and exceptional performance.",
    price: 999.99,
    discountPrice: 899.99,
    countInStock: 22,
    sku: "GALAXY-S24-PLUS-001",
    category: "Smartphones",
    brand: "Samsung",
    sizes: ["256GB", "512GB"],
    colors: ["Onyx Black", "Marble Gray", "Cobalt Violet", "Amber Yellow"],
    collectionName: "Premium Smartphones",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Samsung Galaxy S24+ Front View" },
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Samsung Galaxy S24+ Back View" }
    ],
    rating: 4.7,
    numReviews: 38
  },
  {
    name: "Google Pixel 8",
    description: "The Google Pixel 8 features AI-powered photography, pure Android experience, and advanced computational photography.",
    price: 699.99,
    discountPrice: 599.99,
    countInStock: 25,
    sku: "GOOGLE-PIXEL-8-001",
    category: "Smartphones",
    brand: "Google",
    sizes: ["128GB", "256GB"],
    colors: ["Obsidian", "Hazel", "Rose"],
    collectionName: "Premium Smartphones",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Google Pixel 8 Front View" },
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Google Pixel 8 Back View" }
    ],
    rating: 4.5,
    numReviews: 29
  },
  {
    name: "OnePlus 11",
    description: "The OnePlus 11 delivers flagship performance with Hasselblad camera system and 100W fast charging technology.",
    price: 699.99,
    discountPrice: 599.99,
    countInStock: 20,
    sku: "ONEPLUS-11-001",
    category: "Smartphones",
    brand: "OnePlus",
    sizes: ["128GB", "256GB"],
    colors: ["Titan Black", "Eternal Green", "Volcanic Red"],
    collectionName: "Premium Smartphones",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "OnePlus 11 Front View" },
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "OnePlus 11 Back View" }
    ],
    rating: 4.6,
    numReviews: 45
  },
  {
    name: "Xiaomi 13 Ultra",
    description: "The Xiaomi 13 Ultra features a Leica camera system, Snapdragon 8 Gen 2, and premium design with exceptional performance.",
    price: 799.99,
    discountPrice: 699.99,
    countInStock: 15,
    sku: "XIAOMI-13-ULTRA-001",
    category: "Smartphones",
    brand: "Xiaomi",
    sizes: ["256GB", "512GB", "1TB"],
    colors: ["Black", "White", "Green"],
    collectionName: "Premium Smartphones",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Xiaomi 13 Ultra Front View" },
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Xiaomi 13 Ultra Back View" }
    ],
    rating: 4.5,
    numReviews: 31
  },
  {
    name: "Nothing Phone 2",
    description: "The Nothing Phone 2 features a unique Glyph interface, clean design, and pure Android experience with innovative lighting.",
    price: 599.99,
    discountPrice: 499.99,
    countInStock: 18,
    sku: "NOTHING-PHONE-2-001",
    category: "Smartphones",
    brand: "Nothing",
    sizes: ["128GB", "256GB", "512GB"],
    colors: ["White", "Dark Gray"],
    collectionName: "Premium Smartphones",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Nothing Phone 2 Front View" },
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Nothing Phone 2 Back View" }
    ],
    rating: 4.4,
    numReviews: 27
  },
  {
    name: "ASUS ROG Phone 7",
    description: "The ASUS ROG Phone 7 is designed for gaming with high refresh rate display, advanced cooling, and gaming-specific features.",
    price: 899.99,
    discountPrice: 799.99,
    countInStock: 12,
    sku: "ASUS-ROG-PHONE-7-001",
    category: "Smartphones",
    brand: "ASUS",
    sizes: ["256GB", "512GB"],
    colors: ["Phantom Black", "Storm White"],
    collectionName: "Gaming Smartphones",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "ASUS ROG Phone 7 Front View" },
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "ASUS ROG Phone 7 Back View" }
    ],
    rating: 4.6,
    numReviews: 19
  },
  {
    name: "Motorola Edge 40",
    description: "The Motorola Edge 40 offers premium features with a curved display, fast charging, and clean Android experience.",
    price: 499.99,
    discountPrice: 399.99,
    countInStock: 25,
    sku: "MOTOROLA-EDGE-40-001",
    category: "Smartphones",
    brand: "Motorola",
    sizes: ["128GB", "256GB"],
    colors: ["Black", "Blue", "Green"],
    collectionName: "Premium Smartphones",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Motorola Edge 40 Front View" },
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Motorola Edge 40 Back View" }
    ],
    rating: 4.3,
    numReviews: 34
  },
  {
    name: "Sony Xperia 1 V",
    description: "The Sony Xperia 1 V features professional-grade camera capabilities, 4K display, and advanced audio features for content creators.",
    price: 1299.99,
    discountPrice: 1199.99,
    countInStock: 8,
    sku: "SONY-XPERIA-1-V-001",
    category: "Smartphones",
    brand: "Sony",
    sizes: ["256GB", "512GB"],
    colors: ["Black", "White", "Green"],
    collectionName: "Premium Smartphones",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Sony Xperia 1 V Front View" },
      { url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", altText: "Sony Xperia 1 V Back View" }
    ],
    rating: 4.7,
    numReviews: 16
  },
  // ===== LAPTOPS CATEGORY =====
  {
    name: "MacBook Air M2",
    description: "The MacBook Air with M2 chip delivers incredible performance, all-day battery life, and a stunning Liquid Retina display in a thin and light design.",
    price: 1199.99,
    discountPrice: 1099.99,
    countInStock: 15,
    sku: "MACBOOK-AIR-M2-001",
    category: "Laptops",
    brand: "Apple",
    sizes: ["256GB", "512GB", "1TB", "2TB"],
    colors: ["Space Gray", "Silver", "Starlight", "Midnight"],
    collectionName: "Premium Laptops",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "MacBook Air M2 Front View" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "MacBook Air M2 Side View" }
    ],
    rating: 4.9,
    numReviews: 32
  },
  {
    name: "Dell XPS 13 Plus",
    description: "The Dell XPS 13 Plus features a stunning 13.4-inch OLED display, 12th Gen Intel processors, and a premium design with innovative haptic touchpad.",
    price: 1399.99,
    discountPrice: 1299.99,
    countInStock: 12,
    sku: "DELL-XPS-13-PLUS-001",
    category: "Laptops",
    brand: "Dell",
    sizes: ["512GB", "1TB", "2TB"],
    colors: ["Platinum Silver", "Graphite"],
    collectionName: "Premium Laptops",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "Dell XPS 13 Plus Front View" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "Dell XPS 13 Plus Side View" }
    ],
    rating: 4.6,
    numReviews: 19
  },
  {
    name: "HP Spectre x360",
    description: "The HP Spectre x360 is a premium 2-in-1 laptop with stunning design, powerful performance, and versatile form factor.",
    price: 1399.99,
    discountPrice: 1299.99,
    countInStock: 10,
    sku: "HP-SPECTRE-X360-001",
    category: "Laptops",
    brand: "HP",
    sizes: ["512GB", "1TB", "2TB"],
    colors: ["Nightfall Black", "Poseidon Blue", "Natural Silver"],
    collectionName: "Premium Laptops",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "HP Spectre x360 Front View" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "HP Spectre x360 Side View" }
    ],
    rating: 4.7,
    numReviews: 28
  },
  {
    name: "Microsoft Surface Laptop 5",
    description: "The Microsoft Surface Laptop 5 combines elegant design with powerful performance for productivity and creativity.",
    price: 1199.99,
    discountPrice: 1099.99,
    countInStock: 8,
    sku: "MICROSOFT-SURFACE-LAPTOP-5-001",
    category: "Laptops",
    brand: "Microsoft",
    sizes: ["256GB", "512GB", "1TB"],
    colors: ["Platinum", "Matte Black", "Sage", "Sandstone"],
    collectionName: "Premium Laptops",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "Microsoft Surface Laptop 5 Front View" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "Microsoft Surface Laptop 5 Side View" }
    ],
    rating: 4.5,
    numReviews: 15
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    description: "The Lenovo ThinkPad X1 Carbon is the ultimate business laptop with premium build quality, exceptional keyboard, and enterprise-grade security.",
    price: 1499.99,
    discountPrice: 1399.99,
    countInStock: 6,
    sku: "LENOVO-THINKPAD-X1-CARBON-001",
    category: "Laptops",
    brand: "Lenovo",
    sizes: ["512GB", "1TB", "2TB"],
    colors: ["Black", "Silver"],
    collectionName: "Business Laptops",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "Lenovo ThinkPad X1 Carbon Front View" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "Lenovo ThinkPad X1 Carbon Side View" }
    ],
    rating: 4.8,
    numReviews: 41
  },
  {
    name: "ASUS ROG Zephyrus G14",
    description: "The ASUS ROG Zephyrus G14 is a powerful gaming laptop with AMD Ryzen processors and NVIDIA RTX graphics in a compact 14-inch form factor.",
    price: 1499.99,
    discountPrice: 1399.99,
    countInStock: 8,
    sku: "ASUS-ROG-ZEPHYRUS-G14-001",
    category: "Laptops",
    brand: "ASUS",
    sizes: ["512GB", "1TB", "2TB"],
    colors: ["Moonlight White", "Eclipse Gray"],
    collectionName: "Gaming Laptops",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "ASUS ROG Zephyrus G14 Front View" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "ASUS ROG Zephyrus G14 Side View" }
    ],
    rating: 4.7,
    numReviews: 23
  },
  {
    name: "Razer Blade 15",
    description: "The Razer Blade 15 is a premium gaming laptop with sleek aluminum design, high refresh rate displays, and powerful graphics.",
    price: 1999.99,
    discountPrice: 1799.99,
    countInStock: 5,
    sku: "RAZER-BLADE-15-001",
    category: "Laptops",
    brand: "Razer",
    sizes: ["512GB", "1TB", "2TB"],
    colors: ["Black"],
    collectionName: "Gaming Laptops",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "Razer Blade 15 Front View" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "Razer Blade 15 Side View" }
    ],
    rating: 4.6,
    numReviews: 18
  },
  {
    name: "Acer Swift 3",
    description: "The Acer Swift 3 offers excellent value with AMD Ryzen processors, all-day battery life, and lightweight design for productivity.",
    price: 699.99,
    discountPrice: 599.99,
    countInStock: 20,
    sku: "ACER-SWIFT-3-001",
    category: "Laptops",
    brand: "Acer",
    sizes: ["256GB", "512GB", "1TB"],
    colors: ["Silver", "Blue"],
    collectionName: "Budget Laptops",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "Acer Swift 3 Front View" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "Acer Swift 3 Side View" }
    ],
    rating: 4.3,
    numReviews: 45
  },
  {
    name: "MSI GS66 Stealth",
    description: "The MSI GS66 Stealth is a thin and light gaming laptop with powerful performance and professional aesthetics.",
    price: 1699.99,
    discountPrice: 1499.99,
    countInStock: 7,
    sku: "MSI-GS66-STEALTH-001",
    category: "Laptops",
    brand: "MSI",
    sizes: ["512GB", "1TB", "2TB"],
    colors: ["Black"],
    collectionName: "Gaming Laptops",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "MSI GS66 Stealth Front View" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "MSI GS66 Stealth Side View" }
    ],
    rating: 4.5,
    numReviews: 16
  },
  {
    name: "Alienware x15 R2",
    description: "The Alienware x15 R2 is a premium gaming laptop with cutting-edge technology, advanced cooling, and stunning RGB lighting.",
    price: 2499.99,
    discountPrice: 2299.99,
    countInStock: 4,
    sku: "ALIENWARE-X15-R2-001",
    category: "Laptops",
    brand: "Alienware",
    sizes: ["512GB", "1TB", "2TB"],
    colors: ["Lunar Light", "Dark Side of the Moon"],
    collectionName: "Gaming Laptops",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "Alienware x15 R2 Front View" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "Alienware x15 R2 Side View" }
    ],
    rating: 4.8,
    numReviews: 12
  },
  {
    name: "MacBook Pro 14-inch M3",
    description: "The MacBook Pro 14-inch with M3 chip delivers exceptional performance for professionals with stunning Liquid Retina XDR display.",
    price: 1999.99,
    discountPrice: 1899.99,
    countInStock: 6,
    sku: "MACBOOK-PRO-14-M3-001",
    category: "Laptops",
    brand: "Apple",
    sizes: ["512GB", "1TB", "2TB", "4TB"],
    colors: ["Space Gray", "Silver"],
    collectionName: "Premium Laptops",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "MacBook Pro 14-inch M3 Front View" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "MacBook Pro 14-inch M3 Side View" }
    ],
    rating: 4.9,
    numReviews: 28
  },
  {
    name: "Dell Inspiron 15 3000",
    description: "The Dell Inspiron 15 3000 offers reliable performance and essential features for everyday computing at an affordable price.",
    price: 499.99,
    discountPrice: 449.99,
    countInStock: 25,
    sku: "DELL-INSPIRON-15-3000-001",
    category: "Laptops",
    brand: "Dell",
    sizes: ["256GB", "512GB"],
    colors: ["Black", "Silver"],
    collectionName: "Budget Laptops",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "Dell Inspiron 15 3000 Front View" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "Dell Inspiron 15 3000 Side View" }
    ],
    rating: 4.2,
    numReviews: 67
  },
  {
    name: "HP Pavilion 15",
    description: "The HP Pavilion 15 combines style and performance with a modern design, powerful processors, and vibrant displays.",
    price: 649.99,
    discountPrice: 579.99,
    countInStock: 18,
    sku: "HP-PAVILION-15-001",
    category: "Laptops",
    brand: "HP",
    sizes: ["256GB", "512GB", "1TB"],
    colors: ["Natural Silver", "Fog Blue", "Mineral Silver"],
    collectionName: "Budget Laptops",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "HP Pavilion 15 Front View" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "HP Pavilion 15 Side View" }
    ],
    rating: 4.4,
    numReviews: 52
  },
  {
    name: "Lenovo IdeaPad 3",
    description: "The Lenovo IdeaPad 3 offers reliable performance for everyday tasks with a comfortable keyboard and long battery life.",
    price: 399.99,
    discountPrice: 349.99,
    countInStock: 30,
    sku: "LENOVO-IDEAPAD-3-001",
    category: "Laptops",
    brand: "Lenovo",
    sizes: ["256GB", "512GB"],
    colors: ["Abyss Blue", "Platinum Gray"],
    collectionName: "Budget Laptops",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "Lenovo IdeaPad 3 Front View" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "Lenovo IdeaPad 3 Side View" }
    ],
    rating: 4.1,
    numReviews: 89
  },
  {
    name: "ASUS VivoBook S15",
    description: "The ASUS VivoBook S15 features a sleek design, powerful performance, and innovative features like the NumberPad for productivity.",
    price: 799.99,
    discountPrice: 699.99,
    countInStock: 15,
    sku: "ASUS-VIVOBOOK-S15-001",
    category: "Laptops",
    brand: "ASUS",
    sizes: ["256GB", "512GB", "1TB"],
    colors: ["Transparent Silver", "Coral Crush", "Indie Black"],
    collectionName: "Budget Laptops",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "ASUS VivoBook S15 Front View" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", altText: "ASUS VivoBook S15 Side View" }
    ],
    rating: 4.3,
    numReviews: 41
  },
  // ===== HOME APPLIANCES CATEGORY =====
  {
    name: "Samsung 65-inch QLED 4K Smart TV",
    description: "The Samsung QLED 4K Smart TV delivers stunning picture quality with Quantum Dot technology and smart features for the ultimate viewing experience.",
    price: 1299.99,
    discountPrice: 1099.99,
    countInStock: 8,
    sku: "SAMSUNG-QLED-65-001",
    category: "Home Appliances",
    brand: "Samsung",
    sizes: ["65-inch"],
    colors: ["Black"],
    collectionName: "Smart TVs",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop", altText: "Samsung QLED TV Front View" },
      { url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop", altText: "Samsung QLED TV Side View" }
    ],
    rating: 4.7,
    numReviews: 67
  },
  {
    name: "LG OLED C3 Series 55-inch",
    description: "The LG OLED C3 Series delivers perfect blacks, infinite contrast, and exceptional picture quality with AI-powered features.",
    price: 1999.99,
    discountPrice: 1799.99,
    countInStock: 5,
    sku: "LG-OLED-C3-55-001",
    category: "Home Appliances",
    brand: "LG",
    sizes: ["55-inch"],
    colors: ["Black"],
    collectionName: "Smart TVs",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop", altText: "LG OLED C3 Front View" },
      { url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop", altText: "LG OLED C3 Side View" }
    ],
    rating: 4.9,
    numReviews: 89
  },
  {
    name: "Bosch 800 Series Refrigerator",
    description: "The Bosch 800 Series refrigerator features advanced cooling technology, spacious design, and energy-efficient operation for modern kitchens.",
    price: 2499.99,
    discountPrice: 2199.99,
    countInStock: 3,
    sku: "BOSCH-800-FRIDGE-001",
    category: "Home Appliances",
    brand: "Bosch",
    sizes: ["36-inch"],
    colors: ["Stainless Steel", "Black Stainless"],
    collectionName: "Kitchen Appliances",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1571171637578-41bc2bd41cd2?w=400&h=400&fit=crop", altText: "Bosch Refrigerator Front View" },
      { url: "https://images.unsplash.com/photo-1571171637578-41bc2bd41cd2?w=400&h=400&fit=crop", altText: "Bosch Refrigerator Interior View" }
    ],
    rating: 4.6,
    numReviews: 34
  },
  {
    name: "Whirlpool Front Load Washer",
    description: "The Whirlpool Front Load Washer offers superior cleaning performance, large capacity, and advanced features for efficient laundry care.",
    price: 899.99,
    discountPrice: 799.99,
    countInStock: 12,
    sku: "WHIRLPOOL-WASHER-001",
    category: "Home Appliances",
    brand: "Whirlpool",
    sizes: ["4.5 cu ft"],
    colors: ["White", "Stainless Steel"],
    collectionName: "Laundry Appliances",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", altText: "Whirlpool Washer Front View" },
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", altText: "Whirlpool Washer Side View" }
    ],
    rating: 4.5,
    numReviews: 56
  },
  {
    name: "KitchenAid Stand Mixer",
    description: "The KitchenAid Stand Mixer is the ultimate kitchen companion with powerful motor, versatile attachments, and iconic design for professional results.",
    price: 399.99,
    discountPrice: 349.99,
    countInStock: 25,
    sku: "KITCHENAID-MIXER-001",
    category: "Home Appliances",
    brand: "KitchenAid",
    sizes: ["5 qt"],
    colors: ["Empire Red", "Black", "White", "Silver"],
    collectionName: "Kitchen Appliances",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", altText: "KitchenAid Mixer Front View" },
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", altText: "KitchenAid Mixer Side View" }
    ],
    rating: 4.8,
    numReviews: 123
  },
  {
    name: "Dyson V15 Detect Cordless Vacuum",
    description: "The Dyson V15 Detect features laser technology to reveal hidden dust, powerful suction, and intelligent cleaning modes for spotless floors.",
    price: 699.99,
    discountPrice: 599.99,
    countInStock: 15,
    sku: "DYSON-V15-DETECT-001",
    category: "Home Appliances",
    brand: "Dyson",
    sizes: ["One Size"],
    colors: ["Nickel", "Gold"],
    collectionName: "Cleaning Appliances",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", altText: "Dyson V15 Detect Front View" },
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", altText: "Dyson V15 Detect Side View" }
    ],
    rating: 4.7,
    numReviews: 78
  },
  {
    name: "Breville Barista Express Espresso Machine",
    description: "The Breville Barista Express combines a built-in conical burr grinder with a 15-bar Italian pump for cafe-quality espresso at home.",
    price: 699.99,
    discountPrice: 599.99,
    countInStock: 10,
    sku: "BREVILLE-BARISTA-EXPRESS-001",
    category: "Home Appliances",
    brand: "Breville",
    sizes: ["One Size"],
    colors: ["Stainless Steel", "Black"],
    collectionName: "Kitchen Appliances",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", altText: "Breville Barista Express Front View" },
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", altText: "Breville Barista Express Side View" }
    ],
    rating: 4.8,
    numReviews: 92
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "The Sony WH-1000XM5 headphones deliver industry-leading noise cancellation, exceptional sound quality, and premium comfort for extended listening.",
    price: 399.99,
    discountPrice: 349.99,
    countInStock: 30,
    sku: "SONY-WH-1000XM5-001",
    category: "Home Appliances",
    brand: "Sony",
    sizes: ["One Size"],
    colors: ["Black", "Silver"],
    collectionName: "Premium Audio",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", altText: "Sony WH-1000XM5 Headphones" },
      { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", altText: "Sony WH-1000XM5 Headphones Side View" }
    ],
    rating: 4.8,
    numReviews: 67
  },
  {
    name: "Bose QuietComfort 45",
    description: "The Bose QuietComfort 45 headphones provide world-class noise cancellation and premium comfort for extended listening sessions.",
    price: 329.99,
    discountPrice: 299.99,
    countInStock: 25,
    sku: "BOSE-QC45-001",
    category: "Home Appliances",
    brand: "Bose",
    sizes: ["One Size"],
    colors: ["Black", "White", "Blue"],
    collectionName: "Premium Audio",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", altText: "Bose QuietComfort 45 Headphones" },
      { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", altText: "Bose QuietComfort 45 Headphones Side View" }
    ],
    rating: 4.6,
    numReviews: 89
  },
  {
    name: "Samsung Galaxy Tab S9",
    description: "The Samsung Galaxy Tab S9 features a stunning AMOLED display, S Pen support, and powerful performance for productivity and entertainment.",
    price: 799.99,
    discountPrice: 699.99,
    countInStock: 18,
    sku: "SAMSUNG-TAB-S9-001",
    category: "Home Appliances",
    brand: "Samsung",
    sizes: ["128GB", "256GB", "512GB"],
    colors: ["Graphite", "Beige", "Navy"],
    collectionName: "Tablets",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop", altText: "Samsung Galaxy Tab S9 Front View" },
      { url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop", altText: "Samsung Galaxy Tab S9 Side View" }
    ],
    rating: 4.5,
    numReviews: 45
  },
  {
    name: "Apple iPad Pro 12.9-inch",
    description: "The Apple iPad Pro 12.9-inch features the M2 chip, Liquid Retina XDR display, and Apple Pencil support for ultimate creativity and productivity.",
    price: 1099.99,
    discountPrice: 999.99,
    countInStock: 12,
    sku: "APPLE-IPAD-PRO-12-001",
    category: "Home Appliances",
    brand: "Apple",
    sizes: ["128GB", "256GB", "512GB", "1TB"],
    colors: ["Space Gray", "Silver"],
    collectionName: "Tablets",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop", altText: "Apple iPad Pro 12.9-inch Front View" },
      { url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop", altText: "Apple iPad Pro 12.9-inch Side View" }
    ],
    rating: 4.7,
    numReviews: 67
  },
  {
    name: "DJI Mini 3 Pro Drone",
    description: "The DJI Mini 3 Pro drone features 4K video recording, obstacle avoidance, and extended flight time for stunning aerial photography and videography.",
    price: 759.99,
    discountPrice: 699.99,
    countInStock: 8,
    sku: "DJI-MINI-3-PRO-001",
    category: "Home Appliances",
    brand: "DJI",
    sizes: ["One Size"],
    colors: ["Gray"],
    collectionName: "Drones",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=400&fit=crop", altText: "DJI Mini 3 Pro Drone Front View" },
      { url: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=400&fit=crop", altText: "DJI Mini 3 Pro Drone Side View" }
    ],
    rating: 4.6,
    numReviews: 34
  },
  {
    name: "Instant Pot Duo 7-in-1",
    description: "The Instant Pot Duo combines 7 kitchen appliances in one: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer.",
    price: 99.99,
    discountPrice: 79.99,
    countInStock: 40,
    sku: "INSTANT-POT-DUO-001",
    category: "Home Appliances",
    brand: "Instant Pot",
    sizes: ["6 qt"],
    colors: ["Stainless Steel", "Black"],
    collectionName: "Kitchen Appliances",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", altText: "Instant Pot Duo Front View" },
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", altText: "Instant Pot Duo Side View" }
    ],
    rating: 4.7,
    numReviews: 234
  },
  {
    name: "Ninja Foodi 9-in-1 Deluxe",
    description: "The Ninja Foodi combines pressure cooking, air frying, and 7 other functions for versatile cooking with crispy results and tender meals.",
    price: 199.99,
    discountPrice: 169.99,
    countInStock: 22,
    sku: "NINJA-FOODI-9IN1-001",
    category: "Home Appliances",
    brand: "Ninja",
    sizes: ["8 qt"],
    colors: ["Stainless Steel", "Black"],
    collectionName: "Kitchen Appliances",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", altText: "Ninja Foodi Front View" },
      { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", altText: "Ninja Foodi Side View" }
    ],
    rating: 4.6,
    numReviews: 156
  },
  // ===== BEAUTY & FASHION CATEGORY =====
  {
    name: "Dyson Airwrap Multi-Styler",
    description: "The Dyson Airwrap Multi-Styler uses Coanda airflow to style hair without extreme heat, creating curls, waves, and smooth styles with one tool.",
    price: 599.99,
    discountPrice: 549.99,
    countInStock: 12,
    sku: "DYSON-AIRWRAP-001",
    category: "Beauty & Fashion",
    brand: "Dyson",
    sizes: ["One Size"],
    colors: ["Nickel", "Copper", "Pink"],
    collectionName: "Hair Care",
    gender: "female",
    images: [
      { url: "https://images.unsplash.com/photo-1522338140263-f46f5913618a?w=400&h=400&fit=crop", altText: "Dyson Airwrap Multi-Styler" },
      { url: "https://images.unsplash.com/photo-1522338140263-f46f5913618a?w=400&h=400&fit=crop", altText: "Dyson Airwrap Multi-Styler Side View" }
    ],
    rating: 4.8,
    numReviews: 89
  },
  {
    name: "Apple Watch Series 9",
    description: "The Apple Watch Series 9 features advanced health monitoring, fitness tracking, and seamless integration with iPhone for a connected lifestyle.",
    price: 399.99,
    discountPrice: 349.99,
    countInStock: 25,
    sku: "APPLE-WATCH-SERIES-9-001",
    category: "Beauty & Fashion",
    brand: "Apple",
    sizes: ["41mm", "45mm"],
    colors: ["Midnight", "Starlight", "Pink", "Blue", "Red"],
    collectionName: "Smartwatches",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop", altText: "Apple Watch Series 9 Front View" },
      { url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop", altText: "Apple Watch Series 9 Side View" }
    ],
    rating: 4.7,
    numReviews: 156
  },
  {
    name: "Samsung Galaxy Watch 6",
    description: "The Samsung Galaxy Watch 6 offers advanced health monitoring, fitness tracking, and seamless connectivity with Android devices.",
    price: 349.99,
    discountPrice: 299.99,
    countInStock: 20,
    sku: "SAMSUNG-GALAXY-WATCH-6-001",
    category: "Beauty & Fashion",
    brand: "Samsung",
    sizes: ["40mm", "44mm"],
    colors: ["Graphite", "Silver", "Gold"],
    collectionName: "Smartwatches",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop", altText: "Samsung Galaxy Watch 6 Front View" },
      { url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop", altText: "Samsung Galaxy Watch 6 Side View" }
    ],
    rating: 4.6,
    numReviews: 78
  },
  {
    name: "Ray-Ban Meta Smart Glasses",
    description: "The Ray-Ban Meta Smart Glasses combine classic Ray-Ban styling with advanced technology for hands-free communication and content capture.",
    price: 299.99,
    discountPrice: 249.99,
    countInStock: 15,
    sku: "RAYBAN-META-SMART-001",
    category: "Beauty & Fashion",
    brand: "Ray-Ban",
    sizes: ["One Size"],
    colors: ["Black", "Brown", "Blue"],
    collectionName: "Smart Glasses",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop", altText: "Ray-Ban Meta Smart Glasses Front View" },
      { url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop", altText: "Ray-Ban Meta Smart Glasses Side View" }
    ],
    rating: 4.5,
    numReviews: 45
  },
  {
    name: "Dior Rouge Lipstick Set",
    description: "The Dior Rouge Lipstick Set features iconic shades with long-lasting color, moisturizing formula, and luxurious packaging for the perfect pout.",
    price: 89.99,
    discountPrice: 74.99,
    countInStock: 30,
    sku: "DIOR-ROUGE-LIPSTICK-001",
    category: "Beauty & Fashion",
    brand: "Dior",
    sizes: ["3.5g"],
    colors: ["Red", "Pink", "Nude", "Coral"],
    collectionName: "Makeup",
    gender: "female",
    images: [
      { url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop", altText: "Dior Rouge Lipstick Set" },
      { url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop", altText: "Dior Rouge Lipstick Set Side View" }
    ],
    rating: 4.7,
    numReviews: 234
  },
  {
    name: "Chanel N°5 Eau de Parfum",
    description: "Chanel N°5 is the world's most iconic fragrance, featuring a sophisticated blend of rose, jasmine, and aldehydes for timeless elegance.",
    price: 135.00,
    discountPrice: 115.00,
    countInStock: 18,
    sku: "CHANEL-N5-PARFUM-001",
    category: "Beauty & Fashion",
    brand: "Chanel",
    sizes: ["50ml", "100ml"],
    colors: ["Amber"],
    collectionName: "Fragrances",
    gender: "female",
    images: [
      { url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop", altText: "Chanel N°5 Eau de Parfum" },
      { url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop", altText: "Chanel N°5 Eau de Parfum Side View" }
    ],
    rating: 4.8,
    numReviews: 567
  },
  {
    name: "La Mer Moisturizing Cream",
    description: "La Mer Moisturizing Cream is a luxurious face cream with Miracle Broth™ and marine ingredients for intense hydration and skin renewal.",
    price: 350.00,
    discountPrice: 315.00,
    countInStock: 8,
    sku: "LAMER-MOISTURIZER-001",
    category: "Beauty & Fashion",
    brand: "La Mer",
    sizes: ["30ml", "60ml", "100ml"],
    colors: ["White"],
    collectionName: "Skincare",
    gender: "female",
    images: [
      { url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop", altText: "La Mer Moisturizing Cream" },
      { url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop", altText: "La Mer Moisturizing Cream Side View" }
    ],
    rating: 4.9,
    numReviews: 189
  },
  {
    name: "Hermès Birkin Bag",
    description: "The Hermès Birkin bag is the ultimate luxury handbag, handcrafted from the finest leather with impeccable attention to detail and timeless design.",
    price: 12000.00,
    discountPrice: 10800.00,
    countInStock: 2,
    sku: "HERMES-BIRKIN-001",
    category: "Beauty & Fashion",
    brand: "Hermès",
    sizes: ["30cm", "35cm", "40cm"],
    colors: ["Black", "Brown", "Beige", "Red"],
    collectionName: "Luxury Bags",
    gender: "female",
    images: [
      { url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop", altText: "Hermès Birkin Bag Front View" },
      { url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop", altText: "Hermès Birkin Bag Side View" }
    ],
    rating: 5.0,
    numReviews: 23
  },
  {
    name: "Rolex Submariner",
    description: "The Rolex Submariner is the world's most iconic diving watch, featuring water resistance to 300 meters and timeless design for any occasion.",
    price: 9500.00,
    discountPrice: 8550.00,
    countInStock: 1,
    sku: "ROLEX-SUBMARINER-001",
    category: "Beauty & Fashion",
    brand: "Rolex",
    sizes: ["40mm"],
    colors: ["Stainless Steel", "Yellow Gold", "Two-Tone"],
    collectionName: "Luxury Watches",
    gender: "male",
    images: [
      { url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop", altText: "Rolex Submariner Front View" },
      { url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop", altText: "Rolex Submariner Side View" }
    ],
    rating: 5.0,
    numReviews: 45
  },
  {
    name: "Tom Ford Black Orchid",
    description: "Tom Ford Black Orchid is a luxurious oriental fragrance with notes of black truffle, ylang ylang, and patchouli for an unforgettable scent.",
    price: 150.00,
    discountPrice: 135.00,
    countInStock: 12,
    sku: "TOM-FORD-BLACK-ORCHID-001",
    category: "Beauty & Fashion",
    brand: "Tom Ford",
    sizes: ["50ml", "100ml"],
    colors: ["Black"],
    collectionName: "Fragrances",
    gender: "unisex",
    images: [
      { url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop", altText: "Tom Ford Black Orchid" },
      { url: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop", altText: "Tom Ford Black Orchid Side View" }
    ],
    rating: 4.7,
    numReviews: 234
  },
  {
    name: "YSL Saint Laurent Bag",
    description: "The YSL Saint Laurent bag features iconic YSL hardware, premium leather construction, and versatile design for everyday elegance.",
    price: 1290.00,
    discountPrice: 1161.00,
    countInStock: 8,
    sku: "YSL-SAINT-LAURENT-BAG-001",
    category: "Beauty & Fashion",
    brand: "Saint Laurent",
    sizes: ["Medium", "Large"],
    colors: ["Black", "Beige", "Red"],
    collectionName: "Luxury Bags",
    gender: "female",
    images: [
      { url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop", altText: "YSL Saint Laurent Bag Front View" },
      { url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop", altText: "YSL Saint Laurent Bag Side View" }
    ],
    rating: 4.8,
    numReviews: 156
  },
  {
    name: "Cartier Love Bracelet",
    description: "The Cartier Love Bracelet is an iconic piece of jewelry featuring a screw motif and comes with a special screwdriver for a unique locking mechanism.",
    price: 6500.00,
    discountPrice: 5850.00,
    countInStock: 3,
    sku: "CARTIER-LOVE-BRACELET-001",
    category: "Beauty & Fashion",
    brand: "Cartier",
    sizes: ["16", "17", "18", "19", "20"],
    colors: ["Yellow Gold", "White Gold", "Rose Gold"],
    collectionName: "Luxury Jewelry",
    gender: "female",
    images: [
      { url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop", altText: "Cartier Love Bracelet" },
      { url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop", altText: "Cartier Love Bracelet Side View" }
    ],
    rating: 4.9,
    numReviews: 89
  },
  {
    name: "Dyson Supersonic Hair Dryer",
    description: "The Dyson Supersonic Hair Dryer uses intelligent heat control to protect hair from extreme heat damage while drying hair quickly and efficiently.",
    price: 429.99,
    discountPrice: 399.99,
    countInStock: 20,
    sku: "DYSON-SUPERSONIC-001",
    category: "Beauty & Fashion",
    brand: "Dyson",
    sizes: ["One Size"],
    colors: ["Nickel", "Copper", "Pink"],
    collectionName: "Hair Care",
    gender: "female",
    images: [
      { url: "https://lnk.ink/Zo9Wt", altText: "Dyson Supersonic Hair Dryer" },
      { url: "https://lnk.ink/Zo9Wt", altText: "Dyson Supersonic Hair Dryer Side View" }
    ],
    rating: 4.7,
    numReviews: 345
  },
  {
    name: "Louis Vuitton Neverfull Bag",
    description: "The Louis Vuitton Neverfull bag is a spacious tote with iconic Monogram canvas, leather trim, and versatile design for everyday use.",
    price: 1400.00,
    discountPrice: 1260.00,
    countInStock: 5,
    sku: "LOUIS-VUITTON-NEVERFULL-001",
    category: "Beauty & Fashion",
    brand: "Louis Vuitton",
    sizes: ["MM", "GM"],
    colors: ["Monogram", "Damier Azur", "Damier Ebene"],
    collectionName: "Luxury Bags",
    gender: "female",
    images: [
      { url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop", altText: "Louis Vuitton Neverfull Bag Front View" },
      { url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop", altText: "Louis Vuitton Neverfull Bag Side View" }
    ],
    rating: 4.8,
    numReviews: 234
  },
  {
    name: "Omega Speedmaster Professional",
    description: "The Omega Speedmaster Professional is the legendary Moonwatch, worn by astronauts on the moon and featuring precise chronograph functionality.",
    price: 6300.00,
    discountPrice: 5670.00,
    countInStock: 2,
    sku: "OMEGA-SPEEDMASTER-001",
    category: "Beauty & Fashion",
    brand: "Omega",
    sizes: ["42mm"],
    colors: ["Stainless Steel"],
    collectionName: "Luxury Watches",
    gender: "male",
    images: [
      { url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop", altText: "Omega Speedmaster Professional Front View" },
      { url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop", altText: "Omega Speedmaster Professional Side View" }
    ],
    rating: 4.9,
    numReviews: 67
  }
];

module.exports = products; 