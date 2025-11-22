# E-Commerce API Quick Start Guide

## Getting Started

### 1. Installation
```bash
npm install
```

### 2. Seed Database
```bash
npm run seed
```

This creates test accounts:
- **Admin**: `admin@ecommerce.com` / `admin123`
- **Userpannel**: `panel@ecommerce.com` / `panel123`
- **Customer**: `customer@example.com` / `customer123`

### 3. Start Server
```bash
npm run dev
```

Server runs at: `http://localhost:5000`

API Docs: `http://localhost:5000/api-docs`

## Quick Test Flow

### Step 1: Login as Customer
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "customer123"
  }'
```

Save the `token` from response.

### Step 2: Get Products
```bash
curl http://localhost:5000/api/products/getallproducts
```

### Step 3: Create Order
```bash
curl -X POST http://localhost:5000/api/orders/createOrderByCustomer \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{
      "productId": "PRODUCT_ID_FROM_STEP2",
      "name": "Product Name",
      "price": 1000,
      "quantity": 1,
      "subtotal": 1000
    }],
    "totalAmount": 1000,
    "shippingAddress": {
      "address": "123 Main St",
      "pincode": "400001",
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India"
    }
  }'
```

## Key Features

### User Roles
- **Customer**: Default role, can shop and create orders
- **Admin**: Full access, can manage everything
- **Userpannel**: Limited admin access with specific modules

### Authentication
- JWT-based authentication
- Secure password hashing with bcrypt
- Token expires in 7 days (configurable)
- Rate limiting on auth endpoints

### Products
- Stock management with atomic updates
- Bestseller limit enforcement (max 10)
- Active/inactive toggle
- Hide/show functionality
- Category and subcategory support

### Orders
- Razorpay payment integration
- Automatic stock deduction
- Order status tracking
- PDF invoice generation
- Order summary and analytics

### Email
- Welcome email on signup
- Password reset emails
- Configurable SMTP settings

### Security
- Helmet for security headers
- CORS enabled
- Request validation with Joi
- Role-based authorization
- Rate limiting

## Environment Variables

Key variables in `.env`:

```env
PORT=5000
MONGODB_URL="your_mongodb_connection_string"
JWT_SECRET="your_secret_key_min_32_chars"
RAZORPAY_TEST_KEY_ID="your_razorpay_key"
RAZORPAY_TEST_KEY_SECRET="your_razorpay_secret"
MAIL_HOST="smtp.hostinger.com"
MAIL_PORT=465
MAIL_USER="your_email"
MAIL_PASS="your_password"
```

## Common Operations

### Create Admin User
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "New",
    "lastName": "Admin",
    "email": "newadmin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### Create Category
```bash
curl -X POST http://localhost:5000/api/categories/createcategory \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Electronics",
    "subCategories": [
      {"name": "phones", "label": "Mobile Phones"},
      {"name": "laptops", "label": "Laptops"}
    ]
  }'
```

### Create Product
```bash
curl -X POST http://localhost:5000/api/products/createproduct \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "iPhone 15",
    "description": "Latest iPhone",
    "originalPrice": 99999,
    "discountPrice": 94999,
    "category": "CATEGORY_ID",
    "subCategoryId": "SUBCATEGORY_ID",
    "stock": 50
  }'
```

### Update Stock
```bash
curl -X POST http://localhost:5000/api/products/PRODUCT_ID/stock \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 10,
    "operation": "add"
  }'
```

### Get Order Invoice
```bash
curl http://localhost:5000/api/orders/ORDER_ID/invoice \
  -H "Authorization: Bearer YOUR_TOKEN" \
  --output invoice.pdf
```

## Razorpay Integration

### Frontend Flow:

1. **Create Order** (Backend):
   ```javascript
   const response = await fetch('/api/orders/createOrderByCustomer', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(orderData)
   });
   const { order, razorpayOrder } = await response.json();
   ```

2. **Show Razorpay Checkout** (Frontend):
   ```javascript
   const options = {
     key: 'RAZORPAY_KEY_ID',
     amount: razorpayOrder.amount,
     currency: razorpayOrder.currency,
     order_id: razorpayOrder.id,
     handler: function(response) {
       // Verify payment
       verifyPayment(response);
     }
   };
   const rzp = new Razorpay(options);
   rzp.open();
   ```

3. **Verify Payment** (Backend):
   ```javascript
   await fetch('/api/razorpay/verify', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       razorpay_order_id: response.razorpay_order_id,
       razorpay_payment_id: response.razorpay_payment_id,
       razorpay_signature: response.razorpay_signature,
       orderId: order._id
     })
   });
   ```

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

## Testing with Swagger

1. Open `http://localhost:5000/api-docs`
2. Click "Authorize" button
3. Enter: `Bearer YOUR_JWT_TOKEN`
4. Try any endpoint

## Production Checklist

- [ ] Change JWT_SECRET to strong random value
- [ ] Update MongoDB connection string
- [ ] Configure production email settings
- [ ] Update Razorpay keys to live keys
- [ ] Set NODE_ENV=production
- [ ] Configure CORS origins
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Update rate limits for production traffic

## Support

For detailed documentation, visit: `http://localhost:5000/api-docs`

For issues, check:
- MongoDB connection in `.env`
- JWT token validity
- User role permissions
- Stock availability (for orders)
