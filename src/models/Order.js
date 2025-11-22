import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0,
  },
}, { _id: false });

const paymentInfoSchema = new mongoose.Schema({
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
}, { _id: false });

const shippingAddressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: {
    type: [orderItemSchema],
    required: true,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: 'Order must have at least one item',
    },
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentInfo: {
    type: paymentInfoSchema,
    default: () => ({}),
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending',
  },
  shippingAddress: {
    type: shippingAddressSchema,
    required: true,
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
