import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
}, { _id: true });

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  subCategories: {
    type: [subCategorySchema],
    required: true,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: 'At least one subcategory is required',
    },
  },
}, {
  timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
