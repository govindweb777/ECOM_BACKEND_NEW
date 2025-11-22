import Product from '../models/Product.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json(new ApiResponse(201, 'Product created successfully', product));
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, category, subCategoryId, minPrice, maxPrice, search } = req.query;

  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (subCategoryId) {
    filter.subCategoryId = subCategoryId;
  }

  if (minPrice || maxPrice) {
    filter.discountPrice = {};
    if (minPrice) filter.discountPrice.$gte = Number(minPrice);
    if (maxPrice) filter.discountPrice.$lte = Number(maxPrice);
  }

  if (search) {
    filter.$or = [
      { productName: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const products = await Product.find(filter)
    .populate('category', 'name')
    .limit(Number(limit))
    .skip(skip)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(filter);

  res.json(
    new ApiResponse(200, 'Products retrieved successfully', {
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    })
  );
});

export const getActiveProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true, hideProduct: false }).populate('category', 'name');

  res.json(new ApiResponse(200, 'Active products retrieved successfully', products));
});

export const getBestSellerProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ bestSeller: true, isActive: true, hideProduct: false })
    .populate('category', 'name')
    .limit(10);

  res.json(new ApiResponse(200, 'Best seller products retrieved successfully', products));
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate('category', 'name subCategories');
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  res.json(new ApiResponse(200, 'Product retrieved successfully', product));
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  Object.keys(req.body).forEach((key) => {
    product[key] = req.body[key];
  });

  await product.save();

  res.json(new ApiResponse(200, 'Product updated successfully', product));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  res.json(new ApiResponse(200, 'Product deleted successfully'));
});

export const toggleProductStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  product.isActive = !product.isActive;
  await product.save();

  res.json(new ApiResponse(200, `Product ${product.isActive ? 'activated' : 'deactivated'} successfully`, product));
});

export const toggleBestSeller = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  product.bestSeller = !product.bestSeller;
  await product.save();

  res.json(new ApiResponse(200, `Product ${product.bestSeller ? 'marked' : 'unmarked'} as bestseller`, product));
});

export const toggleHideProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  product.hideProduct = !product.hideProduct;
  await product.save();

  res.json(new ApiResponse(200, `Product ${product.hideProduct ? 'hidden' : 'visible'}`, product));
});

export const updateStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, operation } = req.body;

  if (!quantity || !operation || !['add', 'remove'].includes(operation)) {
    throw new ApiError(400, 'Invalid quantity or operation');
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  if (operation === 'add') {
    product.stock += Number(quantity);
  } else if (operation === 'remove') {
    if (product.stock < Number(quantity)) {
      throw new ApiError(400, 'Insufficient stock');
    }
    product.stock -= Number(quantity);
  }

  await product.save();

  res.json(new ApiResponse(200, 'Stock updated successfully', product));
});
