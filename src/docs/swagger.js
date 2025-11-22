import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API Documentation',
      version: '1.0.0',
      description: 'Complete E-commerce backend API with Node.js, Express, MongoDB, and Razorpay',
      contact: {
        name: 'API Support',
        email: 'support@ecommerce.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string', enum: ['customer', 'admin', 'userpannel'] },
            phone: { type: 'string' },
            isActive: { type: 'boolean' },
            addresses: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  address: { type: 'string' },
                  pincode: { type: 'string' },
                  city: { type: 'string' },
                  state: { type: 'string' },
                  country: { type: 'string' },
                },
              },
            },
            modules: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Category: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            subCategories: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string' },
                  name: { type: 'string' },
                  label: { type: 'string' },
                },
              },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            productName: { type: 'string' },
            description: { type: 'string' },
            originalPrice: { type: 'number' },
            discountPrice: { type: 'number' },
            productImages: { type: 'array', items: { type: 'string' } },
            category: { type: 'string' },
            subCategoryId: { type: 'string' },
            stock: { type: 'number' },
            isActive: { type: 'boolean' },
            bestSeller: { type: 'boolean' },
            hideProduct: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Order: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            customerId: { type: 'string' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: { type: 'string' },
                  name: { type: 'string' },
                  price: { type: 'number' },
                  quantity: { type: 'number' },
                  subtotal: { type: 'number' },
                },
              },
            },
            totalAmount: { type: 'number' },
            paymentInfo: {
              type: 'object',
              properties: {
                razorpayOrderId: { type: 'string' },
                razorpayPaymentId: { type: 'string' },
                razorpaySignature: { type: 'string' },
                status: { type: 'string', enum: ['pending', 'completed', 'failed'] },
              },
            },
            status: {
              type: 'string',
              enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'refunded'],
            },
            shippingAddress: {
              type: 'object',
              properties: {
                address: { type: 'string' },
                pincode: { type: 'string' },
                city: { type: 'string' },
                state: { type: 'string' },
                country: { type: 'string' },
              },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Support: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            status: { type: 'string', enum: ['pending', 'resolved'] },
            customerId: { type: 'string' },
            customerInfo: {
              type: 'object',
              properties: {
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' },
              },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: { type: 'object' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            errors: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    },
    tags: [
      { name: 'Authentication', description: 'Authentication endpoints' },
      { name: 'Users', description: 'User management endpoints' },
      { name: 'Categories', description: 'Category management endpoints' },
      { name: 'Products', description: 'Product management endpoints' },
      { name: 'Orders', description: 'Order management endpoints' },
      { name: 'Razorpay', description: 'Payment processing endpoints' },
      { name: 'Support', description: 'Support ticket endpoints' },
    ],
  },
  apis: ['./src/routes/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
