# E-Commerce Backend API

A production-ready, full-featured e-commerce backend built with Node.js, Express, MongoDB, and Razorpay integration.

## Features

- **User Management**: Three role-based user types (customer, admin, userpannel)
- **Authentication**: JWT-based authentication with secure password hashing
- **Product Management**: Complete CRUD operations with stock management
- **Category Management**: Dynamic categories with subcategories
- **Order Management**: Full order lifecycle with Razorpay payment integration
- **Support System**: Customer support ticket management
- **Email Service**: Automated emails for registration and password reset
- **API Documentation**: Auto-generated Swagger/OpenAPI documentation
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Error Handling**: Centralized error handling with detailed messages

## Tech Stack

- **Runtime**: Node.js (ESM)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Payment**: Razorpay
- **Email**: Nodemailer
- **Validation**: Joi
- **Documentation**: Swagger (swagger-jsdoc + swagger-ui-express)
- **Security**: Helmet, CORS, express-rate-limit
- **PDF Generation**: PDFKit (for invoices)

## Project Structure

```
project/
├── src/
│   ├── config/          # Configuration files
│   │   ├── env.js
│   │   └── database.js
│   ├── controllers/     # Route controllers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── categoryController.js
│   │   ├── productController.js
│   │   ├── supportController.js
│   │   ├── razorpayController.js
│   │   └── orderController.js
│   ├── middlewares/     # Custom middlewares
│   │   ├── authenticate.js
│   │   ├── authorize.js
│   │   ├── validate.js
│   │   └── errorHandler.js
│   ├── models/          # Mongoose models
│   │   ├── User.js
│   │   ├── Category.js
│   │   ├── Product.js
│   │   ├── Support.js
│   │   └── Order.js
│   ├── routes/          # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── productRoutes.js
│   │   ├── supportRoutes.js
│   │   ├── razorpayRoutes.js
│   │   └── orderRoutes.js
│   ├── services/        # Business logic services
│   │   ├── emailService.js
│   │   └── razorpayService.js
│   ├── utils/           # Utility functions
│   │   ├── asyncHandler.js
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── jwt.js
│   │   └── validationSchemas.js
│   ├── docs/            # API documentation
│   │   └── swagger.js
│   ├── scripts/         # Utility scripts
│   │   └── seed.js
│   └── server.js        # Application entry point
├── .env                 # Environment variables
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- Razorpay account (for payment integration)
- SMTP email service credentials

### Installation

1. **Clone or extract the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   The `.env` file is already configured with your credentials:
   ```env
   PORT=5000
   MONGODB_URL="mongodb+srv://crockery-e-com:iUiQBFcKmDComZYn@cluster0.aff9hnt.mongodb.net/?appName=Cluster0"

   JWT_SECRET=your_super_secret_jwt_key_min_32_chars_for_production_use
   JWT_EXPIRES_IN=7d

   RAZORPAY_TEST_KEY_ID=rzp_test_vBYRuv09RZq0jH
   RAZORPAY_TEST_KEY_SECRET=u8puKwRrwmjF6gxSa6gKDrM2

   MAIL_HOST=smtp.hostinger.com
   MAIL_PORT=465
   MAIL_USER=test-email@webseeder.tech
   MAIL_PASS=webseederTestEmail@2025
   MAIL_FROM=test-email@webseeder.tech
   ```

4. **Seed the database** (optional but recommended)
   ```bash
   npm run seed
   ```

   This creates:
   - Admin user: `admin@ecommerce.com` / `admin123`
   - Userpannel user: `panel@ecommerce.com` / `panel123`
   - Customer user: `customer@example.com` / `customer123`
   - Sample categories and products

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`

6. **Access API Documentation**

   Open your browser and navigate to:
   ```
   http://localhost:5000/api-docs
   ```

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new customer | No |
| POST | `/login` | Login user | No |
| POST | `/forgot-password` | Request password reset | No |
| POST | `/reset-password` | Reset password with token | No |
| POST | `/change-password` | Change password | Yes |

