import Razorpay from 'razorpay';
import crypto from 'crypto';
import { config } from '../config/env.js';

const razorpayInstance = new Razorpay({
  key_id: config.razorpay.keyId,
  key_secret: config.razorpay.keySecret,
});

export const createRazorpayOrder = async (amount, currency = 'INR', receipt) => {
  try {
    const options = {
      amount: amount * 100,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    return order;
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    throw error;
  }
};

export const verifyRazorpaySignature = (orderId, paymentId, signature) => {
  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', config.razorpay.keySecret)
    .update(body.toString())
    .digest('hex');

  return expectedSignature === signature;
};
