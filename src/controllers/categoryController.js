import Category from '../models/Category.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createCategory = asyncHandler(async (req, res) => {
  const { name, subCategories } = req.body;

  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    throw new ApiError(400, 'Category already exists with this name');
  }

  const category = await Category.create({ name, subCategories });

  res.status(201).json(new ApiResponse(201, 'Category created successfully', category));
});

export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.json(new ApiResponse(200, 'Categories retrieved successfully', categories));
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  res.json(new ApiResponse(200, 'Category retrieved successfully', category));
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, subCategories } = req.body;

  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  if (name && name !== category.name) {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      throw new ApiError(400, 'Category already exists with this name');
    }
    category.name = name;
  }

  if (subCategories) {
    category.subCategories = subCategories;
  }

  await category.save();

  res.json(new ApiResponse(200, 'Category updated successfully', category));
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  res.json(new ApiResponse(200, 'Category deleted successfully'));
});
