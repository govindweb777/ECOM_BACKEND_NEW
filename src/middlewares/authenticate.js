import { ApiError } from '../utils/ApiError.js';
import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      throw new ApiError(401, 'Invalid or expired token');
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    if (!user.isActive) {
      throw new ApiError(403, 'Account is deactivated');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
