import Support from '../models/Support.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createSupportTicket = asyncHandler(async (req, res) => {
  const { title, description, customerInfo } = req.body;
  const customerId = req.user._id;

  const ticket = await Support.create({
    title,
    description,
    customerId,
    customerInfo,
  });

  res.status(201).json(new ApiResponse(201, 'Support ticket created successfully', ticket));
});

export const getSupportTicketsByCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.params;

  if (req.user.role === 'customer' && req.user._id.toString() !== customerId) {
    throw new ApiError(403, 'Access denied');
  }

  const tickets = await Support.find({ customerId }).sort({ createdAt: -1 });

  res.json(new ApiResponse(200, 'Support tickets retrieved successfully', tickets));
});

export const getAllSupportTickets = asyncHandler(async (req, res) => {
  const { status } = req.query;

  const filter = {};
  if (status) {
    filter.status = status;
  }
  const tickets = await Support.find(filter).sort({ createdAt: -1 });

  res.json(
    new ApiResponse(200, "Support tickets retrieved successfully", tickets)
  );
});

export const getSupportTicketById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const ticket = await Support.findById(id).populate('customerId', 'firstName lastName email');
  if (!ticket) {
    throw new ApiError(404, 'Support ticket not found');
  }

  res.json(new ApiResponse(200, 'Support ticket retrieved successfully', ticket));
});

export const updateSupportTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const ticket = await Support.findById(id);
  if (!ticket) {
    throw new ApiError(404, 'Support ticket not found');
  }

  const allowedUpdates = ['title', 'description', 'status'];
  Object.keys(updates).forEach((key) => {
    if (allowedUpdates.includes(key)) {
      ticket[key] = updates[key];
    }
  });

  await ticket.save();

  res.json(new ApiResponse(200, 'Support ticket updated successfully', ticket));
});

export const changeSupportTicketStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'resolved'].includes(status)) {
    throw new ApiError(400, 'Invalid status');
  }

  const ticket = await Support.findById(id);
  if (!ticket) {
    throw new ApiError(404, 'Support ticket not found');
  }

  ticket.status = status;
  await ticket.save();

  res.json(new ApiResponse(200, 'Support ticket status updated successfully', ticket));
});

export const deleteSupportTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const ticket = await Support.findByIdAndDelete(id);
  if (!ticket) {
    throw new ApiError(404, 'Support ticket not found');
  }

  res.json(new ApiResponse(200, 'Support ticket deleted successfully'));
});
