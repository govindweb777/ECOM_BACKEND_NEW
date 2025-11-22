# 🚀 Quick Start Guide

## 1️⃣ Install & Seed (First Time Only)

```bash
npm install
npm run seed
```

**Test Accounts Created:**
- 👤 Admin: `admin@ecommerce.com` / `admin123`
- 👤 Panel: `panel@ecommerce.com` / `panel123`
- 👤 Customer: `customer@example.com` / `customer123`

## 2️⃣ Start Server

```bash
npm run dev
```

Server: `http://localhost:5000`
API Docs: `http://localhost:5000/api-docs`

## 3️⃣ Test API

### Login (Get Token)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@example.com","password":"customer123"}'
```

Copy the `token` from response.

### Get Products
```bash
curl http://localhost:5000/api/products/getallproducts
```

### Create Order (Use Your Token)
```bash
curl -X POST http://localhost:5000/api/orders/createOrderByCustomer \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{
      "productId": "PASTE_PRODUCT_ID",
      "name": "iPhone 14 Pro",
      "price": 119900,
      "quantity": 1,
      "subtotal": 119900
    }],
    "totalAmount": 119900,
    "shippingAddress": {
      "address": "123 Main St",
      "pincode": "400001",
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India"
    }
  }'
```

## 📚 Key Endpoints

| Action | Method | Endpoint |
|--------|--------|----------|
| **Auth** | | |
| Login | POST | `/api/auth/login` |
| Signup | POST | `/api/auth/signup` |
| Reset Password | POST | `/api/auth/forgot-password` |
| **Products** | | |
| List All | GET | `/api/products/getallproducts` |
| Get Bestsellers | GET | `/api/products/getbestsellerproducts` |
| Get One | GET | `/api/products/getproductbyid/:id` |
| **Orders** | | |
| Create Order | POST | `/api/orders/createOrderByCustomer` 🔐 |
| My Orders | GET | `/api/orders/customer` 🔐 |
| Get Invoice | GET | `/api/orders/:id/invoice` 🔐 |
| **Categories** | | |
| List All | GET | `/api/categories/getallcategories` |

🔐 = Requires Authentication Header: `Authorization: Bearer <token>`

## 🎯 Common Tasks

### Create Product (Admin/Panel)
```bash
# 1. Login as admin
# 2. Get token
# 3. Create product
curl -X POST http://localhost:5000/api/products/createproduct \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "New Product",
    "description": "Product description",
    "originalPrice": 1000,
    "discountPrice": 900,
    "category": "CATEGORY_ID",
    "subCategoryId": "SUBCATEGORY_ID",
    "stock": 50
  }'
```

### Create Category (Admin/Panel)
```bash
curl -X POST http://localhost:5000/api/categories/createcategory \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Category",
    "subCategories": [
      {"name": "sub1", "label": "Subcategory 1"},
      {"name": "sub2", "label": "Subcategory 2"}
    ]
  }'
```

## 🛡️ User Roles

| Role | Can Do |
|------|--------|
| **customer** | Browse, Shop, Create Orders, Support Tickets |
| **admin** | Everything + Delete Users |
| **userpannel** | Manage Products, Categories, Orders, Users (can't delete) |

## 🔧 Environment (.env)

Already configured with your credentials:
```env
PORT=5000
MONGODB_URL=mongodb+srv://...
JWT_SECRET=your_secret
RAZORPAY_TEST_KEY_ID=rzp_test_...
RAZORPAY_TEST_KEY_SECRET=...
MAIL_HOST=smtp.hostinger.com
```

## 📖 Full Documentation

- **README.md** - Complete setup guide
- **API_GUIDE.md** - Detailed examples
- **PROJECT_SUMMARY.md** - Feature overview
- **CHECKLIST.md** - Implementation verification
- **/api-docs** - Interactive Swagger UI

## ⚡ NPM Scripts

```bash
npm run dev      # Start with nodemon (development)
npm start        # Start production server
npm run seed     # Populate database with test data
```

## 🎨 Swagger UI

Open browser: `http://localhost:5000/api-docs`

1. Click "Authorize" button
2. Enter: `Bearer YOUR_TOKEN`
3. Test any endpoint interactively

## 🐛 Troubleshooting

**Can't connect to MongoDB?**
- Check `.env` MONGODB_URL
- Verify internet connection
- Check MongoDB Atlas IP whitelist

**"Invalid token" error?**
- Token expired (7 days default)
- Login again to get new token

**"Insufficient stock" error?**
- Product stock is 0
- Use admin panel to add stock

**Products not showing?**
- Run seed: `npm run seed`
- Check `isActive` and `hideProduct` flags

## 📊 Quick Stats

- **48 API Endpoints**
- **5 Database Models**
- **3 User Roles**
- **Production Ready**

## 🚀 Next Steps

1. ✅ Start server: `npm run dev`
2. ✅ Open Swagger: http://localhost:5000/api-docs
3. ✅ Login with test account
4. ✅ Test creating orders
5. ✅ Integrate with your frontend

---

**Need Help?** Check the full README.md or open http://localhost:5000/api-docs