### Users (`/api/users`)

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/` | Create user | No/Yes | Any/Admin/Userpannel |
| GET | `/` | Get all users | Yes | Admin, Userpannel |
| GET | `/:id` | Get user by ID | Yes | Admin, Userpannel |
| PUT | `/:id` | Update user | Yes | Admin, Userpannel |
| PATCH | `/:id/activate` | Activate/deactivate user | Yes | Admin, Userpannel |
| DELETE | `/:id` | Delete user | Yes | Admin |

### Categories (`/api/categories`)

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/createcategory` | Create category | Yes | Admin, Userpannel |
| GET | `/getallcategories` | Get all categories | No | - |
| GET | `/getcategory/:id` | Get category by ID | No | - |
| PUT | `/updatecategory/:id` | Update category | Yes | Admin, Userpannel |
| DELETE | `/deletecategory/:id` | Delete category | Yes | Admin, Userpannel |

### Products (`/api/products`)

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/createproduct` | Create product | Yes | Admin, Userpannel |
| GET | `/getallproducts` | Get all products | No | - |
| GET | `/getactiveproducts` | Get active products | No | - |
| GET | `/getbestsellerproducts` | Get bestseller products | No | - |
| GET | `/getproductbyid/:id` | Get product by ID | No | - |
| PUT | `/updateproduct/:id` | Update product | Yes | Admin, Userpannel |
| DELETE | `/deleteproduct/:id` | Delete product | Yes | Admin, Userpannel |
| PATCH | `/togglestatus/:id` | Toggle product status | Yes | Admin, Userpannel |
| PATCH | `/togglebestseller/:id` | Toggle bestseller | Yes | Admin, Userpannel |
| PATCH | `/togglehide/:id` | Toggle hide product | Yes | Admin, Userpannel |
| POST | `/:id/stock` | Update stock | Yes | Admin, Userpannel |

### Orders (`/api/orders`)

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/createOrder` | Create order (admin) | Yes | Admin, Userpannel |
| POST | `/createOrderByCustomer` | Create order (customer) | Yes | Customer |
| GET | `/getAllOrders` | Get all orders | Yes | Admin, Userpannel |
| GET | `/summary` | Get order summary | Yes | Admin, Userpannel |
| GET | `/customer` | Get customer orders | Yes | Customer |
| GET | `/getOrdersByCustomerId/:id` | Get orders by customer | Yes | Admin, Userpannel |
| GET | `/getOrders/:id` | Get order by ID | Yes | Owner/Admin |
| GET | `/:id/invoice` | Generate invoice | Yes | Owner/Admin |
| PATCH | `/updateOrdersById/:id` | Update order | Yes | Admin, Userpannel |
| PATCH | `/updateOrdersStatus/:id/status` | Update order status | Yes | Admin, Userpannel |
| DELETE | `/orders/:id` | Delete order | Yes | Admin |

### Razorpay (`/api/razorpay`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/create-order` | Create Razorpay order | Yes |
| POST | `/verify` | Verify payment signature | Yes |

### Support (`/api/support`)

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/` | Create support ticket | Yes | Customer |
| GET | `/customer/:customerId` | Get customer tickets | Yes | Customer/Admin |
| GET | `/` | Get all tickets | Yes | Admin, Userpannel |
| GET | `/:id` | Get ticket by ID | Yes | Admin, Userpannel |
| PUT | `/:id` | Update ticket | Yes | Admin, Userpannel |
| PATCH | `/:id/status` | Update ticket status | Yes | Admin, Userpannel |
| DELETE | `/:id` | Delete ticket | Yes | Admin, Userpannel |

## Example API Requests

### 1. Customer Signup

```bash
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "password": "password123",
  "phone": "+919876543211",
  "addresses": [
    {
      "address": "456 Park Avenue",
      "pincode": "400002",
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India"
    }
  ]
}
```

### 2. Login

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@ecommerce.com",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Create Product

```bash
POST http://localhost:5000/api/products/createproduct
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "productName": "Samsung Galaxy S23",
  "description": "Latest Samsung flagship smartphone",
  "originalPrice": 79999,
  "discountPrice": 74999,
  "productImages": ["https://example.com/galaxy.jpg"],
  "category": "<category_id>",
  "subCategoryId": "<subcategory_id>",
  "stock": 100
}
```

### 4. Razorpay Payment Flow

**Step 1: Create Order**

```bash
POST http://localhost:5000/api/orders/createOrderByCustomer
Authorization: Bearer <customer_jwt_token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "<product_id>",
      "name": "iPhone 14 Pro",
      "price": 119900,
      "quantity": 1,
      "subtotal": 119900
    }
  ],
  "totalAmount": 119900,
  "shippingAddress": {
    "address": "123 Main Street",
    "pincode": "400001",
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "India"
  }
}
```

Response includes Razorpay order details for frontend integration.

**Step 2: Verify Payment**

After successful payment on frontend:

```bash
POST http://localhost:5000/api/razorpay/verify
Authorization: Bearer <customer_jwt_token>
Content-Type: application/json

