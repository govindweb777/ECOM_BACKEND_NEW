import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@ecommerce.com',
      password: 'admin123',
      role: 'admin',
      isActive: true,
    });
    console.log('Admin user created:', adminUser.email);

    const userpannelUser = await User.create({
      firstName: 'Panel',
      lastName: 'User',
      email: 'panel@ecommerce.com',
      password: 'panel123',
      role: 'userpannel',
      isActive: true,
      modules: ['/categories', '/users', '/catalogue/product', '/sales/orders'],
    });
    console.log('Userpannel user created:', userpannelUser.email);

    const customerUser = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'customer@example.com',
      password: 'customer123',
      role: 'customer',
      phone: '+919876543210',
      isActive: true,
      addresses: [
        {
          address: '123 Main Street',
          pincode: '400001',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
        },
      ],
    });
    console.log('Customer user created:', customerUser.email);

    const electronicsCategory = await Category.create({
      name: 'Electronics',
      subCategories: [
        { name: 'smartphones', label: 'Smartphones' },
        { name: 'laptops', label: 'Laptops' },
        { name: 'tablets', label: 'Tablets' },
        { name: 'accessories', label: 'Accessories' },
      ],
    });
    console.log('Electronics category created');

    const fashionCategory = await Category.create({
      name: 'Fashion',
      subCategories: [
        { name: 'mens-wear', label: "Men's Wear" },
        { name: 'womens-wear', label: "Women's Wear" },
        { name: 'kids-wear', label: "Kids' Wear" },
        { name: 'footwear', label: 'Footwear' },
      ],
    });
    console.log('Fashion category created');

    const homeCategory = await Category.create({
      name: 'Home & Kitchen',
      subCategories: [
        { name: 'furniture', label: 'Furniture' },
        { name: 'decor', label: 'Home Decor' },
        { name: 'appliances', label: 'Appliances' },
        { name: 'kitchenware', label: 'Kitchenware' },
      ],
    });
    console.log('Home & Kitchen category created');

    const products = [
      {
        productName: 'iPhone 14 Pro',
        description: 'Latest Apple iPhone with advanced camera system',
        originalPrice: 129900,
        discountPrice: 119900,
        productImages: ['https://example.com/iphone14pro.jpg'],
        category: electronicsCategory._id,
        subCategoryId: electronicsCategory.subCategories[0]._id,
        stock: 50,
        isActive: true,
        bestSeller: true,
        hideProduct: false,
      },
      {
        productName: 'MacBook Pro M2',
        description: '14-inch MacBook Pro with M2 chip',
        originalPrice: 199900,
        discountPrice: 189900,
        productImages: ['https://example.com/macbookpro.jpg'],
        category: electronicsCategory._id,
        subCategoryId: electronicsCategory.subCategories[1]._id,
        stock: 30,
        isActive: true,
        bestSeller: true,
        hideProduct: false,
      },
      {
        productName: 'iPad Air',
        description: 'Powerful iPad Air with M1 chip',
        originalPrice: 59900,
        discountPrice: 54900,
        productImages: ['https://example.com/ipadair.jpg'],
        category: electronicsCategory._id,
        subCategoryId: electronicsCategory.subCategories[2]._id,
        stock: 40,
        isActive: true,
        bestSeller: false,
        hideProduct: false,
      },
      {
        productName: 'Mens Formal Shirt',
        description: 'Premium cotton formal shirt',
        originalPrice: 1999,
        discountPrice: 1499,
        productImages: ['https://example.com/formalshirt.jpg'],
        category: fashionCategory._id,
        subCategoryId: fashionCategory.subCategories[0]._id,
        stock: 100,
        isActive: true,
        bestSeller: false,
        hideProduct: false,
      },
      {
        productName: 'Womens Designer Dress',
        description: 'Elegant designer dress for special occasions',
        originalPrice: 3999,
        discountPrice: 2999,
        productImages: ['https://example.com/dress.jpg'],
        category: fashionCategory._id,
        subCategoryId: fashionCategory.subCategories[1]._id,
        stock: 60,
        isActive: true,
        bestSeller: true,
        hideProduct: false,
      },
      {
        productName: 'Wooden Dining Table',
        description: '6-seater wooden dining table',
        originalPrice: 25000,
        discountPrice: 22000,
        productImages: ['https://example.com/diningtable.jpg'],
        category: homeCategory._id,
        subCategoryId: homeCategory.subCategories[0]._id,
        stock: 15,
        isActive: true,
        bestSeller: false,
        hideProduct: false,
      },
      {
        productName: 'Wall Art Canvas',
        description: 'Modern abstract wall art canvas',
        originalPrice: 2500,
        discountPrice: 1999,
        productImages: ['https://example.com/wallart.jpg'],
        category: homeCategory._id,
        subCategoryId: homeCategory.subCategories[1]._id,
        stock: 80,
        isActive: true,
        bestSeller: false,
        hideProduct: false,
      },
      {
        productName: 'Air Fryer',
        description: 'Digital air fryer with 8 preset modes',
        originalPrice: 8999,
        discountPrice: 6999,
        productImages: ['https://example.com/airfryer.jpg'],
        category: homeCategory._id,
        subCategoryId: homeCategory.subCategories[2]._id,
        stock: 45,
        isActive: true,
        bestSeller: true,
        hideProduct: false,
      },
    ];

    await Product.insertMany(products);
    console.log('Sample products created');

    console.log('\n=== Seed Data Summary ===');
    console.log('Admin Email: admin@ecommerce.com');
    console.log('Admin Password: admin123');
    console.log('\nUserpannel Email: panel@ecommerce.com');
    console.log('Userpannel Password: panel123');
    console.log('\nCustomer Email: customer@example.com');
    console.log('Customer Password: customer123');
    console.log('\nCategories:', await Category.countDocuments());
    console.log('Products:', await Product.countDocuments());
    console.log('\nDatabase seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