{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx",
  "orderId": "<order_id>"
}
```

## User Roles

### Customer (default)
- Can signup and login
- Can browse products and categories
- Can create orders and make payments
- Can create support tickets
- Can view own orders and invoices

### Admin
- Full access to all resources
- Can create/update/delete users, categories, products
- Can manage orders and support tickets
- Can view analytics and summaries
- Can delete any resource

### Userpannel
- Limited admin access
- Default modules: `/categories`, `/users`, `/catalogue/product`, `/sales/orders`
- Can create/update users, categories, products
- Can manage orders
- Cannot delete users

## Data Models

### User
- Common fields: firstName, lastName, email, password, role, isActive
- Customer: phone (required), addresses
- Userpannel: modules array
- Password hashing with bcrypt
- Pre-save hooks for validation

### Category
- name (unique, required)
- subCategories (array, min 1 required)
- Each subcategory has name and label

### Product
- productName, description
- originalPrice, discountPrice
- productImages (array)
- category (ref), subCategoryId
- stock (managed atomically)
- isActive, bestSeller (max 10), hideProduct
- Pre-save validation for bestseller limit

### Order
- customerId (ref User)
- items array (productId, name, price, quantity, subtotal)
- totalAmount
- paymentInfo (Razorpay details)
- status enum (pending, confirmed, shipped, delivered, cancelled, refunded)
- shippingAddress
- Atomic stock decrementation on creation

### Support
- title, description
- status (pending, resolved)
- customerId (ref User)
- customerInfo object

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**:
  - Login: 5 attempts per 15 minutes
  - Signup: 3 attempts per hour
  - General API: 100 requests per 15 minutes
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing enabled
- **Input Validation**: Joi schemas for all inputs
- **Error Handling**: Centralized with sanitized messages
- **Role-Based Authorization**: Middleware-based access control

## Stock Management

Products have automatic stock management:
- Stock decrements atomically on order creation
- Insufficient stock returns error
- Manual stock updates via `/api/products/:id/stock`
- Operations: `add` or `remove`

## Email Features

Automated emails using Nodemailer:
- Welcome email on signup
- Password reset email with token
- SMTP configuration via environment variables

## Invoice Generation

PDF invoices generated with PDFKit:
- Endpoint: `GET /api/orders/:id/invoice`
- Includes order details, customer info, items, totals
- Downloadable PDF format

## Development

```bash
# Install dependencies
npm install

# Run development server (with nodemon)
npm run dev

# Run production server
npm start

# Seed database
npm run seed
```

## Production Deployment

1. Set `NODE_ENV=production` in environment
2. Use strong JWT secret (min 32 characters)
3. Configure MongoDB connection string
4. Set up proper CORS origins
5. Configure HTTPS
6. Use environment-specific rate limits
7. Enable MongoDB Atlas IP whitelist
8. Monitor logs and errors

## API Response Format

All API responses follow this format:

```json
{
  "success": true/false,
  "message": "Descriptive message",
  "data": { ... }  // Optional, only on success
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Error detail 1", "Error detail 2"]  // Optional
}
```

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB URL in `.env`
- Check network connectivity
- Ensure IP whitelist in MongoDB Atlas

### Razorpay Payment Issues
- Verify API keys in `.env`
- Check Razorpay dashboard for test mode
- Verify signature calculation

### Email Issues
- Verify SMTP credentials
- Check firewall/network for port 465
- Test email service separately

## Support

For issues or questions:
- Check API documentation at `/api-docs`
- Review error messages in console
- Verify environment variables
- Check MongoDB connection

## License

MIT

## Credits

Built with Node.js, Express, MongoDB, and Razorpay.
